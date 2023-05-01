from sqlalchemy import Column, Integer, String, ForeignKey, Enum
from sqlalchemy.orm import relationship
from flask_sqlalchemy.model import Model
from model.Enums.condicao_enum import CondicaoEnum
from extension.database import database


class InscricaoModel(database.Model):
    __tablename__ = "inscricao"

    id = Column(Integer, primary_key=True)
    usuario_id = Column(Integer, ForeignKey('usuario.id'), nullable=False)
    torneio_id = Column(Integer, ForeignKey('torneio.id'), nullable=False)
    condicao = Column(Enum(CondicaoEnum))
    grupo_id = Column(Integer, ForeignKey('grupo.id'), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'usuario_id': self.usuario_id,
            'torneio_id': self.torneio_id,
            'condicao': self.condicao.name if self.condicao else None,
            'grupo_id': self.grupo_id

        }
