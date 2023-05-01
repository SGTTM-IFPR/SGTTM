from model.usuario_model import UsuarioModel
from repository.generic_repository import GenericRepository


class UsuarioRepository(GenericRepository):

    def __init__(self):
        super().__init__(UsuarioModel)

    def get_usuario_by_email(self, email):
        return UsuarioModel.query.filter_by(email=email).first()

    def get_by_cpf(self, cpf):
        return UsuarioModel.query.filter_by(cpf=cpf).first()