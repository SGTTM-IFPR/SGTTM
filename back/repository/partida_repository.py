from model import PartidaModel
from repository.generic_repository import GenericRepository


class PartidaRepository(GenericRepository):
    def __init__(self):
        super().__init__(PartidaModel)
