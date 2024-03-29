import json
import jwt
import hashlib
from dependency_injector.wiring import inject, Provide
from flask import request, jsonify, Response
from flask_restx import Resource
from flask import make_response
from container.container import Container
from extension.security import SECRET_KEY
from service.usuario_service import UsuarioService
from .authentication_namespace import authentication_namespace as api

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
        auth = request.authorization
        try:
            if not auth or not auth.username or not auth.password:
                return make_response(
                    {"message:Could not verify", "WWW-Authenticate:"'Basic realm="Login required!"'},
                    401
                )
        except:
            pass
        # replace with authentication logic
        email = request.json.get("email")
        password = hashlib.sha256(request.json.get("password").encode()).hexdigest()

        if self.service.get_usuario_by_email(email):
            usuario = self.service.get_usuario_by_email(email)
            if password == usuario.senha:
                role = "user" if usuario.administrador == False else "admin"
                message =  "Login successful as " + role
                payload = {"username": email, "role": role, "nome": usuario.nome, "id": usuario.id}
                token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
                response = {"message": message, "token": token, "role": role}
                response = Response(json.dumps(response), 200, mimetype="application/json")
                return response
        else:
            return {"message": "Invalid email or password"}, 404