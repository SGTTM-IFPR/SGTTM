from .usuario_namespace import usuario_namespace as api
from rest_controller.usuario.abstract_usuario_rest_controller import AbstractUsuarioRestController
from ..auth_decorator import token_required

@api.route('/find-all')
class UsuarioListController(AbstractUsuarioRestController):
    @token_required
    def get(self):
        '''Listar todos usuários'''
        users = self.service.get_all()
        user_dicts = [user.to_dict() for user in users]
        try:
            return user_dicts, 200
        except Exception:
            print(Exception)
        return 'Hello word', 200
