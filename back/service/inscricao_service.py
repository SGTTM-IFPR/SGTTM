from typing import List, Union

from dependency_injector.wiring import inject
from model.Enums import EtapaEnum
from model import InscricaoModel
from model import PartidaModel
from repository.inscricao_repository import InscricaoRepository
from repository.partida_repository import PartidaRepository
from service.generic_service import GenericService
from service.partida_service import PartidaService
from service.service_tabela_grupo import *
from service.service_distribuir_jogadores import *


class InscricaoService(GenericService[InscricaoModel]):

    @inject
    def __init__(self, repository: InscricaoRepository, partida_repository: PartidaRepository, partida_service: PartidaService):
        super().__init__(repository)
        self.partida_repository = partida_repository
        self.partida_service = partida_service

    def create(self, data) -> Union[InscricaoModel, str]:
        existing_inscricao = self.repository.get_by_user_and_torneio_ids(data['usuario_id'], data['torneio_id'])
        if existing_inscricao:
            return 'A inscrição já existe.'

        model = self.repository.create(data)
        return model

    def get_by_torneio_id(self, id) -> List[InscricaoModel]:
        return self.repository.get_by_torneio_id(id)

    def get_by_torneio_with_limit(self, torneio_id: int, limit: int) -> List[InscricaoModel]:
        inscricoes = self.get_by_torneio_id(torneio_id)
        if not inscricoes:
            return []
        for inscricao in inscricoes:
            self.add_atributes_inscricao(inscricao)
        sorted_inscricoes = sorted(inscricoes, key=lambda x: x.vitorias, reverse=True)
        top_limit_inscricoes = sorted_inscricoes[:limit]
        for inscricao in top_limit_inscricoes:
            print(inscricao)
        return top_limit_inscricoes

    def get_by_grupo_id(self, id) -> List[InscricaoModel]:
        inscricoes: List[InscricaoModel] = self.repository.get_by_grupo_id(id)
        for inscricao in inscricoes:
            self.add_atributes_inscricao(inscricao)

        inscricoes_sorted_by_vitorias = sorted(inscricoes, key=lambda x: x.vitorias, reverse=True)

        return inscricoes_sorted_by_vitorias

    def montar_grupo_do_torneio(self, id, formato, quantidade_classificados):
        '''Listar todas as inscrições com o ID do torneio passado'''
        inscricoes = self.get_by_torneio_id(id)

        if not inscricoes:
            return {'message': 'Nenhuma inscrição encontrada para este torneio'}, 404

        inscricao_dicts = [inscricao.to_dict() for inscricao in inscricoes]
        informacoes = self.get_classificados(len(inscricao_dicts))
        jogadores = [inscricao['id'] for inscricao in inscricao_dicts]

        vetor_de_grupos = distribuir_jogadores(jogadores, informacoes[0]['numero_grupos'],
                                               informacoes[0]['minimo_jogadores'], informacoes[0]['jogadores_extras'])

        # Exibe os grupos criados
        dicionario_grupo = []
        for i, grupo in enumerate(vetor_de_grupos):
            dicionario_grupo.append([f"Grupo {i + 1}", grupo])

            # inserir grupo no banco
            from rest_controller.grupo.abstract_grupo_rest_controller import AbstractGrupoRestController
            AbstractGrupoRestController().service.create(
                {'torneio_id': id, 'nome': f"Grupo {i + 1}", 'quantidade_classificados': quantidade_classificados})

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

        self.criar_partidas_dos_grupos(id_torneio=id)
        return inscricao_dicts, 200

    def gerar_partidas(self, jogadores, num_grupo):
        from itertools import combinations
        partidas = []
        for jogador1, jogador2 in combinations(jogadores, 2):
            partidas.append([jogador1, jogador2, num_grupo])
        return partidas

    def organizar_lista_inscrioes(self, inscricoes):
        from collections import defaultdict
        # agrupa as inscrições por grupo_id usando um dicionário
        inscricoes_por_grupo = defaultdict(list)
        for inscricao in inscricoes:
            jogador_id, grupo_id = inscricao
            inscricoes_por_grupo[grupo_id].append(jogador_id)

        # converte o dicionário para a lista no formato desejado
        resultado = []
        for grupo_id, inscricoes_grupo in inscricoes_por_grupo.items():
            resultado.append([grupo_id, inscricoes_grupo])

        return resultado

    def criar_partidas_dos_grupos(self, id_torneio):
        jogador_grupo = []
        partidas_por_grupo = []
        inscricoes = self.get_by_torneio_id(id_torneio)

        for inscricao in inscricoes:
            jogador_grupo.append([inscricao.to_dict()['id'], inscricao.to_dict()['grupo_id']])

        inscricoes_por_grupo = self.organizar_lista_inscrioes(jogador_grupo)

        for grupo_jogadores in inscricoes_por_grupo:
            grupo_id = grupo_jogadores[0]
            jogadores = grupo_jogadores[1]

            partidas_por_grupo.append(self.gerar_partidas(jogadores, grupo_id))

        self.cadastrar_partidas(partidas_por_grupo, id_torneio)

    def cadastrar_partidas(self, partidas_por_grupo, torneio_id):
        for partidas in partidas_por_grupo:
            for partida in partidas:
                print(partida)
                partida_para_criar = {
                    'inscricao_atleta1_id': partida[0],
                    'inscricao_atleta2_id': partida[1],
                    'grupo_id': partida[2],
                    'etapa': EtapaEnum.PRIMEIRA_FASE,
                    'torneio_id': torneio_id
                }
                self.partida_service.create(partida_para_criar)

    def get_classificados(self, quantidade_inscritos):
        '''Retorna os inscritos classificados'''
        try:
            inscricoes = escolha_grupos(quantidade_inscritos)
            return inscricoes, 200
        except:
            return {'message': 'Limite máximo de inscritos - 80'}, 500

    def add_atributes_inscricao(self, inscricao: InscricaoModel):
        if not inscricao:
            return
        inscricao.partidas_jogadas = len(self.partida_repository.get_partidas_jogadas(inscricao.id))
        inscricao.vitorias = len(self.partida_repository.get_vitorias(inscricao.id))
        inscricao.derrotas = inscricao.partidas_jogadas - inscricao.vitorias
        print(inscricao.usuario_id, inscricao.partidas_jogadas, 'vencidas', inscricao.vitorias, inscricao.derrotas)
