import json
import jwt
from flask import request, jsonify
from flask_restx import Resource, Namespace
from flask import make_response
from container.container import Container
from .authentication_namespace import authentication_namespace as api

chave_secreta = "minha_chave_secreta"

@api.route("/token")
class TokenController(Resource):
    def post(self):
        token = request.json.get("token")
        if not token:
            return {"message": "Token not provided"}, 401

        try:
            payload = jwt.decode(token, chave_secreta, algorithms=["HS256"])
            print('valido')
            return {"message": "Token is valid", "payload": payload}, 200
        
        except jwt.InvalidTokenError:
            return {"message": "Token is invalid"}, 404
            