from database import Database
from Models.Enums.condicao_enum import CondicaoEnum

class InscricaoModel(Database.db.Model):
    __tablename__ = "inscricao"
    
    id = Database.db.Column(Database.db.Integer, primary_key=True)
    usuario_id = Database.db.Column(Database.db.Integer, Database.db.ForeignKey('usuario.id'), nullable=False)
    torneio_id = Database.db.Column(Database.db.Integer, Database.db.ForeignKey('torneio.id'), nullable=False)
    condicao = Database.db.Column(Database.db.Enum(CondicaoEnum))
    grupo_id = Database.db.Column(Database.db.Integer, Database.db.ForeignKey('grupo.id'), nullable=False)
    def to_dict(self):
        return {
            'id': self.id,
            'usuario_id': self.usuario_id,
            'torneio_id': self.torneio_id,
            'condicao': self.condicao.name if self.condicao else None,
            'group_id': self.grupo_id

        }