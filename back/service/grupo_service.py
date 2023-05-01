from dependency_injector.wiring import inject

from model import GrupoModel
from repository.grupo_repository import GrupoRepository
from service.generic_service import GenericService


class GrupoService(GenericService[GrupoModel]):

    @inject
    def __init__(self, repository: GrupoRepository):
        super().__init__(repository)
