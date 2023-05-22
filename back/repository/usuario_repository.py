from model.usuario_model import UsuarioModel
from repository.generic_repository import GenericRepository


class UsuarioRepository(GenericRepository):

    def __init__(self):
        super().__init__(UsuarioModel)

    def get_usuario_by_email(self, email):
        return UsuarioModel.query.filter_by(email=email).first()

    def get_by_cpf(self, cpf):
        return UsuarioModel.query.filter_by(cpf=cpf).first()

    def get_by_nome(self, nome):
        return UsuarioModel.query.filter_by(nome=nome).first()
    
    def update_usuario_by_email(self, usuario_email, usuario):
        usuario = UsuarioModel.query.filter_by(email=usuario_email).update(usuario)
        return usuario
