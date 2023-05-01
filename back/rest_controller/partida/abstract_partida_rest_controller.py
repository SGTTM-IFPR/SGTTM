from flask_restx import Namespace, Resource
from dependency_injector.wiring import inject, Provide
from service.partida_service import PartidaService
from container.container import Container


class AbstractPartidaRestController(Resource):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.service = self.inject_service()

    @inject
    def inject_service(self, service: PartidaService = Provide[Container.partida_service]) -> PartidaService:
        return service
