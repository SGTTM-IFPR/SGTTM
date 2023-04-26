from database import Database


class SetModel(Database.db.Model):
    __tablename__ = "set"

    id = Database.db.Column(Database.db.Integer, primary_key=True)
    resultado_inscrito1 = Database.db.Column(Database.db.Integer, nullable=False)
    resultado_inscrito2 = Database.db.Column(Database.db.Integer, nullable=False)
    numero_set = Database.db.Column(Database.db.Integer, nullable=False)
    id_partida = Database.db.Column(Database.db.Integer, Database.db.ForeignKey('partida.id'), nullable=False)
