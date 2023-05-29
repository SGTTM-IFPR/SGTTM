from flask import request
from .inscricao_namespace import inscricao_namespace as api
from ..auth_decorator import token_required
from model import InscricaoModel
from rest_controller.inscricao.abstract_inscricao_rest_controller import AbstractInscricaoRestController


@api.route('/create')
class InscricaoCreateController(AbstractInscricaoRestController):
    @token_required
    def post(self):
        '''Criar um novo inscricao'''
        inscricao_data = request.json
        inscricao = self.service.create(inscricao_data)
        if isinstance(inscricao, InscricaoModel):
            return inscricao.to_dict(), 201
        else:
            return {'error': str(inscricao)}, 400
