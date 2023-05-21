from model import InscricaoModel
from repository.generic_repository import GenericRepository


class InscricaoRepository(GenericRepository):
    def __init__(self):
        super().__init__(InscricaoModel)

    def get_by_torneio_id(self, torneio_id):
        return InscricaoModel.query.filter_by(torneio_id=torneio_id).all()

    def get_by_grupo_id(self, grupo_id):
        return InscricaoModel.query.filter_by(grupo_id=grupo_id).all()
