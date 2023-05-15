from .usuario_namespace import usuario_namespace as api
from rest_controller.usuario.abstract_usuario_rest_controller import AbstractUsuarioRestController
from ..auth_decorator import token_required


@api.route('/find-by-nome/<string:user_nome>')
class UsuarioNomeController(AbstractUsuarioRestController):
    
    @token_required
    def get(self, user_nome):
        '''Obter informações de um usuário pelo NOME'''
        user = self.service.get_by_nome(nome=user_nome)
        if user:
            return user.to_dict(), 200
        else:
            return {'error': 'Usuário não encontrado'}, 404
