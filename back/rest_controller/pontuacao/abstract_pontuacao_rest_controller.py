from flask_restx import Namespace, Resource
from dependency_injector.wiring import inject, Provide
from service.pontuacao_service import PontuacaoService
from service.partida_service import PartidaService
from repository.partida_repository import PartidaRepository
from repository.pontuacao_repository import PontuacaoRepository
from container.container import Container


class AbstractPontuacaoRestController(Resource):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.service = self.inject_service()

    @inject
    def inject_service(self, service: PontuacaoService = Provide[Container.pontuacao_service]) -> PontuacaoService:
        return service
