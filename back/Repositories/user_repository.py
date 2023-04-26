from database import Database
from Models.usuario_model import UsuarioModel

class UserRepository:

    def create_user(self, user_data):
        try:
            print(user_data)
            user = UsuarioModel(**user_data)
            print(user)
            Database.db.session.add(user)
            Database.db.session.commit()
            return user
        except Exception as e:
            print(e)
            Database.db.session.rollback()
            return {'error': str(e)}, 400

    def get_all_users(self):
        return UsuarioModel.query.all()

    def get_user_by_id(self, user_id):
        return UsuarioModel.query.filter_by(id=user_id).first()

    def get_user_by_email(self, email):
        return UsuarioModel.query.filter_by(email=email).first()

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
        return UsuarioModel.query.filter_by(cpf=cpf).first()