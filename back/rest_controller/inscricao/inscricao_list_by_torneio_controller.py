from .inscricao_namespace import inscricao_namespace as api
from .abstract_inscricao_rest_controller import AbstractInscricaoRestController
from ..auth_decorator import token_required


@api.route('/find-by-torneio/<int:torneio_id>')
class InscricaoListByTorneioController(AbstractInscricaoRestController):
    @token_required
    def get(self, torneio_id):
        '''Listar todas as inscrições por torneio'''
        inscricoes = self.service.get_by_torneio_id(torneio_id)
        inscricao_dicts = [inscricao.to_dict() for inscricao in inscricoes]
        try:
            return inscricao_dicts, 200
        except Exception:
            print(Exception)
            return {}, 500