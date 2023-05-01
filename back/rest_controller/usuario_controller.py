# from flask import Flask, request, jsonify
# from flask import Blueprint
#
# from model.Enums.sexo_enum import SexoEnum
# from model.usuario_model import UsuarioModel
# from service.usuario_service import UsuarioService
#
# UsuarioController = Blueprint('UsuarioListController', __name__)
# usuario_service = UsuarioService(None)
#
# # create a new usuario
# @UsuarioController.route('/', methods=['POST', 'OPTIONS'])
# def create_usuario():
#     try:
#         usuario_data = request.json
#         usuario = usuario_service.create_usuario(usuario_data)
#         if type(usuario) == UsuarioModel:
#             return jsonify(usuario.to_dict()), 201
#         else:
#             return jsonify(usuario)
#     except Exception as e:
#         print(e)
#         return jsonify({'error': str(e)})
#
# # get all usuarios
# @UsuarioController.route('/', methods=['GET'])
# def get_usuarios():
#     usuarios = usuario_service.get_all_usuarios()
#     usuario_dicts = [usuario.to_dict() for usuario in usuarios]
#     return jsonify(usuario_dicts), 200
#
# # get a single usuario
# @UsuarioController.route('/<int:usuario_id>', methods=['GET'])
# def get_usuario(usuario_id):
#     usuario = usuario_service.get_usuario_by_id(usuario_id)
#     if usuario:
#         return jsonify(usuario.to_dict()), 200
#     else:
#         return jsonify({'message': 'usuario not found'}), 404
#
# # update a usuario
# @UsuarioController.route('/<int:usuario_id>', methods=['PUT'])
# def update_usuario(usuario_id):
#     usuario_data = request.json
#     usuario = usuario_service.update_usuario(usuario_id, usuario_data)
#     if usuario:
#         return jsonify(usuario.to_dict()), 200
#     else:
#         return jsonify({'message': 'usuario not found'}), 404
#
# # delete a usuario
# @UsuarioController.route('/<int:usuario_id>', methods=['DELETE'])
# def delete_usuario(usuario_id):
#     deleted = usuario_service.delete_usuario(usuario_id)
#     if deleted:
#         return jsonify({'message': 'usuario deleted successfully'}), 200
#     else:
#         return jsonify({'message': 'usuario not found'}), 404
#
# # buscar usuario por cpf
# @UsuarioController.route('/cpf/<cpf>', methods=['GET'])
# def get_usuario_by_cpf(cpf):
#     usuario = usuario_service.get_by_cpf(cpf)
#     if usuario:
#         return jsonify(usuario.to_dict()), 200
#     else:
#         return jsonify({'message': 'usuario not found'}), 404