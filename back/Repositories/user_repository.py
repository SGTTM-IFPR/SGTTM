from database import Database
from Models.user_model import UserModel

class UserRepository:

    def create_user(self, user_data):
        try:
            user = UserModel(**user_data)
            Database.db.session.add(user)
            Database.db.session.commit()
            return user
        except Exception as e:
            Database.db.session.rollback()
            return {'error': str(e)}, 400

    def get_all_users(self):
        return UserModel.query.all()   

    def get_user_by_id(self, user_id):
        return UserModel.query.filter_by(id=user_id).first()

    def get_user_by_email(self, email):
        return UserModel.query.filter_by(email=email).first()

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

    def get_by_cpf(self, cpf):
        return UserModel.query.filter_by(cpf=cpf).first()