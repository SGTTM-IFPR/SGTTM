from dependency_injector.wiring import inject

from model import TorneioModel
from repository.torneio_repository import TorneioRepository
from service.generic_service import GenericService


class TorneioService(GenericService[TorneioModel]):

    @inject
    def __init__(self, repository: TorneioRepository):
        super().__init__(repository)

    def verify_torneio_is_go_to_next_step(self, torneio_id):
        torneio:TorneioModel = self.get_by_id(torneio_id)


        return self.repository.verify_torneio_is_go_to_next_step(torneio_id)

