from flask import request

from .grupo_namespace import grupo_namespace as api
from .abstract_grupo_rest_controller import AbstractGrupoRestController
from ..auth_decorator import token_required


@api.route('/<int:grupo_id>')
class GrupoController(AbstractGrupoRestController):
    @token_required
    def get(self, grupo_id):
        '''Obter informações de um grupo pelo ID'''
        grupo = self.service.get_by_id(grupo_id)
        if grupo:
            return grupo.to_dict(), 200
        else:
            return {'error': 'Grupo não encontrado'}, 404
    @token_required
    def put(self, grupo_id):
        '''Atualizar informações de um grupo pelo ID'''
        grupo_data = request.json
        updated_grupo = self.service.update(grupo_id, grupo_data)
        if updated_grupo:
            return updated_grupo.to_dict(), 200
        else:
            return {'error': 'Grupo não encontrado'}, 404
    @token_required
    def delete(self, grupo_id):
        '''Excluir um grupo pelo ID'''
        result = self.service.delete(grupo_id)
        if result:
            return '', 204
        else:
            return {'error': 'Grupo não encontrado'}, 404
