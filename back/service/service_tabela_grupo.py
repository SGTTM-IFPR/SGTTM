import math

def escolha_grupos(n):
    melhor_escolha = None
    
    if n >= 4 and n <= 10:
        if n / 2 == 3 or (n / 2 == 4 and n % 2 == 0):
            melhor_escolha = 2
        if melhor_escolha == None:
            melhor_escolha = 2
        
    if n >= 6 and n <= 15:
        if n / 3 == 3 or (n / 3 == 4 and n % 3 == 0):
            melhor_escolha = 3
        if melhor_escolha == None:
            melhor_escolha = 3
        
    if n >= 8 and n <= 20:
        if n / 4 == 3 or (n / 4 == 4 and n % 4 == 0):
            melhor_escolha = 4
        if melhor_escolha == None:
            melhor_escolha = 4
        
    if n >= 10 and n <= 25:
        if n / 5 == 3 or (n / 5 == 4 and n % 5 == 0):
            melhor_escolha = 5
        if melhor_escolha == None:
            melhor_escolha = 5
        
    if n >= 12 and n <= 30:
        if n / 6 == 3 or (n / 6 == 4 and n % 6 == 0):
            melhor_escolha = 6
        if melhor_escolha == None:
            melhor_escolha = 6
        
    if n >= 14 and n <= 35:
        if n / 7 == 3 or (n / 7 == 4 and n % 7 == 0):
            melhor_escolha = 7
        if melhor_escolha == None:
            melhor_escolha = 7
    
    if n >= 16 and n <= 40:
        if n / 8 == 3 or (n / 8 == 4 and n % 8 == 0):
            melhor_escolha = 8
        if melhor_escolha == None:
            melhor_escolha = 8
        
    if n >= 18 and n <= 45:
        if n / 9 == 3 or (n / 9 == 4 and n % 9 == 0):
            melhor_escolha = 9
        if melhor_escolha == None:
            melhor_escolha = 9
        
    if n >= 20 and n <= 50:
        if n / 10 == 3 or (n / 10 == 4 and n % 10 == 0):
            melhor_escolha = 10
        if melhor_escolha == None:
            melhor_escolha = 10   
    
    if n >= 22 and n <= 55:
        if n / 11 == 3 or (n / 11 == 4 and n % 11 == 0):
            melhor_escolha = 11
        if melhor_escolha == None:
            melhor_escolha = 11      
    
    if n >= 24 and n <= 60:
        if n / 12 == 3 or (n / 12 == 4 and n % 12 == 0):
            melhor_escolha = 12
        if melhor_escolha == None:
            melhor_escolha = 12   
    
    if n >= 26 and n <= 65:
        if n / 13 == 3 or (n / 13 == 4 and n % 13 == 0):
            melhor_escolha = 13
        if melhor_escolha == None:
            melhor_escolha = 13   
    
    if n >= 28 and n <= 70:
        if n / 14 == 3 or (n / 14 == 4 and n % 14 == 0):
            melhor_escolha = 14
        if melhor_escolha == None:
            melhor_escolha = 14   
    
    if n >= 30 and n <= 75:
        if n / 15 == 3 or (n / 15 == 4 and n % 15 == 0):
            melhor_escolha = 15
        if melhor_escolha == None:
            melhor_escolha = 15 
    
    if n >= 32 and n <= 80:
        if n / 16 == 3 or (n / 16 == 4 and n % 16 == 0):
            melhor_escolha = 16
        if melhor_escolha == None:
            melhor_escolha = 16
    
    div = n / melhor_escolha; # Número mínimo de jogadores por GRUPO
    mod = n % melhor_escolha; #Jogador(es) extra para alocar em GRUPO(s)
    
    return {
        "minimo_jogadores" : math.floor(div), 
        "jogadores_extras": mod, 
        "numero_grupos": melhor_escolha
    }