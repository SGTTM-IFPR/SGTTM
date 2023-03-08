# Sistema de Tabelas de Campeonato de Tênis de Mesa
Este projeto é um sistema para gerar tabelas de campeonato de tênis de mesa.

## Tecnologias utilizadas
  - Python com Flask
  - React com Vite
  - Firebase

## Instalação
Para executar este sistema, você precisará ter o Python, o Node.js e o Firebase instalados em sua máquina.

1. Clone este repositório em sua máquina local.
```bash
git clone https://github.com/carlosquadros-br/ifpr-tcc-web.git
```

### Backend
2. Acesse o diretório do backend:
```bash
cd backend
```

3. Crie um ambiente virtual:
```bash
python -m venv venv
```

4. Ative o ambiente virtual:
```bash
source bin/env/activate
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
cd frontend
```

9. Instale as dependências do Node.js:
```bash
npm install
```

10. Execute o servidor:
```bash
npm run dev
```

### Firebase
11. Crie um projeto no Firebase e adicione as credenciais do Firebase ao seu projeto:
  - Clique em "Adicionar projeto" no Console do Firebase.
  - Siga as instruções para criar um novo projeto.
  - No console do Firebase, selecione seu projeto e clique em "Configurações do projeto".
  - Na seção "Seus aplicativos", clique em "Adicionar app".
  - Selecione "Web" e siga as instruções para registrar o aplicativo.
  - Copie as credenciais do Firebase para o seu projeto.

12. Atualize as configurações do Firebase no seu projeto:
    - No diretório do frontend, crie um arquivo chamado ".env.local".
    - Cole as credenciais do Firebase no arquivo ".env.local".
    ```bash
    REACT_APP_FIREBASE_API_KEY=your-api-key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
    REACT_APP_FIREBASE_DATABASE_URL=your-database-url
    REACT_APP_FIREBASE_PROJECT_ID=your-project-id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
    REACT_APP_FIREBASE_APP_ID=your-app-id
    REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id
    ```

## Funcionalidades
O sistema possui as seguintes funcionalidades:
  - Cadastro de usuários.
  - Criação de torneios.
  - Registro de partidas.
  - Visualização de tabelas de classificação.

## Uso
Este sistema permite que você crie uma tabela de campeonato de tênis de mesa e a atualize em tempo real usando o Firebase. Você pode adicionar jogadores, inserir resultados de jogos e ver a classificação atualizada da tabela em tempo real.