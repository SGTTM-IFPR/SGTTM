from sqlalchemy import Column, Integer, String, ForeignKey, Enum
from sqlalchemy.orm import relationship
from flask_sqlalchemy.model import Model
from flask_sqlalchemy.model import Model
from extension.database import database


class SetModel(database.Model):
    __tablename__ = "set"

    id = Column(Integer, primary_key=True)
    resultado_inscrito1 = Column(Integer, nullable=False)
    resultado_inscrito2 = Column(Integer, nullable=False)
    numero_set = Column(Integer, nullable=False)
    id_partida = Column(Integer, ForeignKey('partida.id'), nullable=False)
