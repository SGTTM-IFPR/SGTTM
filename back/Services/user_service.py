from Repositories.user_repository import UserRepository

class UserService:
    def __init__(self):
        self.user_repository = UserRepository()

    def create_user(self, user_data):
        #TODO: Regras de negócio
        user = self.user_repository.create_user(user_data)
        return user

    def get_all_users(self):
        users = self.user_repository.get_all_users()
        return users

    def get_user_by_id(self, user_id):
        user = self.user_repository.get_user_by_id(user_id)
        return user
    
    def get_user_by_email(self, user_email):
        user = self.user_repository.get_user_by_email(user_email)
        return user
        
    def update_user(self, user_id, user_data):
        user = self.user_repository.update_user(user_id, user_data)
        return user

    def delete_user(self, user_id):
        deleted = self.user_repository.delete_user(user_id)
        return deleted