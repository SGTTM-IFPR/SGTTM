from sqlalchemy import Column, Integer, String, ForeignKey, Enum, Date
from sqlalchemy.orm import relationship
from flask_sqlalchemy.model import Model
from extension.database import database


class PartidaModel(database.Model):
    __tablename__ = "partida"

    id = Column(Integer, primary_key=True)
    etapa = Column(String(100), nullable=False)
    data_partida = Column(Date, nullable=False)
    numero_partida = Column(Integer, nullable=False)
    grupo_id = Column(Integer, ForeignKey('grupo.id'), nullable=False)
    inscricao_atleta1_id = Column(Integer, ForeignKey('inscricao.id'), nullable=False)
    inscricao_atleta2_id = Column(Integer, ForeignKey('inscricao.id'), nullable=False)
