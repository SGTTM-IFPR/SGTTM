from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy_serializer import SerializerMixin

from extension.database import database


class PontuacaoModel(database.Model, SerializerMixin):
    __tablename__ = "pontuacao"

    id = Column(Integer, primary_key=True)
    pontos = Column(Integer, nullable=False)
    id_torneio = Column(Integer, ForeignKey('torneio.id'), nullable=False)
    id_inscricao = Column(Integer, ForeignKey('inscricao.id'), nullable=False)
