from dependency_injector.wiring import inject

from model import InscricaoModel
from repository.inscricao_repository import InscricaoRepository
from service.generic_service import GenericService


class InscricaoService(GenericService[InscricaoModel]):

    @inject
    def __init__(self, repository: InscricaoRepository):
        super().__init__(repository)
