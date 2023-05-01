from flask import request

from .pontuacao_namespace import pontuacao_namespace as api
from .abstract_pontuacao_rest_controller import AbstractPontuacaoRestController


@api.route('/<int:pontuacao_id>')
class PontuacaoController(AbstractPontuacaoRestController):

    def get(self, pontuacao_id):
        '''Obter informações de uma pontuação pelo ID'''
        pontuacao = self.service.get_by_id(pontuacao_id)
        if pontuacao:
            return pontuacao.to_dict(), 200
        else:
            return {'error': 'Pontuação não encontrada'}, 404

    def put(self, pontuacao_id):
        '''Atualizar informações de uma pontuação pelo ID'''
        pontuacao_data = request.json
        updated_pontuacao = self.service.update(pontuacao_id, pontuacao_data)
        if updated_pontuacao:
            return updated_pontuacao.to_dict(), 200
        else:
            return {'error': 'Pontuação não encontrada'}, 404

    def delete(self, pontuacao_id):
        '''Excluir uma pontuação pelo ID'''
        result = self.service.delete(pontuacao_id)
        if result:
            return '', 204
        else:
            return {'error': 'Pontuação não encontrada'}, 404
