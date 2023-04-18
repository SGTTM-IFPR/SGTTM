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
    email = request.json.get('username')
    password = request.json.get('password')

    if(user_service.get_user_by_email(email) != ''):
        user = user_service.get_user_by_email(email)

        if(password == user.password):

            if(user.administrator == 1):
                token = 'ADMIN'
                response = jsonify({'message': 'Login successful as Admin'})
                response.headers['Authorization'] = f'Bearer {token}'
                return response, 200
            else:
                token = 'USER'
                response = jsonify({'message': 'Login successful as Admin'})
                response.headers['Authorization'] = f'Bearer {token}'
                return response, 200
            
    return jsonify({'message': 'Usuário ou senha inválidos.'}), 401

@AuthController.route('/logout', methods=['POST'])
def logout():
    # replace with authentication logic
    return jsonify({'message': 'Logout successful'}), 200



