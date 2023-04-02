from Models.Enums.SexEnum import SexEnum
from database import db

class UserModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cpf = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    birth_date = db.Column(db.Date, nullable=False)
    administrator = db.Column(db.Boolean, default=False)
    athlete = db.Column(db.Boolean, default=True)
    club = db.Column(db.String(100), nullable=True)
    federation = db.Column(db.String(100), nullable=True)
    sex = db.Column(db.Enum(SexEnum))
