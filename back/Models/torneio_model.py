from Models.Enums.tipo_torneio_enum import TipoTorneioEnum
from database import Database


class TorneioModel(Database.db.Model):
    __tablename__ = "torneio"

    id = Database.db.Column(Database.db.Integer, primary_key=True)
    nome = Database.db.Column(Database.db.String(100), nullable=False)
    data_inicio = Database.db.Column(Database.db.Date, nullable=False)
    data_final = Database.db.Column(Database.db.Date, nullable=False)
    local = Database.db.Column(Database.db.String(100), nullable=False)
    tipo_torneio = Database.db.Column(Database.db.Enum(TipoTorneioEnum))

    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'data_inicio': self.data_inicio.isoformat(),
            'data_final': self.data_final.isoformat(),
            'local': self.local,
            'tipo_torneio': self.tipo_torneio.name,
        }
