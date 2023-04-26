from flask import Flask, request, jsonify
from flask import Blueprint

from Models.Enums.sexo_enum import SexoEnum
from Models.usuario_model import UsuarioModel
from Services.user_service import UserService

UserController = Blueprint('UserController', __name__)
user_service = UserService()

# create a new user
@UserController.route('/', methods=['POST','OPTIONS'])
def create_user():
    try:
        user_data = request.json
        user = user_service.create_user(user_data)
        if type(user) == UsuarioModel:
            return jsonify(user.to_dict()), 201
        else:
            return jsonify(user)
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)})

# get all users
@UserController.route('/', methods=['GET'])
def get_users():
    users = user_service.get_all_users()
    user_dicts = [user.to_dict() for user in users]
    return jsonify(user_dicts), 200

# get a single user
@UserController.route('/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = user_service.get_user_by_id(user_id)
    if user:
        return jsonify(user.to_dict()), 200
    else:
        return jsonify({'message': 'User not found'}), 404

# update a user
@UserController.route('/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user_data = request.json
    user = user_service.update_user(user_id, user_data)
    if user:
        return jsonify(user.to_dict()), 200
    else:
        return jsonify({'message': 'User not found'}), 404

# delete a user
@UserController.route('/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    deleted = user_service.delete_user(user_id)
    if deleted:
        return jsonify({'message': 'User deleted successfully'}), 200
    else:
        return jsonify({'message': 'User not found'}), 404
    
# buscar user por cpf
@UserController.route('/cpf/<cpf>', methods=['GET'])
def get_user_by_cpf(cpf):
    user = user_service.get_by_cpf(cpf)
    if user:
        return jsonify(user.to_dict()), 200
    else:
        return jsonify({'message': 'User not found'}), 404