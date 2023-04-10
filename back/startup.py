import json
from flask import Flask
from flask_cors import CORS

from Controllers.user_controller import routes
from Models.Enums.ConditionEnum import ConditionEnum
from Models.Enums.SexEnum import SexEnum
from Models.Enums.TournamentTypeEnum import TournamentTypeEnum
from Models.user_model import *
from flask_sqlalchemy import SQLAlchemy
from Utils.db_utils import DbUtils
from database import Database


class Startup:
    def __init__(self, db_uri='mysql+mysqlconnector://root:database@localhost/tcc'):
        self.app = Flask(__name__)
        self.cors = CORS(self.app)
        self.app.config['CORS_HEADERS'] = 'application/json'
        self.app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
        self.app.register_blueprint(routes, url_prefix='/users')
        Database.db.init_app(self.app)
        DbUtils.test_database_connection(self.app, Database.db)
        with self.app.app_context():
            Database.db.create_all()

    def run(self, debug=True):
        self.app.run(debug=debug)

    def get_url_map(self):
        return self.app.url_map


if __name__ == "__main__":
    my_app = Startup()
    my_app.run()
    print(my_app.get_url_map())
