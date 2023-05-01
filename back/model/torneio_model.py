from model.Enums.tipo_torneio_enum import TipoTorneioEnum
from extension.database import database

from sqlalchemy import Column, Integer, String, ForeignKey, Enum, Date
from sqlalchemy.orm import relationship
from flask_sqlalchemy.model import Model


class TorneioModel(database.Model):
    __tablename__ = "torneio"

    id = Column(Integer, primary_key=True)
    nome = Column(String(100), nullable=False)
    data_inicio = Column(Date, nullable=False)
    data_final = Column(Date, nullable=False)
    local = Column(String(100), nullable=False)
    tipo_torneio = Column(Enum(TipoTorneioEnum))

    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'data_inicio': self.data_inicio.isoformat(),
            'data_final': self.data_final.isoformat(),
            'local': self.local,
            'tipo_torneio': self.tipo_torneio.name,
        }
