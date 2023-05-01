from model import TorneioModel
from repository.generic_repository import GenericRepository


class TorneioRepository(GenericRepository):
    def __init__(self):
        super().__init__(TorneioModel)
