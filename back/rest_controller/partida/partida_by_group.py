from flask import request

from .partida_namespace import partida_namespace as api
from .abstract_partida_rest_controller import AbstractPartidaRestController


@api.route('/partida-por-grupo/<int:grupo_id>')
class PartidaByGroupController(AbstractPartidaRestController):

    def get(self, grupo_id):
        '''Obter informações de uma partida pelo ID'''

        partidas = self.service.get_by_grupo_id(grupo_id)        
        partidas_dicts = [partida.to_dict() for partida in partidas]
        
        if partidas:
            return partidas_dicts, 200
        else:
            return {'error': 'Partida não encontrada'}, 404