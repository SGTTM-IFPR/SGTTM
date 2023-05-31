import random
from typing import List

from dependency_injector.wiring import inject

from model import TorneioModel
from model.Enums import TipoTorneioEnum
from model.Enums.fase_enum import FaseEnum
from repository.partida_repository import PartidaRepository
from repository.torneio_repository import TorneioRepository
from service.generic_service import GenericService
from service.grupo_service import GrupoService
from service.inscricao_service import InscricaoService
from service.partida_service import PartidaService


class TorneioService(GenericService[TorneioModel]):

    @inject
    def __init__(self, repository: TorneioRepository, partida_service: PartidaService, grupo_service: GrupoService, incricao_service: InscricaoService):
        super().__init__(repository)
        self.partida_service = partida_service
        self.grupo_service = grupo_service
        self.inscricao_service = incricao_service


    def verify_torneio_is_go_to_next_step(self, torneio_id):
        torneio: TorneioModel = self.get_by_id(torneio_id)

        return self.repository.verify_torneio_is_go_to_next_step(torneio_id)

    def create(self, data: dict) -> TorneioModel:
        torneio = data
        print (torneio['tipo_torneio'])
        if torneio['tipo_torneio'] == 'COPA':
            torneio['fase_atual'] = FaseEnum.FASE_GRUPOS
        else:
            torneio['fase_atual'] = FaseEnum.FASE_ELIMINATORIA
        print(torneio['fase_atual'])
        print(torneio)
        self.repository.create(torneio)
        return torneio

    def get_by_id(self, id) -> TorneioModel:
        model: TorneioModel = self.repository.get_by_id(id)
        print(model.fase_atual)
        if model.tipo_torneio == TipoTorneioEnum.COPA:
            print('COPA')
            model.fase_grupo_concluida = self.verify_all_partidas_is_concluida_by_torneio_id(id)

        return model

    def next_fase(self, id) -> TorneioModel:
        if not self.verify_all_partidas_is_concluida_by_torneio_id(id):
            print('Entrou aqui')
            return None
        print('Passou aqui')
        torneio: TorneioModel = self.get_by_id(id)
        if not torneio:
            return None
        if torneio.fase_atual == FaseEnum.FASE_ELIMINATORIA:
            return None
        update_data = {}
        # update_data['fase_atual'] = FaseEnum.FASE_ELIMINATORIA
        torneio = self.repository.update(id, update_data)
        self.generate_mata_mata(torneio)
        return torneio

    def verify_all_partidas_is_concluida_by_torneio_id(self, torneio_id) -> bool:
        partidas = []
        grupos = self.grupo_service.get_by_torneio_id(torneio_id)
        if not grupos:
            return False
        for grupo in grupos:
            partidas += self.partida_service.get_by_grupo_id(grupo.id)
        for partida in partidas:
            if not partida.concluida:
                return False
        return True

    def generate_mata_mata(self, torneio):
        if not torneio:
            return
        jogadores = []
        grupos = self.grupo_service.get_by_torneio_id(torneio.id)
        if not grupos:
            return
        numero_jogadores_classificados = sum(grupo.quantidade_classificados for grupo in grupos)
        print (numero_jogadores_classificados)
        inscricoes = self.inscricao_service.get_by_torneio_with_limit(torneio.id, numero_jogadores_classificados)
        if not inscricoes:
            return

        random.shuffle(inscricoes)
        partidas = []
        for i in range(0, len(inscricoes), 2):
            partida = {}
            partida['jogador1_id'] = inscricoes[i].jogador_id
            partida['jogador2_id'] = inscricoes[i+1].jogador_id
            partida['torneio_id'] = torneio.id
            partidas.append(partida)
        pass

