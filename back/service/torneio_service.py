from dependency_injector.wiring import inject

from model import TorneioModel
from repository.torneio_repository import TorneioRepository
from service.generic_service import GenericService


class TorneioService(GenericService[TorneioModel]):

    @inject
    def __init__(self, repository: TorneioRepository):
        super().__init__(repository)
