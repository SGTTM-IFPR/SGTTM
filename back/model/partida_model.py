from sqlalchemy import Column, Integer, String, ForeignKey, Date
from sqlalchemy_serializer import SerializerMixin

from extension.database import database


class PartidaModel(database.Model, SerializerMixin):
    __tablename__ = "partida"

    id = Column(Integer, primary_key=True)
    etapa = Column(String(100), nullable=False)
    data_partida = Column(Date, nullable=False)
    numero_partida = Column(Integer, nullable=False)
    grupo_id = Column(Integer, ForeignKey('grupo.id'), nullable=False)
    inscricao_atleta1_id = Column(Integer, ForeignKey('inscricao.id'), nullable=False)
    inscricao_atleta2_id = Column(Integer, ForeignKey('inscricao.id'), nullable=False)
