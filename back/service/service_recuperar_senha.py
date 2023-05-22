import smtplib
import email.message


class GerarSenha:
    def gerar_senha(self, user_email):
        import random
        import string

        tamanho = 8
        valores = string.ascii_letters + string.digits

        senha = ''
        for i in range(tamanho):
            senha += random.choice(valores)

        return senha


class EmailSender:
    def __init__(self, email_from = "sgttm.ifpr.tads@gmail.com", password = "oihzmwkuajlakynl"):
        self.email_from = email_from
        self.password = password

    def enviar_email(self, email_to, mensagem):
        corpo_email = f"""
    <html>
        <body style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
            <p>Olá,</p>
            <p>Recebemos uma solicitação de redefinição de senha para a sua conta do SGTTM.</p>
            <p style="margin-top: 20px; background-color: #f5f5f5; padding: 10px;"><strong>Acesse sua conta utilizando sua nova senha: {mensagem}</strong></p>
            <p style="margin-top: 20px;">Atenciosamente,</p>
            <p style="margin-bottom: 0; font-size: 12px; color: #999;">Equipe do SGTTM</p>
        </body>
    </html>
""" 
        msg = email.message.Message()
        msg['Subject'] = "Recuperar Senha"
        msg['From'] = self.email_from
        msg['To'] = email_to
        msg.add_header('Content-Type', 'text/html')
        msg.set_payload(corpo_email)

        s = smtplib.SMTP('smtp.gmail.com: 587')
        s.starttls()
        s.login(msg['From'], self.password)
        s.sendmail(msg['From'], [msg['To']], msg.as_string().encode('utf-8'))