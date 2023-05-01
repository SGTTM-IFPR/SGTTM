from flask import request

from .torneio_namespace import torneio_namespace as api
from .abstract_torneio_rest_controller import AbstractTorneioRestController


@api.route('/<int:torneio_id>')
class TorneioController(AbstractTorneioRestController):

    def get(self, torneio_id):
        '''Obter informações de um torneio pelo ID'''
        torneio_data = self.service.get_by_id(torneio_id)
        if torneio_data:
            return torneio_data.to_dict(), 200
        else:
            return {'error': 'Torneio não encontrado'}, 404

    def put(self, torneio_id):
        '''Atualizar informações de um torneio pelo ID'''
        torneio_data = request.json
        updated_torneio = self.service.update(torneio_id, torneio_data)
        if updated_torneio:
            return updated_torneio.to_dict(), 200
        else:
            return {'error': 'Torneio não encontrado'}, 404

    def delete(self, torneio_id):
        '''Excluir um torneio pelo ID'''
        result = self.service.delete(torneio_id)
        if result:
            return '', 204
        else:
            return {'error': 'Torneio não encontrado'}, 404