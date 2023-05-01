
from sqlalchemy import Column, Integer, String, ForeignKey, Enum
from sqlalchemy.orm import relationship
from flask_sqlalchemy.model import Model
from extension.database import database


class PontuacaoModel(database.Model):
    __tablename__ = "pontuacao"

    id = Column(Integer, primary_key=True)
    pontos = Column(Integer, nullable=False)
    id_torneio = Column(Integer, ForeignKey('torneio.id'), nullable=False)
    id_inscricao = Column(Integer, ForeignKey('inscricao.id'), nullable=False)
