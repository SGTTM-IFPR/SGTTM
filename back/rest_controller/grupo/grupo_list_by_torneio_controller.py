from .grupo_namespace import grupo_namespace as api
from .abstract_grupo_rest_controller import AbstractGrupoRestController


@api.route('/find-by-torneio/<int:torneio_id>')
class GrupoListByTorneioController(AbstractGrupoRestController):

    def get(self, torneio_id):
        '''Listar todos os grupos por torneio'''
        inscricoes = self.service.get_by_torneio_id(torneio_id)
        grupo_dicts = [grupo.to_dict() for grupo in inscricoes]
        try:
            return grupo_dicts, 200
        except Exception:
            print(Exception)
            return {}, 500