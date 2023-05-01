from flask_restx import Namespace, Resource
from dependency_injector.wiring import inject, Provide
from service.inscricao_service import InscricaoService
from container.container import Container


class AbstractInscricaoRestController(Resource):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.service = self.inject_service()

    @inject
    def inject_service(self, service: InscricaoService = Provide[Container.inscricao_service]) -> InscricaoService:
        return service
