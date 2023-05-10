from .inscricao_namespace import inscricao_namespace as api
from .abstract_inscricao_rest_controller import AbstractInscricaoRestController


@api.route('/find-by-grupo/<int:grupo_id>')
class InscricaoListByGrupoController(AbstractInscricaoRestController):

    def get(self, grupo_id):
        '''Listar todas as inscrições por grupo'''
        inscricoes = self.service.get_by_grupo_id(grupo_id)
        inscricao_dicts = [inscricao.to_dict() for inscricao in inscricoes]
        try:
            return inscricao_dicts, 200
        except Exception:
            print(Exception)
            return {}, 500