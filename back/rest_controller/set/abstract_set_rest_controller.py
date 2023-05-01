from flask_restx import Namespace, Resource
from dependency_injector.wiring import inject, Provide
from service.set_service import SetService
from container.container import Container


class AbstractSetRestController(Resource):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.service = self.inject_service()

    @inject
    def inject_service(self, service: SetService = Provide[Container.set_service]) -> SetService:
        return service
