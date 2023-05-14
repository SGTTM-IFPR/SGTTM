from .partida_namespace import partida_namespace as api
from .abstract_partida_rest_controller import AbstractPartidaRestController
from ..auth_decorator import token_required

@api.route('/find-all')
class PartidaListController(AbstractPartidaRestController):
    @token_required
    def get(self):
        '''Listar todas as partidas'''
        partidas = self.service.get_all()
        partida_dicts = [partida.to_dict() for partida in partidas]
        try:
            return partida_dicts, 200
        except Exception:
            print(Exception)
        return 'Hello word', 200