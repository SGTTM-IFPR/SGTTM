from database import Database
from Models.Enums.ConditionEnum import ConditionEnum

class InscricaoModel(Database.db.Model):
    __tablename__ = "INSCRICAO"
    
    id = Database.db.Column(Database.db.Integer, primary_key=True)
    usuario_id = Database.db.Column(Database.db.Integer, Database.db.ForeignKey('USER.id'), nullable=False)
    torneio_id = Database.db.Column(Database.db.Integer, Database.db.ForeignKey('TOURNAMENT.id'), nullable=False)
    condicao = Database.db.Column(Database.db.Enum(ConditionEnum))
    
    def to_dict(self):
        return {
            'id': self.id,
            'usuario_id': self.usuario_id,
            'torneio_id': self.torneio_id,
            'condicao': self.condicao.name if self.condicao else None
        }