from model import PartidaModel
from repository.generic_repository import GenericRepository


class PartidaRepository(GenericRepository):
    def __init__(self):
        super().__init__(PartidaModel)

    def get_by_grupo_id(self, grupo_id):
        return self.model.query.filter_by(grupo_id=grupo_id).all()
