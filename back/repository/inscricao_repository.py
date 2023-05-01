from model import InscricaoModel
from repository.generic_repository import GenericRepository


class InscricaoRepository(GenericRepository):
    def __init__(self):
        super().__init__(InscricaoModel)
