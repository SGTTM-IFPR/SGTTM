from sqlalchemy import Column, Integer, ForeignKey, Enum
from sqlalchemy_serializer import SerializerMixin

from extension.database import database
from model.Enums.condicao_enum import CondicaoEnum


class InscricaoModel(database.Model, SerializerMixin):
    __tablename__ = "inscricao"

    id = Column(Integer, primary_key=True)
    usuario_id = Column(Integer, ForeignKey('usuario.id'), nullable=False)
    usuario = database.relationship('UsuarioModel')
    torneio_id = Column(Integer, ForeignKey('torneio.id'), nullable=False)
    condicao = Column(Enum(CondicaoEnum))
    grupo_id = Column(Integer, ForeignKey('grupo.id'), nullable=True)
    partidas_jogadas: int = 0
    vitorias: int = 0
    derrotas: int = 0

    def to_dict(self, **kwargs):
        data = super().to_dict()
        data['partidas_jogadas'] = self.partidas_jogadas
        data['vitorias'] = self.vitorias
        data['derrotas'] = self.derrotas
        return data
