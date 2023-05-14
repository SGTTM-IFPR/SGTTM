from flask import request
import jwt
from functools import wraps
from flask_restx import abort
from extension.security import SECRET_KEY

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'Authorization' in request.headers:
            token = request.headers['Authorization']           
            print(token)

        if not token:
            print('Token de autenticação faltando ou inválido')
            abort(401, 'Token de autenticação faltando ou inválido')   

        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        except:
            print('Token de autenticação inválido')
            abort(401, 'Token de autenticação inválido')

        return f(*args, **kwargs)

    return decorated