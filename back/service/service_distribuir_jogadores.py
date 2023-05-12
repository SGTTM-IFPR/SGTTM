def distribuir_jogadores(lista_jogadores, num_grupos, min_jogadores_grupo, num_jogadores_extras):
    # Calcular o número total de jogadores
    num_jogadores = len(lista_jogadores)

    # Verificar se há jogadores extras
    if num_jogadores_extras > 0:
        # Calcular o número total de grupos com jogadores extras
        num_grupos_com_extras = num_jogadores_extras

        # Verificar se há jogadores suficientes para distribuir de forma sequencial
        if num_jogadores_extras > num_grupos:
            raise ValueError("Não há jogadores suficientes para distribuir de forma sequencial")

        # Distribuir os jogadores extras de forma sequencial um em cada grupo até não ter mais jogadores extras
        for i in range(num_jogadores_extras):
            grupo = i % num_grupos
            # lista_jogadores.append(f"extra_{i + 1}")
            num_jogadores += 1

    # Verificar se há jogadores suficientes para formar os grupos
    if num_jogadores < num_grupos * min_jogadores_grupo:
        raise ValueError("Não há jogadores suficientes para formar os grupos")

    # Calcular o número de jogadores por grupo
    jogadores_por_grupo = num_jogadores // num_grupos

    # Distribuir os jogadores nos grupos
    grupos = []
    grupo_atual = []
    for jogador in lista_jogadores:
        grupo_atual.append(jogador)
        if len(grupo_atual) == jogadores_por_grupo:
            grupos.append(grupo_atual)
            grupo_atual = []
    if len(grupo_atual) > 0:
        grupos.append(grupo_atual)

    return grupos