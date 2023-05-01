from typing import Dict, Any, Generic, TypeVar

T = TypeVar('T')


class GenericService(Generic[T]):

    def __init__(self, repository):
        self.repository = repository

    def create(self, data) -> T:
        model = self.repository.create(data)
        return model

    def get_all(self) -> Dict[str, Any]:
        models = self.repository.get_all()
        return models

    def get_by_id(self, id) -> T:
        model = self.repository.get_by_id(id)
        return model

    def update(self, id, data) -> T:
        model = self.repository.update(id, data)
        return model

    def delete(self, id) -> bool:
        deleted = self.repository.delete(id)
        return deleted
