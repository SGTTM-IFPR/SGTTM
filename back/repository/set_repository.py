from model import SetModel
from repository.generic_repository import GenericRepository


class SetRepository(GenericRepository):
    def __init__(self):
        super().__init__(SetModel)
