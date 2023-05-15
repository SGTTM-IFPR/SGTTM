from .usuario_namespace import usuario_namespace as api
from rest_controller.usuario.abstract_usuario_rest_controller import AbstractUsuarioRestController
from service.service_recuperar_senha import EmailSender

@api.route('/recuperar-senha/<string:user_email>')
class UsuarioRecuperarSenhaController(AbstractUsuarioRestController):
    def get(self, user_email):
        '''Recuperar senha de um usuário pelo e-mail'''
        '''Enviando e-mail'''

        try:
            email_sender = EmailSender()
            email_sender.enviar_email(user_email, 'http://localhost:3000/recuperar-senha') 
            return {'message': 'E-mail enviado com sucesso'}, 200
        except:
            return {'error': 'Erro ao enviar e-mail'}, 500
    