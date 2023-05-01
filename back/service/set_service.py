from dependency_injector.wiring import inject

from model import SetModel
from repository.set_repository import SetRepository
from service.generic_service import GenericService


class SetService(GenericService[SetModel]):

    @inject
    def __init__(self, repository: SetRepository):
        super().__init__(repository)
