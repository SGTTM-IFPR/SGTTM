from dependency_injector.wiring import inject

from model import GrupoModel
from repository.grupo_repository import GrupoRepository
from service.generic_service import GenericService


class GrupoService(GenericService[GrupoModel]):

    @inject
    def __init__(self, repository: GrupoRepository):
        super().__init__(repository)
    
    def create(self, data):
        return self.repository.create(data)
    
    def get_by_torneio_id(self, torneio_id):
        return self.repository.get_by_torneio_id(torneio_id)
    
    def get_by_name_and_torneio_id(self, name, torneio_id):
        return self.repository.get_by_name_and_torneio_id(name, torneio_id)
