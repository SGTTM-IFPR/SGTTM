from flask import Flask, request, jsonify
from flask import Blueprint

from Models.Enums import SexEnum
from Services.user_service import UserService

routes = Blueprint('UserController', __name__)
user_service = UserService()

# create a new user
@routes.route('/', methods=['POST'])
def create_user():
    user_data = request.json
    user = user_service.create_user(user_data)
    return jsonify(user), 201

# get all users
@routes.route('/', methods=['GET'])
def get_users():
    users = user_service.get_all_users()
    return jsonify(users), 200

# get a single user
@routes.route('/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = user_service.get_user_by_id(user_id)
    if user:
        return jsonify(user), 200
    else:
        return jsonify({'message': 'User not found'}), 404

# update a user
@routes.route('/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user_data = request.json
    user = user_service.update_user(user_id, user_data)
    if user:
        return jsonify(user), 200
    else:
        return jsonify({'message': 'User not found'}), 404

# delete a user
@routes.route('/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    deleted = user_service.delete_user(user_id)
    if deleted:
        return jsonify({'message': 'User deleted successfully'}), 200
    else:
        return jsonify({'message': 'User not found'}), 404