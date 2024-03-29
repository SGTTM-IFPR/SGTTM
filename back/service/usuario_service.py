from dependency_injector.wiring import inject

from model import UsuarioModel
from repository.usuario_repository import UsuarioRepository
from service.generic_service import GenericService


class UsuarioService(GenericService[UsuarioModel]):

    @inject
    def __init__(self, repository: UsuarioRepository):
        super().__init__(repository)

    def get_usuario_by_email(self, usuario_email):
        """

        :rtype: object
        """
        usuario = self.repository.get_usuario_by_email(usuario_email)
        return usuario

    def get_by_cpf(self, cpf):
        usuario = self.repository.get_by_cpf(cpf)
        return usuario
    
    def get_by_nome(self, nome):
        usuario = self.repository.get_by_nome(nome)
        return usuario
    
    def update_usuario_by_email(self, usuario_email, usuario):
        usuario = self.repository.update_usuario_by_email(usuario_email, usuario)
        return usuario


