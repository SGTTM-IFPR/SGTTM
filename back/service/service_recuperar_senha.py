import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


class EmailSender:
    def __init__(self, sender_email, sender_password, smtp_server='smtp.gmail.com', smtp_port=587):
        self.sender_email = sender_email
        self.sender_password = sender_password
        self.smtp_server = smtp_server
        self.smtp_port = smtp_port

    def send_email(self, recipient_email, subject, message):
        try:
            # create message object instance
            msg = MIMEMultipart()
            msg['From'] = self.sender_email
            msg['To'] = recipient_email
            msg['Subject'] = subject

            # add message to the body
            msg.attach(MIMEText(message, 'plain'))

            # create smtp session
            smtp_session = smtplib.SMTP(self.smtp_server, self.smtp_port)
            smtp_session.starttls()

            # login to the sender email account
            smtp_session.login(self.sender_email, self.sender_password)

            # send mail
            smtp_session.sendmail(self.sender_email, recipient_email, msg.as_string())

            # close smtp session
            smtp_session.quit()

            print('E-mail enviado com sucesso!')
        except Exception as e:
            print(f'Erro: {str(e)}')
