import json
import jwt
from dependency_injector.wiring import inject, Provide
from flask import request, jsonify
from flask_restx import Resource
from flask import make_response
from container.container import Container
from service.usuario_service import UsuarioService
from .authentication_namespace import authentication_namespace as api
from .token_controller import chave_secreta


@api.route("/login")
class LoginController(Resource):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.service = self.inject_service()

    @inject
    def inject_service(
        self, service: UsuarioService = Provide[Container.usuario_service]
    ) -> UsuarioService:
        return service

    def post(self):
        # replace with authentication logic
        email = request.json.get("username")
        password = request.json.get("password")

        if self.service.get_usuario_by_email(email):
            usuario = self.service.get_usuario_by_email(email)
            if password == usuario.senha:
                if usuario.administrador == False:
                    role = "user"
                    message = {"message": "Login successful as User"}
                else:
                    role = "admin"
                    message = {"message": "Login successful as admin"}

            payload = {"username": email, "role": role}
            token = jwt.encode(payload, chave_secreta, algorithm="HS256")

            response = {"message": message, "token": token}
            response = make_response(json.dumps(response), 200)

            return response
        else:
            return {"message": "Invalid email or password"}, 404

