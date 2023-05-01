from model import GrupoModel
from repository.generic_repository import GenericRepository


class GrupoRepository(GenericRepository):
    def __init__(self):
        super().__init__(GrupoModel)


