from flask import request

from .partida_namespace import partida_namespace as api
from .abstract_partida_rest_controller import AbstractPartidaRestController
from ..auth_decorator import token_required

@api.route('/find-by-etapa-torneio/<string:etapa>/<int:torneio_id>')
class PartidaByEtapaTorneioController(AbstractPartidaRestController):
    # @token_required
    def get(self, etapa, torneio_id):
        '''Obter informações de partidas pelo grupo ID'''

        partidas = self.service.get_partida_by_etapa_and_id_torneio(etapa, torneio_id)
        partidas_dicts = [partida.to_dict() for partida in partidas]
        print(partidas_dicts)
        if partidas:
            return partidas_dicts, 200
        else:
            return {'error': 'Partida não encontrada'}, 404