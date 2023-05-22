from .usuario_namespace import usuario_namespace as api
from flask import request
from rest_controller.usuario.abstract_usuario_rest_controller import AbstractUsuarioRestController
from service.service_recuperar_senha import EmailSender, GerarSenha
from model import UsuarioModel
import hashlib
from service.service_recuperar_senha import *
from service.usuario_service import UsuarioService
from repository.usuario_repository import UsuarioRepository

@api.route('/recuperar-senha/<string:user_email>')
class UsuarioRecuperarSenhaController(AbstractUsuarioRestController):
    def post(self, user_email):
        '''Recuperar senha de um usuário pelo e-mail'''
        '''Enviando e-mail'''

        try:
            senha = GerarSenha()
            senha = senha.gerar_senha(user_email)
            usuario_acoes =  UsuarioService(repository=UsuarioRepository())
            usuario = usuario_acoes.get_usuario_by_email(usuario_email=user_email)
            usuario.senha = hashlib.sha256(senha.encode()).hexdigest()
            teste = usuario_acoes.update(usuario.id, usuario.__dict__)
            
            email_sender = EmailSender()
            email_sender.enviar_email(user_email, senha)
            return {'message': 'E-mail enviado com sucesso'}, 200
        except:
            return {'error': 'Erro ao enviar e-mail'}, 500
    