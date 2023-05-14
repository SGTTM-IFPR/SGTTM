from .usuario_namespace import usuario_namespace as api
from rest_controller.usuario.abstract_usuario_rest_controller import AbstractUsuarioRestController
from ..auth_decorator import token_required


@api.route('/find-by-cpf/<string:user_cpf>')
class UsuarioCpfController(AbstractUsuarioRestController):
    
    @token_required
    def get(self, user_cpf):
        '''Obter informações de um usuário pelo CPF'''
        user = self.service.get_by_cpf(user_cpf)
        if user:
            return user.to_dict(), 200
        else:
            return {'error': 'Usuário não encontrado'}, 404
