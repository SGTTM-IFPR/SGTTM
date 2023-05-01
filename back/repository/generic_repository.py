from extension.database import database
from typing import Dict, Any


class GenericRepository:

    def __init__(self, model: database.Model) -> None:
        self.session = database.session
        self.model = model

    def create(self, data: Dict[str, Any]) -> Dict[str, Any]:
        try:
            print(data)
            model = self.model(**data)
            self.session.add(model)
            self.session.commit()
            return model
        except Exception as e:
            print(e)
            print('rollback')
            self.session.rollback()
            return {'error': str(e)}, 400

    def get_all(self) -> Dict[str, Any]:
        return self.model.query.all()

    def get_by_id(self, id: int) -> Dict[str, Any]:
        return self.model.query.filter_by(id=id).first()

    def update(self, id: int, data: Dict[str, Any]) -> Dict[str, Any]:
        entity = self.get_by_id(id)
        if entity:
            for key, value in data.items():
                setattr(entity, key, value)
            self.session.commit()
            return entity

    def delete(self, id: int) -> bool:
        entity = self.get_by_id(id)
        if entity:
            self.session.delete(entity)
            self.session.commit()
            return True
        return False
