from sqlalchemy import Column, Integer, String, Enum, Date
from sqlalchemy_serializer import SerializerMixin

from extension.database import database
from model.Enums.tipo_torneio_enum import TipoTorneioEnum


class TorneioModel(database.Model, SerializerMixin):
    __tablename__ = "torneio"

    id = Column(Integer, primary_key=True)
    nome = Column(String(100), nullable=False)
    data_inicio = Column(Date, nullable=False)
    data_final = Column(Date, nullable=False)
    local = Column(String(100), nullable=False)
    tipo_torneio = Column(Enum(TipoTorneioEnum))
