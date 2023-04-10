from flask_sqlalchemy import SQLAlchemy


class Database:
    db = SQLAlchemy()

    def __init__(self, app=None):
        if app is not None:
            self.db.init_app(app)
