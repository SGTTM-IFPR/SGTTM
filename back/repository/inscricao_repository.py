from model import InscricaoModel
from repository.generic_repository import GenericRepository


class InscricaoRepository(GenericRepository):
    def __init__(self):
        super().__init__(InscricaoModel)

    def get_by_torneio_id(self, id):
        return InscricaoModel.query.filter_by(torneio_id=id).all()
