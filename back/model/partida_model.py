from sqlalchemy import Column, Integer, ForeignKey, Date, Enum, Boolean
from sqlalchemy_serializer import SerializerMixin

from extension.database import database
from model.Enums.etapa_enum import EtapaEnum


class PartidaModel(database.Model, SerializerMixin):
    __tablename__ = "partida"

    id = Column(Integer, primary_key=True)
    etapa = Column(Enum(EtapaEnum))
    data_partida = Column(Date, nullable=True)
    numero_partida = Column(Integer, nullable=True)
    grupo_id = Column(Integer, ForeignKey('grupo.id'), nullable=True)
    torneio_id = Column(Integer, ForeignKey('torneio.id'), nullable=False)
    inscricao_atleta1_id = Column(Integer, ForeignKey('inscricao.id'), nullable=True)
    inscricao_atleta2_id = Column(Integer, ForeignKey('inscricao.id'), nullable=True)
    inscricao_atleta1 = database.relationship("InscricaoModel", foreign_keys=[inscricao_atleta1_id])
    inscricao_atleta2 = database.relationship("InscricaoModel", foreign_keys=[inscricao_atleta2_id])
    partida_origem_id_atleta_1 = Column(Integer, ForeignKey('partida.id'), nullable=True)
    partida_origem_id_atleta_2 = Column(Integer, ForeignKey('partida.id'), nullable=True)
    id_proxima_partida = Column(Integer, ForeignKey('partida.id'), nullable=True)
    pontos_atleta_1 = Column(Integer, default=0)
    pontos_atleta_2 = Column(Integer, default=0)
    vencedor_id = Column(Integer, ForeignKey('inscricao.id'), nullable=True)
    vencedor = database.relationship("InscricaoModel", foreign_keys=[vencedor_id])
    concluida = Column(Boolean, default=False)
    round = Column(Integer, default=0)
