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

    def calcular_partidas_jogadores(self, num_jogadores):
        if num_jogadores == 2:
            jogadores_fase_seguinte = 2 - num_jogadores
            partidas_fase_atual = 1
            fase = "FINAL"
        elif num_jogadores <= 4:
            jogadores_fase_seguinte = 4 - num_jogadores
            partidas_fase_atual = 2
            fase = "SEMIFINALS"
        elif num_jogadores <= 8:
            jogadores_fase_seguinte = 8 - num_jogadores
            partidas_fase_atual = 4
            fase = "QUARTAS_FINAL"
        elif num_jogadores <= 16:
            jogadores_fase_seguinte = 16 - num_jogadores
            partidas_fase_atual = 8
            fase = "OITAVAS_FINAL"
        else:
            jogadores_fase_seguinte = 32 - num_jogadores
            partidas_fase_atual = 16
            fase = "DECIMA_SEXTAS_FINAL"
        
        return int(partidas_fase_atual), jogadores_fase_seguinte, fase

    def criar_partidas_da_fase_atual(self, inscricoes_ordenadas, partidas_fase_atual, fase, torneio_id, jogadores_fase_seguinte):
        # DADOS PARA TESTE, DEPOIS REMOVER
        # inscricoes_ordenadas = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
        # 14, 15, 16, 17, 18, 19, 20]
        # partidas_fase_atual = 5
        # jogadores_fase_seguinte = 11
        # fase = "DECIMA_SEXTAS_FINAL"
        print("------------------")
        dicionario_proxima_fase = {
            "SEMIFINALS" : "FINAL",
            "QUARTAS_FINAL" : "SEMIFINAL",
            "OITAVAS_FINAL" : "QUARTAS_FINAL",
            "DECIMA_SEXTAS_FINAL" : "OITAVAS_FINAL"
        }

        partidas_ideais_fases = [2, 4, 8, 16]
        ids_inscricoes_cadastrados = []
        print("CRIANDO PARTIDAS DA FASE ATUAL")
        # CASO IDEAL, COM NUMERO DE JOGADORES PAR
        if len(inscricoes_ordenadas) in partidas_ideais_fases:
            for i in range(partidas_fase_atual):
                    partida_para_criar = {
                        'inscricao_atleta1_id': inscricoes_ordenadas[i],
                        'inscricao_atleta2_id': inscricoes_ordenadas[len(inscricoes_ordenadas) - 1 - i],
                        'etapa': fase,
                        'torneio_id': torneio_id
                    }
                    print(partida_para_criar)
                    self.partida_service.create(partida_para_criar)
        
        # CASO NÃO IDEAL, COM NUMERO DE JOGADORES IMPAR
        else:
            # CADASTRA AS PARTIDAS IDEAIS DA FASE ATUAL E GUARDA OS IDS DAS INSCRIÇÕES NAO CADASTRADAS
            for i in range(partidas_fase_atual):
                partidas_para_criar = {
                    'inscricao_atleta1_id': inscricoes_ordenadas[i],
                    'inscricao_atleta2_id': inscricoes_ordenadas[len(inscricoes_ordenadas) - 1 - i],
                    'etapa': fase,
                    'torneio_id': torneio_id
                }
                print(partidas_para_criar)
                # self.partida_service.create(partidas_para_criar)
                ids_inscricoes_cadastrados.append(inscricoes_ordenadas[i])
                ids_inscricoes_cadastrados.append(inscricoes_ordenadas[len(inscricoes_ordenadas) - 1 - i])
            ids_restantes = list(set(inscricoes_ordenadas) - set(ids_inscricoes_cadastrados))
            
            print("CRIANDO PARTIDAS DA PROXIMA FASE COM JOGADORES RESTANTES")
            # CASO IDEAL, TOTAL DE JOGADORES RESTANTES SAO PAR
            if jogadores_fase_seguinte % 2 == 0:
                for i in range(int(jogadores_fase_seguinte) // 2):
                    partidas_para_criar = {
                        'inscricao_atleta1_id': ids_restantes[i],
                        'inscricao_atleta2_id': ids_restantes[len(ids_restantes) - 1 - i],
                        'etapa': dicionario_proxima_fase[fase],
                        'torneio_id': torneio_id
                    }
                    print(partidas_para_criar)

            # CASO NÃO IDEAL, TOTAL DE JOGADORES RESTANTES SAO IMPAR
            else:
                for i in range(int(jogadores_fase_seguinte) // 2):
                    partidas_para_criar = {
                        'inscricao_atleta1_id': ids_restantes[i],
                        'inscricao_atleta2_id': ids_restantes[len(ids_restantes) - 1 - i],
                        'etapa': dicionario_proxima_fase[fase],
                        'torneio_id': torneio_id
                    }
                    print(partidas_para_criar)
                partidas_para_criar = {
                    'inscricao_atleta1_id': ids_restantes[int(jogadores_fase_seguinte) // 2],
                    'inscricao_atleta2_id': None,
                    'etapa': dicionario_proxima_fase[fase],
                    'torneio_id': torneio_id
                }
                print(partidas_para_criar)
    print("------------------")

    def generate_partidas_mata_mata(self, torneio, inscricoes: List[InscricaoModel] ):
            if not torneio or not inscricoes:
                return []
            
            for i in inscricoes:
                torneio_id = i.torneio_id

            numero_inscricoes = len(inscricoes)

            # CALCULA O NUMERO DE PARTIDAS DA FASE ATUAL E O NUMERO DE JOGADORES DA FASE SEGUINTE
            partidas_fase_atual, jogadores_fase_seguinte, fase = self.calcular_partidas_jogadores(numero_inscricoes)
            
            # ORDENA AS INSCRIÇÕES PELO ID
            inscricoes_ordenadas = sorted([inscricao.id for inscricao in inscricoes])

            # CRIA AS PARTIDAS DA FASE ATUAL E DA FASE SEGUINTE SE TIVER JOGADORES RESTANTES
            self.criar_partidas_da_fase_atual(inscricoes_ordenadas, partidas_fase_atual, fase, torneio_id, jogadores_fase_seguinte)

            numero_rounds = int(math.log2(numero_inscricoes))
            # print("numero de rounds " + str(numero_rounds))
            # print("numero de jogadores " + str(numero_inscricoes))
            # print('Mata Mata Partidas')
            partidas = [] 

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