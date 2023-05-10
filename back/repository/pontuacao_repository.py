from model import PontuacaoModel
from repository.generic_repository import GenericRepository


class PontuacaoRepository(GenericRepository):
    def __init__(self):
        super().__init__(PontuacaoModel)
