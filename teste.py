def atualizar_registro_final(registros):
    for i, registro in enumerate(registros):
        id_partida = registro[0]
        etapa = registro[1]
        partida_origem_id_atleta_1 = registro[2]
        partida_origem_id_atleta_2 = registro[3]
        
        if etapa == 'FINAL':
            partidas_semifinal = obter_partida_semifinal()

            partida_origem_id_atleta_1 = partidas_semifinal[0]
            partida_origem_id_atleta_2 = partidas_semifinal[1]
    atualizar_registro(id_partida, partida_origem_id_atleta_1, partida_origem_id_atleta_2)

def atualizar_registro_semifinals(registros):
    for i, registro in enumerate(registros):
        id_partida = registro[0]
        etapa = registro[1]
        partida_origem_id_atleta_1 = registro[2]
        partida_origem_id_atleta_2 = registro[3]
        
        if etapa == 'SEMIFINALS':
            partidas_quartas = obter_partida_quartas()

            if i == 0:
                partida_origem_id_atleta_1 = partidas_quartas[i]
                partida_origem_id_atleta_2 = partidas_quartas[i + 1]
            else:
                partida_origem_id_atleta_1 = partidas_quartas[i + 1]
                partida_origem_id_atleta_2 = partidas_quartas[i + 2]
        
        atualizar_registro(id_partida, partida_origem_id_atleta_1, partida_origem_id_atleta_2)
    
def obter_partida_semifinal():
    partida = [22, 23]
    
    return partida

def obter_partida_quartas():
    partida = [18, 19, 20, 21]
    
    return partida

def atualizar_registro(id_partida, partida_origem_id_atleta_1, partida_origem_id_atleta_2):
    # Lógica para atualizar o registro com os valores corretos
    print(f"Atualizando registro {id_partida}: partida_origem_id_atleta_1={partida_origem_id_atleta_1}, partida_origem_id_atleta_2={partida_origem_id_atleta_2}")

# Exemplo de lista de registros para atualizar
registros_final = [
    (24, 'FINAL', None, None)
]
registros_semifinals = [
    (22, 'SEMIFINALS', None, None),
    (23, 'SEMIFINALS', None, None),
]
registros_quartas = [
    (18, 'QUARTAS_FINAL', None, None),
    (19, 'QUARTAS_FINAL', None, None),
    (20, 'QUARTAS_FINAL', None, None),
    (21, 'QUARTAS_FINAL', None, None),
]

# Chamar a função para atualizar os registros
atualizar_registro_final(registros_final)
atualizar_registro_semifinals(registros_semifinals)
# atualizar_registro_quartas(registros_quartas)
# atualizar_registro_oitavas(registros_oitavas)
# atualizar_registro_decimas(registros_decimas)
