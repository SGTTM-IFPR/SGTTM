from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy_serializer import SerializerMixin

from extension.database import database


class GrupoModel(database.Model, SerializerMixin):
    __tablename__ = "grupo"

    id = Column(Integer, primary_key=True)
    nome = Column(String(100), nullable=False)
    quantidade_classificados = Column(Integer, nullable=True)
    torneio_id = Column(Integer, ForeignKey('torneio.id'))
    # partidas = relationship('PartidaModel', backref='grupo')
    # inscricoes = relationship('InscricaoModel', backref='grupo')

