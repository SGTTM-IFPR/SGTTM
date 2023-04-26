from database import Database


class GrupoModel(Database.db.Model):
    __tablename__ = "grupo"

    id = Database.db.Column(Database.db.Integer, primary_key=True)
    nome = Database.db.Column(Database.db.String(100), nullable=False)
    torneio_id = Database.db.Column(Database.db.Integer, Database.db.ForeignKey('torneio.id'))
    partidas = Database.db.relationship('PartidaModel', backref='grupo')
    inscricoes = Database.db.relationship('InscricaoModel', backref='grupo')

    def to_dict(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "torneio_id": self.torneio_id,
            "partidas": [partida.to_dict() for partida in self.partidas],
            "inscricoes": [inscricao.to_dict() for inscricao in self.inscricoes]
        }
