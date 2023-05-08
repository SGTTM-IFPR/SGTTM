from typing import List

from dependency_injector.wiring import inject

from model import InscricaoModel
from repository.inscricao_repository import InscricaoRepository
from service.generic_service import GenericService


class InscricaoService(GenericService[InscricaoModel]):

    @inject
    def __init__(self, repository: InscricaoRepository):
        super().__init__(repository)

    def get_by_torneio_id(self, id) -> List[InscricaoModel]:
        return self.repository.get_by_torneio_id(id)

    def distribuir_chaves(self, num_jogadores, jogadores):
        # Verifica se é possível formar um grupo de no mínimo 3 jogadores
        if num_jogadores < 3:
            print("Não é possível formar grupos com menos de 3 jogadores.")
        else:
            # Determina o número máximo de grupos de 3 jogadores que podem ser formados
            max_grupos_tres = num_jogadores // 3
            
            # Determina o número de jogadores restantes que não podem ser alocados em grupos de 3 jogadores
            jogadores_resto = num_jogadores % 3
            
            # Cria os grupos
            grupos = [[] for _ in range(max_grupos_tres)]
            jogador_atual = 0
            for i in range(max_grupos_tres):
                for j in range(3):
                    if jogador_atual < num_jogadores:
                        grupos[i].append(jogadores[jogador_atual])
                        jogador_atual += 1
                if jogadores_resto == 1 and i == max_grupos_tres - 1:
                    if jogador_atual < num_jogadores:
                        grupos[i].append(jogadores[jogador_atual])
                        jogador_atual += 1
                elif jogadores_resto == 2 and i >= max_grupos_tres - 2:
                    if jogador_atual < num_jogadores:
                        grupos[i].append(jogadores[jogador_atual])
                        jogador_atual += 1
            
            return grupos

    def montar_grupo_do_torneio(self, id):
        '''Listar todas as inscrições com o ID do torneio passado'''
        inscricoes = self.get_by_torneio_id(id)
        if not inscricoes:
            return {'message': 'Nenhuma inscrição encontrada para este torneio'}, 404
        inscricao_dicts = [inscricao.to_dict() for inscricao in inscricoes]

        num_jogadores = len(inscricao_dicts)
        jogadores = [inscricao['id'] for inscricao in inscricao_dicts]
        print(f"Jogadores: {num_jogadores}")
        distribuicao = self.distribuir_chaves(num_jogadores, jogadores)
        
        # Exibe os grupos criados
        dicionario_grupo = []
        print("Grupos criados:")
        for i, grupo in enumerate(distribuicao):
            print(f"Grupo {i+1}: {grupo}")
            dicionario_grupo.append([f"Grupo {i+1}", grupo])
            # inserir grupo no banco
            from rest_controller.grupo.abstract_grupo_rest_controller import AbstractGrupoRestController
            AbstractGrupoRestController().service.create({'torneio_id': id, 'nome': f"Grupo {i+1}"})
                
        for gp in dicionario_grupo:
            id_grupo = AbstractGrupoRestController().service.get_by_name_and_torneio_id(name=gp[0], torneio_id=id)
            gp.append(id_grupo.id)


        # atualizar inscricao com o grupo
        inscricoes = self.get_by_torneio_id(id)
        inscricoes2 = [inscricao.to_dict() for inscricao in inscricoes]
        
        for inscricao in inscricoes2:
            for grupo in dicionario_grupo:
                if inscricao['id'] in grupo[1]:
                    inscricao['grupo_id'] = grupo[2]
                    inscricao['condicao'] = 'PROFESSOR_IFPR'
                    self.repository.update2(inscricao['id'], inscricao)
        return inscricao_dicts, 200