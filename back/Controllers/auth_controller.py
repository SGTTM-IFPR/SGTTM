from flask import Flask, request, jsonify, make_response
from flask import Blueprint
import datetime
import jwt
import hashlib
from Models.Enums import SexEnum
from Models.user_model import UserModel
from Models.user_token_model import UserTokenModel
from Services.user_service import UserService
from database import Database

AuthController = Blueprint('AuthController', __name__)
user_service = UserService()

secret_key = 'SENHA_SUPER_SECRETA'

@AuthController.route('/login', methods=['POST'])
def login():
    # Verificar credenciais do usuário
    email = request.json.get('username')
    password = request.json.get('password')

    user = user_service.get_user_by_email(email)
    if user and user.password == password:
        # Gerar token de autenticação
        token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Token expira em 1 hora
        }, secret_key, algorithm='HS256')

        # Armazenar token no banco de dados

        response = jsonify({'message': 'Login successful',
                            'token': token})
        response.headers['Authorization'] = f'Bearer {token}'
        print(token)
        return response, 200

    return jsonify({'message': 'Invalid username or password.'}), 401

@AuthController.route('/logout', methods=['POST'])
def logout():
    # Remover token do banco de dados
    auth_header = request.headers.get('Authorization')
    
    return jsonify({'message': 'Logout successful'}), 200