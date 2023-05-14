from .inscricao_namespace import inscricao_namespace as api
from .abstract_inscricao_rest_controller import AbstractInscricaoRestController
from ..grupo.abstract_grupo_rest_controller import AbstractGrupoRestController
from ..auth_decorator import token_required

@api.route('/montar-grupos/<int:id>/<string:formato>/<int:quantidade_classificados>')
class InscricaoMontarGruposController(AbstractInscricaoRestController):
    @token_required
    def get(self, id, formato, quantidade_classificados):
        self.service.montar_grupo_do_torneio(id, formato, quantidade_classificados)