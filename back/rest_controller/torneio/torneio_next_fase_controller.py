from flask import request
from .torneio_namespace import torneio_namespace as api

from model import TorneioModel
from rest_controller.torneio.abstract_torneio_rest_controller import AbstractTorneioRestController
from ..auth_decorator import token_required


@api.route('/next-fase/<int:torneio_id>')
class TorneioNextFaseController(AbstractTorneioRestController):

    # @token_required
    def post(self, torneio_id):
        '''Gerar a próxima fase do torneio'''
        print('chegou aqui')
        torneio = self.service.next_fase(torneio_id)
        if isinstance(torneio, TorneioModel):
            return torneio.to_dict(), 201
        else:
            return {'error': str(torneio)}