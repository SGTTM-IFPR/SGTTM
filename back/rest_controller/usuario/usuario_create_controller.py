import hashlib
from flask import request
from .usuario_namespace import usuario_namespace as api
from ..auth_decorator import token_required
from model import UsuarioModel
from rest_controller.usuario.abstract_usuario_rest_controller import AbstractUsuarioRestController


@api.route('/create')
class UsuarioCreateController(AbstractUsuarioRestController):
    @token_required
    def post(self):
        '''Criar um novo usuario'''
        user_data = request.json
        user_data['senha'] = hashlib.md5(user_data['senha'].encode()).hexdigest()
        user = self.service.create(user_data)
        if isinstance(user, UsuarioModel):
            return user.to_dict(), 201
        else:
            return {'error': str(user)}
