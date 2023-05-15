import smtplib
import email.message

class EmailSender:
    def __init__(self, email_from = "sgttm.ifpr.tads@gmail.com", password = "oihzmwkuajlakynl"):
        self.email_from = email_from
        self.password = password

    def enviar_email(self, email_to, mensagem):
        corpo_email = f"""
            <p>Olá,<br><br>
            Recebemos uma solicitação de redefinição de senha para a sua conta do SGTTM.<br>
            Para redefinir sua senha, clique no link abaixo:<br><br>
            <a href="{mensagem}">Redefinir Senha</a><br><br>
            Se você não solicitou a redefinição de senha, ignore este e-mail.<br><br>
            Atenciosamente,<br>
            Equipe do SGTTM
            </p>
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