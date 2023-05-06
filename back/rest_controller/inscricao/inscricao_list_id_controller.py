from .inscricao_namespace import inscricao_namespace as api
from .abstract_inscricao_rest_controller import AbstractInscricaoRestController
from ..grupo.abstract_grupo_rest_controller import AbstractGrupoRestController

@api.route('/find-all/<int:id>')
class InscricaoListIdController(AbstractInscricaoRestController):

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

    def get(self, id):
        '''Listar todas as inscrições com o ID do torneio passado'''
        inscricoes = self.service.get_by_torneio_id(id)
        if not inscricoes:
            return {'message': 'Nenhuma inscrição encontrada para este torneio'}, 404
        inscricao_dicts = [inscricao.to_dict() for inscricao in inscricoes]

        num_jogadores = len(inscricao_dicts)
        jogadores = [inscricao['id'] for inscricao in inscricao_dicts]
        print(f"Jogadores: {num_jogadores}")
        distribuicao = self.distribuir_chaves(num_jogadores, jogadores)
        
        # Exibe os grupos criados
        print("Grupos criados:")
        for i, grupo in enumerate(distribuicao):
            print(f"Grupo {i+1}: {grupo}")
            # inserir grupo no banco
            AbstractGrupoRestController().service.create({'torneio_id': id, 'nome': f"Grupo {i+1}"})
            
        grupos = AbstractGrupoRestController().service.get_by_torneio_id(id)
        for grupo in grupos:
            print(grupo.to_dict())
            
            
        # atualizar inscricao com o grupo
        inscricoes = AbstractInscricaoRestController().service.get_by_torneio_id(id)
        for inscricao in inscricoes:
            for i, grupo in enumerate(distribuicao):
                if inscricao.id in grupo:
                    for grupo in grupos:
                        if grupo.nome == f"Grupo {i+1}":
                            inscricao.grupo_id = grupo.id
                    AbstractInscricaoRestController().service.update(inscricao.id, inscricao.to_dict())
            
        return inscricao_dicts, 200