from dependency_injector.wiring import inject

from model import PontuacaoModel
from repository.pontuacao_repository import PontuacaoRepository
from service.generic_service import GenericService


class PontuacaoService(GenericService[PontuacaoModel]):

    @inject
    def __init__(self, repository: PontuacaoRepository):
        super().__init__(repository)
