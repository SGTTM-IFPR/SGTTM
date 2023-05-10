from .inscricao_namespace import inscricao_namespace as api
from .abstract_inscricao_rest_controller import AbstractInscricaoRestController
from ..grupo.abstract_grupo_rest_controller import AbstractGrupoRestController

@api.route('/find-all/<int:id>')
class InscricaoListIdController(AbstractInscricaoRestController):

    def get(self, id):
        self.service.montar_grupo_do_torneio(id)