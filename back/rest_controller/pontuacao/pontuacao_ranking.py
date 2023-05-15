from .pontuacao_namespace import pontuacao_namespace as api
from .abstract_pontuacao_rest_controller import AbstractPontuacaoRestController
from ..auth_decorator import token_required


@api.route('/ranking')
class PontuacaoRankingController(AbstractPontuacaoRestController):
    
    @token_required
    def get(self):
        '''Obter o ranking de pontuações'''
        ranking = self.service.get_ranking()
        try:
            return ranking, 200
        except Exception:
            print(Exception)
        return 'Hello word', 200