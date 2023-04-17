import json
import random

from flask import Flask
from flask_cors import CORS

from Controllers.user_controller import UserController
from Controllers.auth_controller import AuthController
from Controllers.tournament_controller import TournamentController

from Models.Enums.ConditionEnum import ConditionEnum
from Models.Enums.SexEnum import SexEnum
from Models.Enums.TournamentTypeEnum import TournamentTypeEnum
from Models.user_model import *
from flask_sqlalchemy import SQLAlchemy

from Services.user_service import UserService
from Services.tournament_service import TournamentService
from Utils.db_utils import DbUtils
from database import Database


class Startup:
    def __init__(self, db_uri='mysql+mysqlconnector://root:bancodedados@localhost/tcc'):
        self.app = Flask(__name__)
        self.cors = CORS(self.app)
        self.app.config['CORS_HEADERS'] = 'application/json'
        self.app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
        self.app.register_blueprint(UserController, url_prefix='/users')
        self.app.register_blueprint(TournamentController, url_prefix='/tournaments')
        self.app.register_blueprint(AuthController, url_prefix='/auth')
        Database.db.init_app(self.app)
        DbUtils.test_database_connection(self.app, Database.db)
        with self.app.app_context():
            Database.db.create_all()
            user_service = UserService()
            user_data = {
                "cpf": str(random.randint(0,1000)),
                "password": "my_password",
                "name": "John Doe",
                "email": str(random.randint(0,1000)),
                "birth_date": "1990-01-01",
                "administrator": False,
                "club": "My Club",
                "federation": "My Federation",
                "sex": SexEnum.MALE
            }
            user_service.create_user(user_data)
        
            tournament_service = TournamentService()
            tournament_data = {
                "name": str("Ifpr-foz"),
                "date_start": "2023-05-01",
                "date_end": "2023-05-01",
                "local": "Foz do Iguaçu",
                "type_tournament": TournamentTypeEnum.COUP
            }
            tournament_service.create_tournament(tournament_data)    


    def run(self, debug=True):
        self.app.run(debug=debug)

    def get_url_map(self):
        return self.app.url_map


if __name__ == "__main__":
    my_app = Startup()
    my_app.run()
    print(my_app.get_url_map())

