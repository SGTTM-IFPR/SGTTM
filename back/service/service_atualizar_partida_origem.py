from repository.partida_repository import PartidaRepository
from service.partida_service import PartidaService

partida_repository = PartidaRepository()
partida_service = PartidaService(partida_repository)


# partidas_final = self.partida_service.get_partida_by_etapa_and_id_torneio("PRIMEIRA_FASE", 1)
# for i in partidas_final:
#     print(i)

def atualizar_registro_final(registros, torneio_id):
    k = 0
    for registro in registros:
        id_partida = registro[0]
        etapa = registro[1]
        partida_origem_id_atleta_1 = registro[2]
        partida_origem_id_atleta_2 = registro[3]
        
        partidas_semifinal = obter_partida_semifinal(torneio_id)

        partida_origem_id_atleta_1 = partidas_semifinal[k]
        partida_origem_id_atleta_2 = partidas_semifinal[k + 1]

        k += 2
    atualizar_registro(id_partida, partida_origem_id_atleta_1, partida_origem_id_atleta_2, etapa)
    print()

def atualizar_registro_semifinals(registros, torneio_id):
    k = 0
    for registro in registros:
        id_partida = registro[0]
        etapa = registro[1]
        partida_origem_id_atleta_1 = registro[2]
        partida_origem_id_atleta_2 = registro[3]
        
        partidas_quartas = obter_partida_quartas(torneio_id)

        partida_origem_id_atleta_1 = partidas_quartas[k]
        partida_origem_id_atleta_2 = partidas_quartas[k + 1]

        k += 2

        atualizar_registro(id_partida, partida_origem_id_atleta_1, partida_origem_id_atleta_2, etapa)
    print()

def atualizar_registro_quartas(registros, torneio_id):
    k = 0
    registros = sorted(registros, key=lambda x: (x[2] is None and x[3] is None, x[2] if x[2] is not None else float('inf'), x[3] if x[3] is not None else float('inf')))
    print(registros)
    for registro in registros:
        if registro[2] == None and registro[3] == None:
            id_partida = registro[0]
            etapa = registro[1]
            partida_origem_id_atleta_1 = registro[2]
            partida_origem_id_atleta_2 = registro[3]
            
            partidas_oitavas = obter_partida_oitavas(torneio_id)

            if k < len(partidas_oitavas):
                partida_origem_id_atleta_1 = partidas_oitavas[k]
            if k + 1 < len(partidas_oitavas):
                partida_origem_id_atleta_2 = partidas_oitavas[k + 1]

            k += 2
        
        if registro[2] != None and registro[3] == None:
            id_partida = registro[0]
            etapa = registro[1]
            partida_origem_id_atleta_1 = registro[2]
            partida_origem_id_atleta_2 = registro[3]
            
            partidas_oitavas = obter_partida_oitavas(torneio_id)

            if k + 1 < len(partidas_oitavas):
                partida_origem_id_atleta_2 = partidas_oitavas[k + 1]

            k += 2

        if registro[2] == None and registro[3] != None:
            id_partida = registro[0]
            etapa = registro[1]
            partida_origem_id_atleta_1 = registro[2]
            partida_origem_id_atleta_2 = registro[3]
            
            partidas_oitavas = obter_partida_oitavas(torneio_id)

            if k < len(partidas_oitavas):
                partida_origem_id_atleta_1 = partidas_oitavas[k]

            k += 2

        atualizar_registro(id_partida, partida_origem_id_atleta_1, partida_origem_id_atleta_2, etapa)
    
    print()


def atualizar_registro_oitavas(registros, torneio_id):
    k = 0
    for registro in registros:
        id_partida = registro[0]
        etapa = registro[1]
        partida_origem_id_atleta_1 = registro[2]
        partida_origem_id_atleta_2 = registro[3]
        
        partidas_decimas = obter_partida_decimas(torneio_id)

        partida_origem_id_atleta_1 = partidas_decimas[k]
        partida_origem_id_atleta_2 = partidas_decimas[k + 1]

        k += 2
        
        atualizar_registro(id_partida, partida_origem_id_atleta_1, partida_origem_id_atleta_2, etapa)
    print()

def obter_partida_semifinal(torneio_id):
    global partida_service
    partida = []
    partidas = partida_service.get_partida_by_etapa_and_id_torneio("SEMIFINALS", torneio_id)
    for i in partidas:
        partida.append(i.id)
    return partida

def obter_partida_quartas(torneio_id):
    global partida_service
    partida = []
    partidas = partida_service.get_partida_by_etapa_and_id_torneio("QUARTAS_FINAL", torneio_id)
    for i in partidas:
        partida.append(i.id)
    return partida

def obter_partida_oitavas(torneio_id):
    global partida_service
    partida = []
    partidas = partida_service.get_partida_by_etapa_and_id_torneio("OITAVAS_FINAL", torneio_id)
    for i in partidas:
        partida.append(i.id)
    return partida

def obter_partida_decimas(torneio_id):
    global partida_service
    partida = []
    partidas = partida_service.get_partida_by_etapa_and_id_torneio("DECIMA_SEXTAS_FINAL", torneio_id)
    for i in partidas:
        partida.append(i.id)
    return partida


def atualizar_registro(id_partida, partida_origem_id_atleta_1, partida_origem_id_atleta_2, etapa):
    # Lógica para atualizar o registro com os valores corretos
    print(f"Atualizando registro {id_partida}:")
    print(f"partida_origem_id_atleta_1 = {partida_origem_id_atleta_1}")
    print(f"partida_origem_id_atleta_2 = {partida_origem_id_atleta_2}")
    print(f"etapa = {etapa}")

# Chamar a função para atualizar os registros
# atualizar_registro_final(registros_final)
# atualizar_registro_semifinals(registros_semifinals)
# atualizar_registro_quartas(registros_quartas)
# atualizar_registro_oitavas(registros_oitavas)