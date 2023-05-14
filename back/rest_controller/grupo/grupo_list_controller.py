from .grupo_namespace import grupo_namespace as api
from .abstract_grupo_rest_controller import AbstractGrupoRestController
from ..auth_decorator import token_required


@api.route('/find-all')
class GrupoListController(AbstractGrupoRestController):
    @token_required
    def get(self):
        '''Listar todos os grupos'''
        grupos = self.service.get_all()
        grupo_dicts = [grupo.to_dict() for grupo in grupos]
        try:
            return grupo_dicts, 200
        except Exception:
            print(Exception)
        return 'Hello word', 200