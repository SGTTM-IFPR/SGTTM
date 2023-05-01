from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy_serializer import SerializerMixin

from extension.database import database


class SetModel(database.Model, SerializerMixin):
    __tablename__ = "set"

    id = Column(Integer, primary_key=True)
    resultado_inscrito1 = Column(Integer, nullable=False)
    resultado_inscrito2 = Column(Integer, nullable=False)
    numero_set = Column(Integer, nullable=False)
    id_partida = Column(Integer, ForeignKey('partida.id'), nullable=False)
