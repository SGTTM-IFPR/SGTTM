from flask import Flask
from flask import Blueprint

from Models.Enums import SexEnum

routes = Blueprint('UserController', __name__)

# create a new user
@routes.route('/', methods=['POST'])
def create_user(user):

    return 'User created successfully'

# get all users
@routes.route('/', methods=['GET'])
def get_users():
    return 'List of users'

# get a single user
@routes.route('/<int:user_id>', methods=['GET'])
def get_user(user_id):
    return f'User with id {user_id}'

# update a user
@routes.route('/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    return f'User with id {user_id} updated successfully'

# delete a user
@routes.route('/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    return f'User with id {user_id} deleted successfully'
