from database import Database
from Models.inscricao_model import InscricaoModel

class InscricaoRepository:
    def create_inscricao(self, inscricao_data):
        try:
            inscricao = InscricaoModel(**inscricao_data)
            Database.db.session.add(inscricao)
            Database.db.session.commit()
            return inscricao
        except Exception as e:
            Database.db.session.rollback()
            return {'error': str(e)}, 400
        
    def delete_inscricao(self, inscricao_id):
        inscricao = self.get_inscricao_by_id(inscricao_id)
        if inscricao:
            Database.db.session.delete(inscricao)
            Database.db.session.commit()
            return True
        return False
    
    def get_all_inscricao(self):
        return InscricaoModel.query.all()