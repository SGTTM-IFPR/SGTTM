from database import Database

class PartidaModel(Database.db.Model):
    __tablename__ = "partida"

    id = Database.db.Column(Database.db.Integer, primary_key=True)
    etapa = Database.db.Column(Database.db.String(100), nullable=False)
    data_partida = Database.db.Column(Database.db.Date, nullable=False)
    numero_partida = Database.db.Column(Database.db.Integer, nullable=False)
    grupo_id = Database.db.Column(Database.db.Integer, Database.db.ForeignKey('grupo.id'), nullable=False)
    inscricao_atleta1_id = Database.db.Column(Database.db.Integer, Database.db.ForeignKey('inscricao.id'), nullable=False)
    inscricao_atleta2_id = Database.db.Column(Database.db.Integer, Database.db.ForeignKey('inscricao.id'), nullable=False)


