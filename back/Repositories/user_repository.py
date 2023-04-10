from database import Database
from Models.user_model import UserModel

class UserRepository:

    def create_user(self, user_data):
        user = UserModel(**user_data)
        Database.db.session.add(user)
        Database.db.session.commit()
        return user

    def get_all_users(self):
        return UserModel.query.all()   

    def get_user_by_id(self, user_id):
        return UserModel.query.filter_by(id=user_id).first()

    def update_user(self, user_id, user_data):
        user = self.get_user_by_id(user_id)
        if user:
            for key, value in user_data.items():
                setattr(user, key, value)
            Database.db.session.commit()
            return user

    def delete_user(self, user_id):
        user = self.get_user_by_id(user_id)
        if user:
            Database.db.session.delete(user)
            Database.db.session.commit()
            return True
        return False