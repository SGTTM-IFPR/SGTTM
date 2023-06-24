import math
import datetime
from repository.partida_repository import PartidaRepository
from service.partida_service import PartidaService


data_atual = datetime.datetime.now()
data_formatada = data_atual.strftime("%Y-%m-%d")

partida_repository = PartidaRepository()
partida_service = PartidaService(partida_repository)

def calcular_partidas_jogadores(num_jogadores):
    if num_jogadores == 2:
        jogadores_fase_seguinte = 2 - num_jogadores
        partidas_fase_atual = num_jogadores - 1
        fase = "FINAL"
    elif num_jogadores <= 4:
        jogadores_fase_seguinte = 4 - num_jogadores
        partidas_fase_atual = num_jogadores -2
        fase = "SEMIFINALS"
    elif num_jogadores <= 8:
        jogadores_fase_seguinte = 8 - num_jogadores
        partidas_fase_atual = num_jogadores -4
        fase = "QUARTAS_FINAL"
    elif num_jogadores <= 16:
        jogadores_fase_seguinte = 16 - num_jogadores
        partidas_fase_atual = num_jogadores - 8
        fase = "OITAVAS_FINAL"
    else:
        jogadores_fase_seguinte = 32 - num_jogadores
        partidas_fase_atual = num_jogadores - 16
        fase = "DECIMA_SEXTAS_FINAL"
    
    return int(partidas_fase_atual), jogadores_fase_seguinte, fase

def criar_partidas_ate_a_final(proxima_fase, torneio_id, jogadores_fase_seguinte):
    global partida_service
    print("Proxima fase", proxima_fase)

    if proxima_fase == "SEMIFINALS":
        proxima_fase = "FINAL"

    if proxima_fase == "QUARTAS_FINAL":
        proxima_fase = "SEMIFINALS"

    if proxima_fase == "OITAVAS_FINAL":
        proxima_fase = "QUARTAS_FINAL"

    if proxima_fase == "DECIMA_SEXTAS_FINAL":
        proxima_fase = "OITAVAS_FINAL"

    if proxima_fase == "FINAL":
        partida_para_criar = {
            'data_partida': data_formatada,
            'inscricao_atleta1_id': None,
            'inscricao_atleta2_id': None,
            'etapa': "FINAL",
            'torneio_id': torneio_id
        }
        print(partida_para_criar)
        partida_service.create(partida_para_criar)

    elif proxima_fase == "SEMIFINALS":
        for i in range(2):
            partida_para_criar = {
                'data_partida': data_formatada,
                'inscricao_atleta1_id': None,
                'inscricao_atleta2_id': None,
                'etapa': "SEMIFINALS",
                'torneio_id': torneio_id
            }
            print(partida_para_criar)
            partida_service.create(partida_para_criar)
        
        partida_final = {
            'data_partida': data_formatada,
            'inscricao_atleta1_id': None,
            'inscricao_atleta2_id': None,
            'etapa': "FINAL",
            'torneio_id': torneio_id
        }
        print(partida_final)
        partida_service.create(partida_final)

    elif proxima_fase == "QUARTAS_FINAL":
        for i in range(4):
            partida_para_criar = {
                'data_partida': data_formatada,
                'inscricao_atleta1_id': None,
                'inscricao_atleta2_id': None,
                'etapa': "QUARTAS_FINAL",
                'torneio_id': torneio_id
            }
            print(partida_para_criar)
            partida_service.create(partida_para_criar)

        for i in range(2):
            partida_para_criar = {
                'data_partida': data_formatada,
                'inscricao_atleta1_id': None,
                'inscricao_atleta2_id': None,
                'etapa': "SEMIFINALS",
                'torneio_id': torneio_id
            }
            print(partida_para_criar)
            partida_service.create(partida_para_criar)
        
        partida_final = {
            'data_partida': data_formatada,
            'inscricao_atleta1_id': None,
            'inscricao_atleta2_id': None,
            'etapa': "FINAL",
            'torneio_id': torneio_id
        }
        print(partida_final)
        partida_service.create(partida_final)
        
    elif proxima_fase == "OITAVAS_FINAL":
        for i in range(8):
            partida_para_criar = {
                'data_partida': data_formatada,
                'inscricao_atleta1_id': None,
                'inscricao_atleta2_id': None,
                'etapa': "OITAVAS_FINAL",
                'torneio_id': torneio_id
            }
            print(partida_para_criar)
            partida_service.create(partida_para_criar)

        for i in range(4):
            partida_para_criar = {
                'data_partida': data_formatada,
                'inscricao_atleta1_id': None,
                'inscricao_atleta2_id': None,
                'etapa': "QUARTAS_FINAL",
                'torneio_id': torneio_id
            }
            print(partida_para_criar)
            partida_service.create(partida_para_criar)
        
        for i in range(2):
            partida_para_criar = {
                'data_partida': data_formatada,
                'inscricao_atleta1_id': None,
                'inscricao_atleta2_id': None,
                'etapa': "SEMIFINALS",
                'torneio_id': torneio_id
            }
            print(partida_para_criar)
            partida_service.create(partida_para_criar)
        
        partida_final = {
            'data_partida': data_formatada,
            'inscricao_atleta1_id': None,
            'inscricao_atleta2_id': None,
            'etapa': "FINAL",
            'torneio_id': torneio_id
        }
        print(partida_final)
        partida_service.create(partida_final)
        
    elif proxima_fase == "DECIMA_SEXTAS_FINAL":
        for i in range(16):
            partida_para_criar = {
                'data_partida': data_formatada,
                'inscricao_atleta1_id': None,
                'inscricao_atleta2_id': None,
                'etapa': "DECIMA_SEXTAS_FINAL",
                'torneio_id': torneio_id
            }
            print(partida_para_criar)
            partida_service.create(partida_para_criar)

        for i in range(8):
            partida_para_criar = {
                'data_partida': data_formatada,
                'inscricao_atleta1_id': None,
                'inscricao_atleta2_id': None,
                'etapa': "OITAVAS_FINAL",
                'torneio_id': torneio_id
            }
            print(partida_para_criar)
            partida_service.create(partida_para_criar)
        
        for i in range(4):
            partida_para_criar = {
                'data_partida': data_formatada,
                'inscricao_atleta1_id': None,
                'inscricao_atleta2_id': None,
                'etapa': "QUARTAS_FINAL",
                'torneio_id': torneio_id
            }
            print(partida_para_criar)
            partida_service.create(partida_para_criar)
        
        for i in range(2):
            partida_para_criar = {
                'data_partida': data_formatada,
                'inscricao_atleta1_id': None,
                'inscricao_atleta2_id': None,
                'etapa': "SEMIFINALS",
                'torneio_id': torneio_id
            }
            print(partida_para_criar)
            partida_service.create(partida_para_criar)
        
        partida_final = {
            'data_partida': data_formatada,
            'inscricao_atleta1_id': None,
            'inscricao_atleta2_id': None,
            'etapa': "FINAL",
            'torneio_id': torneio_id
        }
        print(partida_final)
        partida_service.create(partida_final)
        
    else:
        print("Próxima fase inválida!")

def criar_partidas_da_proxima_fase(fase, torneio_id, jogadores_fase_seguinte):
    global partida_service
    partidas_ja_criadas_na_proxima_fase = math.ceil(jogadores_fase_seguinte / 2)
    print(partidas_ja_criadas_na_proxima_fase)

    fases = {
        "SEMIFINALS": {"partidas": 1 - partidas_ja_criadas_na_proxima_fase, "proxima_fase": "FINAL"},
        "QUARTAS_FINAL": {"partidas": 2 - partidas_ja_criadas_na_proxima_fase, "proxima_fase": "SEMIFINALS"},
        "OITAVAS_FINAL": {"partidas": 4 - partidas_ja_criadas_na_proxima_fase, "proxima_fase": "QUARTAS_FINAL"},
        "DECIMA_SEXTAS_FINAL": {"partidas": 8 - partidas_ja_criadas_na_proxima_fase, "proxima_fase": "OITAVAS_FINAL"}
    }

    jogos = {
        "FINAL": 1,
        "SEMIFINALS": 2,
        "QUARTAS_FINAL": 4,
        "OITAVAS_FINAL": 8,
        "DECIMA_SEXTAS_FINAL": 16
    }
    
    fase_atual = fase
    print(fase)
    info_fase = fases[fase_atual]
    partidas_a_criar = info_fase["partidas"]
    proxima_fase = info_fase["proxima_fase"]

    if partidas_ja_criadas_na_proxima_fase != 0:
        for _ in range(partidas_a_criar):
            partida_para_criar = {
                'data_partida': data_formatada,
                'inscricao_atleta1_id': None,
                'inscricao_atleta2_id': None,
                'etapa': proxima_fase,
                'torneio_id': torneio_id
            }
            print(partida_para_criar)
            partida_service.create(partida_para_criar)
            
            fase_atual = proxima_fase
    if partidas_ja_criadas_na_proxima_fase == 0 and fase_atual != "FINAL":
        fase_atual = proxima_fase
        for _ in range(jogos[fase_atual]):
            partida_para_criar = {
                'data_partida': data_formatada,
                'inscricao_atleta1_id': None,
                'inscricao_atleta2_id': None,
                'etapa': fase_atual,
                'torneio_id': torneio_id
            }
            print(partida_para_criar)
            partida_service.create(partida_para_criar)
        

    if fase_atual != "FINAL":
        criar_partidas_ate_a_final(proxima_fase, torneio_id, jogadores_fase_seguinte)

def criar_partidas_da_fase_atual(inscricoes_ordenadas, partidas_fase_atual, fase, torneio_id, jogadores_fase_seguinte):
    global partida_service
    # DADOS PARA TESTE, DEPOIS REMOVER
    # inscricoes_ordenadas = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    # 14, 15, 16, 17, 18, 19, 20]
    # partidas_fase_atual = 5
    # jogadores_fase_seguinte = 11
    # fase = "DECIMA_SEXTAS_FINAL"
    print("------------------")
    dicionario_proxima_fase = {
        "SEMIFINALS" : "FINAL",
        "QUARTAS_FINAL" : "SEMIFINALS",
        "OITAVAS_FINAL" : "QUARTAS_FINAL",
        "DECIMA_SEXTAS_FINAL" : "OITAVAS_FINAL"
    }
    quantidade_jogos = {
        "FINAL": 1,
        "SEMIFINALS" : 2,
        "QUARTAS_FINAL" : 4,
        "OITAVAS_FINAL" : 8,
        "DECIMA_SEXTAS_FINAL" : 16
    }

    partidas_ideais_fases = [2, 4, 8, 16]
    ids_inscricoes_cadastrados = []
    print("CRIANDO PARTIDAS DA FASE ATUAL")

    # CASO IDEAL, COM NUMERO DE JOGADORES PAR
    if len(inscricoes_ordenadas) in partidas_ideais_fases:
        for i in range(partidas_fase_atual):
                partida_para_criar = {
                    'data_partida': data_formatada,
                    'inscricao_atleta1_id': inscricoes_ordenadas[i],
                    'inscricao_atleta2_id': inscricoes_ordenadas[len(inscricoes_ordenadas) - 1 - i],
                    'etapa': fase,
                    'torneio_id': torneio_id
                }
                print(partida_para_criar)
                partida_service.create(partida_para_criar)

    # CASO NÃO IDEAL, COM NUMERO DE JOGADORES IMPAR
    else:
        # CADASTRA AS PARTIDAS IDEAIS DA FASE ATUAL E GUARDA OS IDS DAS INSCRIÇÕES NAO CADASTRADAS
        print("Partidas ideais", partidas_fase_atual)
        for i in range(partidas_fase_atual):
            partida_para_criar = {
                'data_partida': data_formatada,
                'inscricao_atleta1_id': inscricoes_ordenadas[i],
                'inscricao_atleta2_id': inscricoes_ordenadas[len(inscricoes_ordenadas) - 1 - i],
                'etapa': fase,
                'torneio_id': torneio_id
            }
            print(partida_para_criar)
            partida_service.create(partida_para_criar)
            ids_inscricoes_cadastrados.append(inscricoes_ordenadas[i])
            ids_inscricoes_cadastrados.append(inscricoes_ordenadas[len(inscricoes_ordenadas) - 1 - i])
        ids_restantes = list(set(inscricoes_ordenadas) - set(ids_inscricoes_cadastrados))
        
    # COMPLETAR PARTIDAS FALTANTES DA FASE ATUAL, QUESTAO DA BIBLIOTECA
    partidas_faltantes = quantidade_jogos[fase] - partidas_fase_atual
    if partidas_faltantes > 0:
        print("CRIANDO PARTIDAS FALTANTES DA FASE ATUAL")
        for i in range(partidas_faltantes):
            partida_para_criar = {
                    'data_partida': data_formatada,
                    'inscricao_atleta1_id': None,
                    'inscricao_atleta2_id': None,
                    'etapa': fase,
                    'torneio_id': torneio_id
                }
            print(partida_para_criar)
            partida_service.create(partida_para_criar)


    print("CRIANDO PARTIDAS DA PROXIMA FASE COM JOGADORES RESTANTES")
    # CASO IDEAL, TOTAL DE JOGADORES RESTANTES SAO PAR
    if jogadores_fase_seguinte % 2 == 0:
        for i in range(int(jogadores_fase_seguinte) // 2):
            partida_para_criar = {
                'data_partida': data_formatada,
                'inscricao_atleta1_id': ids_restantes[i],
                'inscricao_atleta2_id': ids_restantes[len(ids_restantes) - 1 - i],
                'etapa': dicionario_proxima_fase[fase],
                'torneio_id': torneio_id
            }
            print(partida_para_criar)
            partida_service.create(partida_para_criar)

    # CASO NÃO IDEAL, TOTAL DE JOGADORES RESTANTES SAO IMPAR
    else:
        for i in range(int(jogadores_fase_seguinte) // 2):
            partida_para_criar = {
                'data_partida': data_formatada,
                'inscricao_atleta1_id': ids_restantes[i],
                'inscricao_atleta2_id': ids_restantes[len(ids_restantes) - 1 - i],
                'etapa': dicionario_proxima_fase[fase],
                'torneio_id': torneio_id
            }
            print(partida_para_criar)
            partida_service.create(partida_para_criar)
        partida_para_criar = {
            'data_partida': data_formatada,
            'inscricao_atleta1_id': ids_restantes[int(jogadores_fase_seguinte) // 2],
            'inscricao_atleta2_id': None,
            'etapa': dicionario_proxima_fase[fase],
            'torneio_id': torneio_id
        }
        print(partida_para_criar)
        partida_service.create(partida_para_criar)

    # CRIAR RESTANTES DAS FASES
    criar_partidas_da_proxima_fase(fase, torneio_id, jogadores_fase_seguinte)
    print("------------------")