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
    token = 'test_token'
    response = make_response(jsonify({'message': 'Login successful'}), 200)
    response.headers['Authorization'] = f'Bearer {token}'
    return response

@AuthController.route('/logout', methods=['POST'])
def logout():
    # replace with authentication logic
    return jsonify({'message': 'Logout successful'}), 200
