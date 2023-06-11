from .inscricao_namespace import inscricao_namespace as api
from .abstract_inscricao_rest_controller import AbstractInscricaoRestController
from ..auth_decorator import token_required

@api.route('/find-by-grupo/<int:grupo_id>')
class InscricaoListByGrupoController(AbstractInscricaoRestController):
    @token_required
    def get(self, grupo_id):
        '''Listar todas as inscrições por grupo'''
        inscricoes = self.service.get_by_grupo_id(grupo_id)
        inscricao_dicts = [inscricao.to_dict() for inscricao in inscricoes]
        try:
            # print(inscricao_dicts)
            return inscricao_dicts, 200
        except Exception:
            print(Exception)
            return {}, 500