from .inscricao_namespace import inscricao_namespace as api
from .abstract_inscricao_rest_controller import AbstractInscricaoRestController


@api.route('/find-all')
class InscricaoListController(AbstractInscricaoRestController):

    def get(self):
        '''Listar todas as inscrições'''
        inscricoes = self.service.get_all()
        inscricao_dicts = [inscricao.to_dict() for inscricao in inscricoes]
        try:
            return inscricao_dicts, 200
        except Exception:
            print(Exception)
        return 'Hello word', 200