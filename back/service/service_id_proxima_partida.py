from repository.partida_repository import PartidaRepository
from service.partida_service import PartidaService

partida_repository = PartidaRepository()
partida_service = PartidaService(partida_repository)

def criar_dicionario_id_proxima_partida(partidas):
    dicionario = {}

    for chave, valores in partidas.items():
        id_proxima_partida = None
        for partida_id, origem_ids in partidas.items():
            if chave in origem_ids:
                id_proxima_partida = partida_id
                break
        dicionario[chave] = id_proxima_partida

    return dicionario

def atualizar_id_proxima_partida(torneio_id, fase):
    dicionario_fases = {
        "DECIMA_SEXTA_FINAL": 16,
        "OITAVAS_FINAL": 8,
        "QUARTAS_FINAL": 4,
        "SEMIFINALS": 2
    }

    partidas_todas = partida_service.get_all_partidas_by_torneio_id(torneio_id)
    partidas = []
    dicionario_info = {}
    chaves = []

    # pegar todas as partidas que não são da primeira fase
    for partida in partidas_todas:
        if partida.etapa.value != "Primeira fase":
            partidas.append(partida)
    
    # criar um dicionario com as chaves e os ids dos atletas
    for p in partidas:
        dicionario_info[p.id] = [p.partida_origem_id_atleta_1, p.partida_origem_id_atleta_2]

    # pegar as chaves
    chaves_next_fase = criar_dicionario_id_proxima_partida(dicionario_info)
    
    # atualizar as partidas
    for p in partidas:
        # atualizar as partidas
        partidas_para_atualizar = {
            "id_proxima_partida": chaves_next_fase[p.id]
        }
        partida_service.update(p.id, partidas_para_atualizar)
    
    # Referenciar partidas criadas para completar a biblioteca
    partidas_todas = partida_service.get_all_partidas_by_torneio_id(torneio_id)
    partidas = []

    for partida in partidas_todas:
        if partida.etapa.value != "Primeira fase":
            partidas.append(partida)
    
    ids_proxima_partida = []
    ids_partida_da_proxima_fase = []
    partidas_para_referenciar = []
    
    for p in partidas:
        ids_proxima_partida.append(p.id_proxima_partida)
        ids_partida_da_proxima_fase.append(p.id)
    ids_partida_da_proxima_fase = ids_partida_da_proxima_fase[dicionario_fases[fase]:]    

    ids_final_para_referenciar = [x for x in ids_partida_da_proxima_fase if x not in ids_proxima_partida]

    ids_final_para_referenciar2 = [x for x in ids_final_para_referenciar for _ in range(2)]
    indice = 0 

    for p in partidas:
        if p.id_proxima_partida == None:
            if indice > len(ids_final_para_referenciar2) - 1:
                break
            partidas_para_atualizar = {
                "id_proxima_partida": ids_final_para_referenciar2[indice]
            }
            indice += 1
            partida_service.update(p.id, partidas_para_atualizar)
        
    

