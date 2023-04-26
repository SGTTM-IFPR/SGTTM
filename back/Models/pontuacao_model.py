from database import Database


class PontuacaoModel(Database.db.Model):
    __tablename__ = "pontuacao"

    id = Database.db.Column(Database.db.Integer, primary_key=True)
    pontos = Database.db.Column(Database.db.Integer, nullable=False)
    id_torneio = Database.db.Column(Database.db.Integer, Database.db.ForeignKey('torneio.id'), nullable=False)
    id_inscricao = Database.db.Column(Database.db.Integer, Database.db.ForeignKey('inscricao.id'), nullable=False)
