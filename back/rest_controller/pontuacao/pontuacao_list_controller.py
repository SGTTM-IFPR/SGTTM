from .pontuacao_namespace import pontuacao_namespace as api
from .abstract_pontuacao_rest_controller import AbstractPontuacaoRestController
from ..auth_decorator import token_required


@api.route('/find-all')
class PontuacaoListController(AbstractPontuacaoRestController):
    @token_required
    def get(self):
        '''Listar todas as pontuações'''
        pontuacoes = self.service.get_all()
        pontuacao_dicts = [pontuacao.to_dict() for pontuacao in pontuacoes]
        try:
            return pontuacao_dicts, 200
        except Exception:
            print(Exception)
        return 'Hello word', 200
