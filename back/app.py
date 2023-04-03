import json
from flask import Flask
from Controllers.UserController import routes
from Models.Enums.ConditionEnum import ConditionEnum
from Models.Enums.SexEnum import SexEnum
from Models.Enums.TournamentTypeEnum import TournamentTypeEnum
from Models.user_model import *
from flask_sqlalchemy import SQLAlchemy
from Utils.db_utils import DbUtils
from database import db

app = Flask(__name__)
#mudar endereço do banco, esse é o default pro pc do ifpr
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:bancodedados@localhost/tcc'
app.register_blueprint(routes, url_prefix='/users')

db.init_app(app)

DbUtils.test_database_connection(app, db)

with app.app_context():
    db.create_all()

@app.route("/")
def hello_world():
    return "Hello world"


if __name__ == "__main__": app.run(debug=True)

print(app.url_map)
