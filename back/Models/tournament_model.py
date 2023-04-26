from Models.Enums.TournamentTypeEnum import TournamentTypeEnum
from database import Database

class TournamentModel(Database.db.Model):
    __tablename__ = "TOURNAMENT"

    id = Database.db.Column(Database.db.Integer, primary_key=True)
    name = Database.db.Column(Database.db.String(100), nullable=False)
    date_start = Database.db.Column(Database.db.Date, nullable=False)
    date_end = Database.db.Column(Database.db.Date, nullable=False)
    local = Database.db.Column(Database.db.String(100), nullable=False)
    type_tournament = Database.db.Column(Database.db.Enum(TournamentTypeEnum))

    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.name,
            'data_inicio': self.date_start.isoformat(),
            'data_final': self.date_end.isoformat(),
            'local': self.local,
            'tipo_torneio': self.type_tournament.name,
        }