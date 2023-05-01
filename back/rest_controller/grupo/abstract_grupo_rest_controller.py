from flask_restx import Namespace, Resource
from dependency_injector.wiring import inject, Provide
from service.grupo_service import GrupoService
from container.container import Container


class AbstractGrupoRestController(Resource):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.service = self.inject_service()

    @inject
    def inject_service(self, service: GrupoService = Provide[Container.grupo_service]) -> GrupoService:
        return service
