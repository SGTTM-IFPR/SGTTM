import datetime
from database import Database


class UserTokenModel(Database.db.Model):
    __tablename__ = "USER_TOKEN"

    id = Database.db.Column(Database.db.Integer, primary_key=True)
    token = Database.db.Column(Database.db.String(100), nullable=False, unique=True)
    user_id = Database.db.Column(Database.db.Integer, Database.db.ForeignKey('USER.id'), nullable=False)
    expiration = Database.db.Column(Database.db.DateTime, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'token': self.token,
            'user_id': self.user_id,
            'expiration': self.expiration.isoformat()
        }
    def get_token(self):
        token = UserTokenModel.query.filter_by(user_id=self.id).first()
        if not token:
            return None
        elif token.expiration < datetime.datetime.now():
            token.delete()
            Database.db.session.commit()
            return None
        else:
            return token.token

    def set_token(self, token):
        expiration = datetime.datetime.now() + datetime.timedelta(hours=2)
        user_token = UserTokenModel(token=token, user_id=self.id, expiration=expiration)
        Database.db.session.add(user_token)
        Database.db.session.commit()

    def remove_token(self):
        token = UserTokenModel.query.filter_by(user_id=self.id).first()
        if token:
            token.delete()
            Database.db.session.commit()