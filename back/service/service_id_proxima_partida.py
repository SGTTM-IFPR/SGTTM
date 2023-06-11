from repository.partida_repository import PartidaRepository
from service.partida_service import PartidaService

partida_repository = PartidaRepository()
partida_service = PartidaService(partida_repository)

def atualizar_id_proxima_partida(torneio_id):
    partidas_todas = partida_service.get_all_partidas_by_torneio_id(torneio_id)
    partidas = []
    dicionario_info = {}
    chaves = []
    for partida in partidas_todas:
        if partida.etapa.value != "Primeira fase":
            partidas.append(partida)
    
    for p in partidas:
        dicionario_info[p.id] = [p.partida_origem_id_atleta_1, p.partida_origem_id_atleta_2]
        
    for chave_atual, valores_atual in dicionario_info.items():
        for chave, valores in dicionario_info.items():
            if chave_atual in valores:
                chaves.append(chave)
    
    for i, p in enumerate(partidas):
        if i <= len(chaves)-1:
            p.id_proxima_partida = chaves[i]
    
    for p in partidas:
        # atualizar as partidas
        partidas_para_atualizar = {
            "id_proxima_partida": p.id_proxima_partida
        }
        partida_service.update(p.id, partidas_para_atualizar)