from flask import Flask, request, jsonify, make_response
from flask import Blueprint
import datetime
import jwt
import hashlib
from Models.Enums import SexEnum
from Models.user_model import UserModel
from Services.user_service import UserService
from database import Database

AuthController = Blueprint('AuthController', __name__)
user_service = UserService()

secret_key = 'SENHA_SUPER_SECRETA'

@AuthController.route('/login', methods=['POST'])
def login():
    email = request.json.get('username')
    password = request.json.get('password')

    if user_service.get_user_by_email(email) != '':
        usuario = user_service.get_user_by_email(email)

        if password == usuario.password:

            if usuario.administrator == 1:
                payload = {'username': email, 'role': 'admin'}
            else:
                payload = {'username': email, 'role': 'user'}

            chave_secreta = 'minha_chave_secreta' # chave secreta para assinar o token
            token = jwt.encode(payload, chave_secreta, algorithm='HS256')

            response = jsonify({'message': 'Login successful', 'token': token})
            response.headers['Authorization'] = f'Bearer {token}'
            return response, 200
    else:
        return {'message': 'Invalid email or password'}, 401

@AuthController.route('/logout', methods=['POST'])
def logout():
    # Remover token do banco de dados

    return jsonify({'message': 'Logout successful'}), 200


@AuthController.route('/token', methods=['POST'])
def auth_token():
    token = request.json.get('token')
    print(token) #pega o token no back-end,  a partir daqui podemos validar toda controller
    return jsonify({'message': 'Logout successful'}), 200