from flask import Flask, request, jsonify, make_response
from flask import Blueprint

from Models.Enums import SexEnum
from Services.user_service import UserService

AuthController = Blueprint('AuthController', __name__)
user_service = UserService()

@AuthController.route('/register', methods=['POST'])
def register():
    # replace with authentication logic
    return jsonify({'message': 'User registered successfully'}), 201

@AuthController.route('/login', methods=['POST'])
def login():
    # replace with authentication logic
    username = request.json.get('username')
    password = request.json.get('password')

    if username == 'root' and password == 'root':
        # se os dados do usuário forem válidos, gerar e retornar um token de acesso
        token = 'test_token'
        response = jsonify({'message': 'Login successful'})
        response.headers['Authorization'] = f'Bearer {token}'
        return response, 200
    else:
        # se os dados do usuário não forem válidos, retornar uma mensagem de erro
        return jsonify({'message': 'Usuário ou senha inválidos.'}), 401

@AuthController.route('/logout', methods=['POST'])
def logout():
    # replace with authentication logic
    return jsonify({'message': 'Logout successful'}), 200
