from database import db
from Models import user_model


class UserRepository:

    def create_user(self, user_data):
        user = user_model(**user_data)
        db.session.add(user)
        db.session.commit()
        return user

    def get_all_users(self):
        return user_model.query.all()   

    def get_user_by_id(self, user_id):
        return user_model.query.filter_by(id=user_id).first()

    def update_user(self, user_id, user_data):
        user = self.get_user_by_id(user_id)
        if user:
            for key, value in user_data.items():
                setattr(user, key, value)
            db.session.commit()
            return user

    def delete_user(self, user_id):
        user = self.get_user_by_id(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return True
        return False