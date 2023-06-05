import math
import random
from datetime import date
from typing import List

from dependency_injector.wiring import inject

from model import TorneioModel, InscricaoModel
from model.Enums import TipoTorneioEnum, EtapaEnum
from model.Enums.fase_enum import FaseEnum
from model.partida_model import PartidaModel
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
        if model.tipo_torneio == TipoTorneioEnum.COPA:
            model.fase_grupo_concluida = self.verify_all_partidas_is_concluida_by_torneio_id(id)

        return model

    def next_fase(self, id) -> TorneioModel:
        if not self.verify_all_partidas_is_concluida_by_torneio_id(id):
            return None
        torneio: TorneioModel = self.get_by_id(id)
        if not torneio or torneio.fase_atual == FaseEnum.FASE_ELIMINATORIA:
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
        inscricoes = self.inscricao_service.get_by_torneio_with_limit(torneio.id, numero_jogadores_classificados)
        if not inscricoes:
            return
        random.shuffle(inscricoes)
        partidas = self.generate_partidas_mata_mata(torneio, inscricoes)
        tabela = "Tabelas.txt"
        with open(tabela, "a") as arq:
            for round_num, matches in enumerate(partidas, start=1):
                print(f"Round {round_num}:")
                arq.write("--------------- Round " + str(round_num)+ "-------------------")
                for match_num, (player1, player2) in enumerate(matches, start=1):
                    arq.write(f"\n Match {match_num} ")
                    arq.write(f"\n {player1} ----------+")
                    arq.write(f"\n             |------------+")
                    arq.write(f"\n {player2} ----------+\n")
                    print(f"Match {match_num}: {player1} vs {player2}")
        pass

    def generate_partidas_mata_mata(self, torneio, inscricoes: List[InscricaoModel] ):
            if not torneio or not inscricoes:
                return []
            
            for i in inscricoes:
                torneio_id = i.torneio_id

            numero_inscricoes = len(inscricoes)
            numero_rounds = int(math.log2(numero_inscricoes))
            print("numero de rounds " + str(numero_rounds))
            print("numero de jogadores " + str(numero_inscricoes))
            print('Mata Mata Partidas')
            partidas = []

            # dicionario de fases conforme numero de round
            
            # dicionario de fases, tenho que arrumar o nome das fases, etapa_enum retorna o nome incorreto
            dict_fases = {
                16: EtapaEnum.DECIMA_SEXTAS_FINAL.value,
                8: EtapaEnum.OITAVAS_FINAL.value,
                4: EtapaEnum.QUARTAS_FINAL.value,
                2: "SEMIFINALS",
                1: EtapaEnum.FINAL.value,
            }
            # ordenada as inscricoes por id
            inscricoes_ordenadas = sorted([inscricao.id for inscricao in inscricoes])

            # cria as partidas da fase especifica
            # no caso de SEMI-FINAL
            # criar duas partidas
            # [primeiro x ultimo]
            # [segundo x penultimo]
            for i in range(int(len(inscricoes_ordenadas) / 2)):
                partida_para_criar = {
                    'inscricao_atleta1_id': inscricoes_ordenadas[i],
                    'inscricao_atleta2_id': inscricoes_ordenadas[len(inscricoes_ordenadas) - 1 - i],
                    'etapa': dict_fases[numero_rounds],
                    'torneio_id': torneio_id
                }
                self.partida_service.create(partida_para_criar)



            for round_num in range(1, numero_rounds + 1):
                matches = []
                num_matches = numero_inscricoes // 2

                for match_num in range(1, num_matches + 1):
                    player1 = inscricoes[(match_num - 1) * 2].id
                    player2 = inscricoes[(match_num - 1) * 2 + 1].id
                    matches.append((player1, player2))

                partidas.append(matches)
                numero_inscricoes //= 2

            return partidas