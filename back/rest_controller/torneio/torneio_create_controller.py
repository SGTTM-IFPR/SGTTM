from flask import request
from .torneio_namespace import torneio_namespace as api

from model import TorneioModel
from rest_controller.torneio.abstract_torneio_rest_controller import AbstractTorneioRestController


@api.route('/create')
class TorneioCreateController(AbstractTorneioRestController):

    def post(self):
        '''Criar um novo torneio'''
        torneio_data = request.json
        torneio = self.service.create(torneio_data)
        if isinstance(torneio, TorneioModel):
            return torneio.to_dict(), 201
        else:
            return {'error': str(torneio)}