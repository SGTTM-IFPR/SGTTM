from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from extension.database import database

class GrupoModel(database.Model):
    __tablename__ = "grupo"

    id = Column(Integer, primary_key=True)
    nome = Column(String(100), nullable=False)
    torneio_id = Column(Integer, ForeignKey('torneio.id'))
    partidas = relationship('PartidaModel', backref='grupo')
    inscricoes = relationship('InscricaoModel', backref='grupo')

    def to_dict(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "torneio_id": self.torneio_id,
            "partidas": [partida.to_dict() for partida in self.partidas],
            "inscricoes": [inscricao.to_dict() for inscricao in self.inscricoes]
        }
