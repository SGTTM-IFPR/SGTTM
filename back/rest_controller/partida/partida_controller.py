from flask import request

from .partida_namespace import partida_namespace as api
from .abstract_partida_rest_controller import AbstractPartidaRestController
from ..auth_decorator import token_required

@api.route('/<int:partida_id>')
class PartidaController(AbstractPartidaRestController):
    @token_required
    def get(self, partida_id):
        '''Obter informações de uma partida pelo ID'''
        partida = self.service.get_by_id(partida_id)
        if partida:
            return partida.to_dict(), 200
        else:
            return {'error': 'Partida não encontrada'}, 404
    @token_required
    def put(self, partida_id):
        '''Atualizar informações de uma partida pelo ID'''
        partida_data = request.json
        updated_partida = self.service.update(partida_id, partida_data)
        if updated_partida:
            return updated_partida.to_dict(), 200
        else:
            return {'error': 'Partida não encontrada'}, 404
    @token_required
    def delete(self, partida_id):
        '''Excluir uma partida pelo ID'''
        result = self.service.delete(partida_id)
        if result:
            return '', 204
        else:
            return {'error': 'Partida não encontrada'}, 404