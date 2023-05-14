from flask import request
from .inscricao_namespace import inscricao_namespace as api

from rest_controller.inscricao.abstract_inscricao_rest_controller import AbstractInscricaoRestController
from ..auth_decorator import token_required

@api.route('/classificados/<int:quantidade_inscritos>')
class InscricaoClassificadosController(AbstractInscricaoRestController):
    @token_required
    def get(self, quantidade_inscritos):
        '''Retorna os inscritos classificados'''
        inscritos = self.service.get_classificados(quantidade_inscritos)
        return inscritos