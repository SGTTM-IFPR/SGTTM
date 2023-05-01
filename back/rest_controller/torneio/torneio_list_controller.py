from .torneio_namespace import torneio_namespace as api
from .abstract_torneio_rest_controller import AbstractTorneioRestController


@api.route('/find-all')
class TorneioListController(AbstractTorneioRestController):

    def get(self):
        '''Listar todos os torneios'''
        torneios = self.service.get_all()
        torneio_dicts = [torneio.to_dict() for torneio in torneios]
        try:
            return torneio_dicts, 200
        except Exception:
            print(Exception)
        return 'Hello word', 200