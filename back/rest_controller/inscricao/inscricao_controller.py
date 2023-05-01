from flask import request

from .inscricao_namespace import inscricao_namespace as api
from .abstract_inscricao_rest_controller import AbstractInscricaoRestController


@api.route('/<int:inscricao_id>')
class InscricaoController(AbstractInscricaoRestController):

    def get(self, inscricao_id):
        '''Obter informações de uma inscrição pelo ID'''
        inscricao = self.service.get_by_id(inscricao_id)
        if inscricao:
            return inscricao.to_dict(), 200
        else:
            return {'error': 'Inscrição não encontrada'}, 404

    def put(self, inscricao_id):
        '''Atualizar informações de uma inscrição pelo ID'''
        inscricao_data = request.json
        updated_inscricao = self.service.update(inscricao_id, inscricao_data)
        if updated_inscricao:
            return updated_inscricao.to_dict(), 200
        else:
            return {'error': 'Inscrição não encontrada'}, 404

    def delete(self, inscricao_id):
        '''Excluir uma inscrição pelo ID'''
        result = self.service.delete(inscricao_id)
        if result:
            return '', 204
        else:
            return {'error': 'Inscrição não encontrada'}, 404