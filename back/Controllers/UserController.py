from flask import Flask
from flask import Blueprint

routes = Blueprint('UserController', __name__)

# create a new user
@routes.route('/users', methods=['POST'])
def create_user():
    return 'User created successfully'

# get all users
@routes.route('/users', methods=['GET'])
def get_users():
    return 'List of users'

# get a single user
@routes.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    return f'User with id {user_id}'

# update a user
@routes.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    return f'User with id {user_id} updated successfully'

# delete a user
@routes.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    return f'User with id {user_id} deleted successfully'
