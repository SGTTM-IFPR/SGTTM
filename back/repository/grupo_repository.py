from model import GrupoModel
from repository.generic_repository import GenericRepository


class GrupoRepository(GenericRepository):
    def __init__(self):
        super().__init__(GrupoModel)
    
    def create(self, data):
        return super().create(data)

    def get_by_torneio_id(self, torneio_id):
        return self.model.query.filter_by(torneio_id=torneio_id).all()
    
    def get_by_name_and_torneio_id(self, name, torneio_id):
        return self.model.query.filter_by(nome=name, torneio_id=torneio_id).first()


