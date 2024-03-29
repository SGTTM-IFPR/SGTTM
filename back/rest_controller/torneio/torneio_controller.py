from flask import request

from model.Enums.fase_enum import FaseEnum
from .torneio_namespace import torneio_namespace as api
from .abstract_torneio_rest_controller import AbstractTorneioRestController
from ..auth_decorator import token_required


@api.route('/<int:torneio_id>')
class TorneioController(AbstractTorneioRestController):

    @token_required
    def get(self, torneio_id):
        '''Obter informações de um torneio pelo ID'''
        torneio_data = self.service.get_by_id(torneio_id)
        if torneio_data:
            print(torneio_data.to_dict())
            return torneio_data.to_dict(), 200
        else:
            return {'error': 'Torneio não encontrado'}, 404
    @token_required
    def put(self, torneio_id):
        '''Atualizar informações de um torneio pelo ID'''
        torneio_data = request.json
        print(torneio_data)
        if not torneio_data:
            return {'error': 'Requisição sem corpo'}, 400
        # print(torneio_data['fase_atual'])
        if "fase_atual" in torneio_data:
            if torneio_data['fase_atual'] == 'Fase de grupos':
                torneio_data['fase_atual'] =  FaseEnum.FASE_GRUPOS
            if torneio_data['fase_atual'] == 'Fase eliminatória':
                torneio_data['fase_ataul'] =  FaseEnum.FASE_ELIMINATORIA

        updated_torneio = self.service.update(torneio_id, torneio_data)
        if updated_torneio:
            return updated_torneio.to_dict(), 200
        else:
            return {'error': 'Torneio não encontrado'}, 404
    @token_required
    def delete(self, torneio_id):
        '''Excluir um torneio pelo ID'''
        result = self.service.delete(torneio_id)
        if result:
            return '', 204
        else:
            return {'error': 'Torneio não encontrado'}, 404