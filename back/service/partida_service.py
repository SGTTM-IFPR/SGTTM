from dependency_injector.wiring import inject

from model import PartidaModel
from repository.partida_repository import PartidaRepository
from service.generic_service import GenericService


class PartidaService(GenericService[PartidaModel]):

    @inject
    def __init__(self, repository: PartidaRepository):
        super().__init__(repository)
