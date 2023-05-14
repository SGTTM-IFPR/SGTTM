from flask import request
import jwt
from functools import wraps
from flask_restx import abort
from extension.security import SECRET_KEY

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        print(request.headers)
        if 'Authorization' in request.headers:
            token = request.headers['Authorization']

        if not token:
            abort(401, 'Token de autenticação faltando ou inválido')   

        try:
            auth_token = token.split(" ")[1]
            data = jwt.decode(auth_token, SECRET_KEY, algorithms=["HS256"])
        except:
            abort(401, 'Token de autenticação inválido')

        return f(*args, **kwargs)

    return decorated