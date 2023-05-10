from dependency_injector.wiring import inject, Provide
from flask import request, jsonify
from flask_restx import Resource

from container.container import Container
from service.usuario_service import UsuarioService
from .authentication_namespace import authentication_namespace as api


@api.route('/logout')
class LogoutController(Resource):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.service = self.inject_service()

    @inject
    def inject_service(self, service: UsuarioService = Provide[Container.usuario_service]) -> UsuarioService:
        return service

    def post(self):
        return jsonify({'message': 'Logout successful'}), 200
