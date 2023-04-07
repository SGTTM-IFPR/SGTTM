# Sistema de Tabelas de Campeonato de Tênis de Mesa
Este projeto é um sistema para gerar tabelas de campeonato de tênis de mesa.

## Documentação do projeto
  - [TRELLO](https://trello.com/b/mU71PTrB/projeto-integrador-i)
  - [DOCUMENTAÇÃO](https://docs.google.com/document/d/1k-ytTY66GrIKyVa3HLf-7Y_XAdcp1ptwC0FdG_eta2w/edit?usp=sharing)

## Tecnologias utilizadas
  - Python com Flask
  - React com Vite
  - MySQL

## Instalação
Para executar este sistema, você precisará ter o Python, o Node.js e o Firebase instalados em sua máquina.

1. Clone este repositório em sua máquina local.
```bash
git clone https://github.com/SGTTM-IFPR/SGTTM.git
```

### Backend
2. Acesse o diretório do backend:
```bash
cd back
```

3. Crie um ambiente virtual:
```bash
python -m venv env
```

4. Ative o ambiente virtual:
```bash
source env/bin/activate
```

5. Instale as dependências do Python:
```bash
pip install -r requirements.txt
```

6. Execute o servidor:
```bash
flask --app app run
```

7. Para manter o servidor acessível externamente:
```bash
flask --app app run --host=0.0.0.0
```

### Frontend
8. Acesse o diretório do frontend:
```bash
cd front
```

9. Instale as dependências do Node.js:
```bash
npm install
```

10. Execute o servidor:
```bash
npm run dev
```

## Funcionalidades
O sistema possui as seguintes funcionalidades:
  - Cadastro de usuários.
  - Criação de torneios.
  - Registro de partidas.
  - Visualização de tabelas de classificação.

## Uso
Este sistema permite que você crie uma tabela de campeonato de tênis de mesa e a atualize em tempo real. Você pode adicionar jogadores, inserir resultados de jogos e ver a classificação atualizada da tabela em tempo real.