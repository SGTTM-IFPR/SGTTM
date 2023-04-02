from database import db


class UserRepository:

    def create_user(self, user):
        db.session.add(user)
        db.session.commit()
        return "deu certo"
