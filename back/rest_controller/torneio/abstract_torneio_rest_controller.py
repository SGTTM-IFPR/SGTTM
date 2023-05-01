from flask_restx import Namespace, Resource
from dependency_injector.wiring import inject, Provide
from service.torneio_service import TorneioService
from container.container import Container


class AbstractTorneioRestController(Resource):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.service = self.inject_service()

    @inject
    def inject_service(self, service: TorneioService = Provide[Container.torneio_service]) -> TorneioService:
        return service