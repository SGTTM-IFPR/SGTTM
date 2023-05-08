from flask import request

from .usuario_namespace import usuario_namespace as api
from rest_controller.usuario.abstract_usuario_rest_controller import AbstractUsuarioRestController


@api.route('/<int:user_id>')
class UsuarioController(AbstractUsuarioRestController):

    def get(self, user_id):
        '''Obter informações de um usuário pelo ID'''
        user = self.service.get_by_id(user_id)
        if user:
            return user.to_dict(), 200
        else:
            return {'error': 'Usuário não encontrado'}, 404

    def put(self, user_id):
        '''Atualizar informações de um usuário pelo ID'''
        user_data = request.json
        updated_user = self.service.update(user_id, user_data)
        if updated_user:
            return updated_user.to_dict(), 200
        else:
            return {'error': 'Usuário não encontrado'}, 404

    def delete(self, user_id):
        '''Excluir um usuário pelo ID'''
        result = self.service.delete(user_id)
        if result:
            return '', 200
        else:
            return {'error': 'Usuário não encontrado'}, 404
