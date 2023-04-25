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
        }, 'secret_key', algorithm='HS256')

        expiration = datetime.datetime.now() + datetime.timedelta(hours=1)
        token_hash = hashlib.md5(token.encode('utf-8')).hexdigest()

        # Armazenar token no banco de dados
        user_token = UserTokenModel(user_id=user.id, token=token_hash, expiration=expiration)
        Database.db.session.add(user_token)
        Database.db.session.commit()

        response = jsonify({'message': 'Login successful'})
        response.headers['Authorization'] = f'Bearer {token}'
        print(user_token)
        return response, 200

    return jsonify({'message': 'Invalid username or password.'}), 401

@AuthController.route('/logout', methods=['POST'])
def logout():
    # Remover token do banco de dados
    auth_header = request.headers.get('Authorization')
    if auth_header:
        token = auth_header.split(' ')[1]
        user_token = UserTokenModel.query.filter_by(token=token).first()
        if user_token:
            Database.db.session.delete(user_token)
            Database.db.session.commit()
    
    return jsonify({'message': 'Logout successful'}), 200