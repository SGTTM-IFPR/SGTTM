from Models import GrupoModel
from database import Database


class GrupoRepository:
    def __init__(self):
        self.session = Database.db.self.session

    def create_grupo(self, grupo_data):
        try:
            grupo = GrupoModel(**grupo_data)
            self.session.add(grupo)
            self.session.commit()
            return grupo
        except Exception as e:
            self.session.rollback()
            return {'error': str(e)}, 400

    def delete_grupo(self, grupo_id):
        grupo = self.get_grupo_by_id(grupo_id)
        if grupo:
            self.session.delete(grupo)
            self.session.commit()
            return True
        return False

    def get_all_grupo(self):
        return GrupoModel.query.all()
