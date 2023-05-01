from flask import request

from .set_namespace import set_namespace as api
from .abstract_set_rest_controller import AbstractSetRestController


@api.route('/<int:set_id>')
class SetController(AbstractSetRestController):

    def get(self, set_id):
        '''Obter informações de um set pelo ID'''
        set_data = self.service.get_by_id(set_id)
        if set_data:
            return set_data.to_dict(), 200
        else:
            return {'error': 'Set não encontrado'}, 404

    def put(self, set_id):
        '''Atualizar informações de um set pelo ID'''
        set_data = request.json
        updated_set = self.service.update(set_id, set_data)
        if updated_set:
            return updated_set.to_dict(), 200
        else:
            return {'error': 'Set não encontrado'}, 404

    def delete(self, set_id):
        '''Excluir um set pelo ID'''
        result = self.service.delete(set_id)
        if result:
            return '', 204
        else:
            return {'error': 'Set não encontrado'}, 404