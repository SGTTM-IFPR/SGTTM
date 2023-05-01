from flask_restx import Namespace, Resource
from dependency_injector.wiring import inject, Provide
from service.usuario_service import UsuarioService
from container.container import Container


class AbstractUsuarioRestController(Resource):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.service = self.inject_service()

    @inject
    def inject_service(self, service: UsuarioService = Provide[Container.usuario_service]) -> UsuarioService:
        return service
