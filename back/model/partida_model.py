from sqlalchemy import Column, Integer, String, ForeignKey, Date, Enum
from sqlalchemy_serializer import SerializerMixin
from model.Enums.etapa_enum import EtapaEnum
from extension.database import database


class PartidaModel(database.Model, SerializerMixin):
    __tablename__ = "partida"

    id = Column(Integer, primary_key=True)
    etapa = Column(Enum(EtapaEnum))
    data_partida = Column(Date, nullable=True)
    numero_partida = Column(Integer, nullable=True)
    grupo_id = Column(Integer, ForeignKey('grupo.id'), nullable=False)
    inscricao_atleta1_id = Column(Integer, ForeignKey('inscricao.id'), nullable=False)
    inscricao_atleta2_id = Column(Integer, ForeignKey('inscricao.id'), nullable=False)
