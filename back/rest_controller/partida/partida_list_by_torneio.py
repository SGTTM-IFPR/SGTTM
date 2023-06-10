from flask import request

from .partida_namespace import partida_namespace as api
from .abstract_partida_rest_controller import AbstractPartidaRestController
from ..auth_decorator import token_required

@api.route('/find-by-torneio/<int:torneio_id>')
class PartidaByTorneioController(AbstractPartidaRestController):
    # @token_required
    def get(self, torneio_id):
        '''Obter informações de partidas pelo grupo ID'''

        partidas = self.service.get_all_partidas_by_torneio_id(torneio_id)
        partidas_dicts = [partida.to_dict() for partida in partidas]
        print(partidas_dicts)
        if partidas:
            return partidas_dicts, 200
        else:
            return {'error': 'Partida não encontrada'}, 404