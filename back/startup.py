import json
import random

from flask import Flask
from flask_cors import CORS

from Controllers.user_controller import UserController
from Controllers.auth_controller import AuthController
from Controllers.tournament_controller import TournamentController
from Controllers.inscricao_controller import InscricaoController
from Models import UsuarioModel, TorneioModel, InscricaoModel, GrupoModel, PartidaModel, PontuacaoModel, SetModel
from Models.Enums import CondicaoEnum, EtapaEnum, SexoEnum, TipoTorneioEnum

from flask_sqlalchemy import SQLAlchemy

from Services.user_service import UserService
from Services.tournament_service import TournamentService
from Services.inscricao_service import InscricaoService
from Utils.db_utils import DbUtils
from database import Database


class Startup:
    def __init__(self, db_uri='mysql+mysqlconnector://root:Bancodedados1#@localhost/tcc'):
        self.app = Flask(__name__)
        self.cors = CORS(self.app)
        self.app.config['CORS_HEADERS'] = 'application/json'
        self.app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
        self.app.register_blueprint(UserController, url_prefix='/users')
        self.app.register_blueprint(TournamentController, url_prefix='/tournaments')
        self.app.register_blueprint(InscricaoController, url_prefix='/inscricoes')
        self.app.register_blueprint(AuthController, url_prefix='/auth')
        Database.db.init_app(self.app)
        DbUtils.test_database_connection(self.app, Database.db)
        with self.app.app_context():
            Database.db.create_all()
            user_service = UserService()
            user_data = {
                "cpf": str(random.randint(0, 1000)),
                "senha": "minha_senha",
                "nome": "Fulano de Tal",
                "email": "rafhael369@gmail.com",
                "data_de_nascimento": "1990-01-01",
                "administrador": False,
                "clube": "Meu Clube",
                "federacao": "Minha Federação",
                "sexo": SexoEnum.MASCULINO
            }
            user_service.create_user(user_data)
        
            tournament_service = TournamentService()
            tournament_data = {
                "nome": str("Ifpr-foz"),
                "data_inicio": "2023-05-01",
                "data_final": "2023-05-01",
                "local": "Foz do Iguaçu",
                "tipo_torneio": TipoTorneioEnum.COPA
            }
            tournament_service.create_tournament(tournament_data)
            
            inscricao_service = InscricaoService()
            inscricao_data = {
                "usuario_id": 44,
                "torneio_id": 44,
                "condicao": CondicaoEnum.ESTUDANTE_IFPR
            }
            inscricao_service.create_inscricao(inscricao_data)


    def run(self, debug=True):
        self.app.run(debug=debug)

    def get_url_map(self):
        return self.app.url_map


if __name__ == "__main__":
    my_app = Startup()
    my_app.run()
    print(my_app.get_url_map())

