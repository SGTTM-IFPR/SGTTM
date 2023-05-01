from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from util.db_utils import DbUtils as util

database = SQLAlchemy()


def init_app(app: Flask):
    print("database_extension.init_app")
    with app.app_context():
        database.init_app(app)
        database.db.create_all()
        util.test_database_connection(app, database.db)


def session():
    return database.session
