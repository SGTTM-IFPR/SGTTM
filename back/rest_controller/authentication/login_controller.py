from dependency_injector.wiring import inject, Provide
from flask import request, jsonify
from flask_restx import Resource
from flask import make_response
import json
from container.container import Container
from service.usuario_service import UsuarioService
from .authentication_namespace import authentication_namespace as api


@api.route('/login')
class LoginController(Resource):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.service = self.inject_service()

    @inject
    def inject_service(self, service: UsuarioService = Provide[Container.usuario_service]) -> UsuarioService:
        return service

    def post(self):
        # replace with authentication logic
        email = request.json.get('username')
        password = request.json.get('password')

        if self.service.get_usuario_by_email(email) != '':
            usuario = self.service.get_usuario_by_email(email)
            if password == usuario.senha:
                if usuario.administrador == False:
                    token = 'ADMIN'
                    response = {'message': 'Login successful as Admin'}
                    response = make_response(json.dumps(response), 200)
                    response.headers['Authorization'] = f'Bearer {token}'
                    return response
                else:
                    token = 'USER'
                    response = {'message': 'Login successful as User'}
                    response = make_response(json.dumps(response), 200)
                    response.headers['Authorization'] = f'Bearer {token}'
                    return response
