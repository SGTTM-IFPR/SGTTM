from Models.Enums.SexEnum import SexEnum
from database import Database


class UserModel(Database.db.Model):
    __tablename__ = "USER"

    id = Database.db.Column(Database.db.Integer, primary_key=True)
    cpf = Database.db.Column(Database.db.String(100), nullable=False, unique=True)
    password = Database.db.Column(Database.db.String(100), nullable=False)
    name = Database.db.Column(Database.db.String(100), nullable=False)
    email = Database.db.Column(Database.db.String(100), nullable=False, unique=True)
    birth_date = Database.db.Column(Database.db.Date, nullable=False)
    administrator = Database.db.Column(Database.db.Boolean, default=False)
    athlete = Database.db.Column(Database.db.Boolean, default=False)
    club = Database.db.Column(Database.db.String(100), nullable=True)
    federation = Database.db.Column(Database.db.String(100), nullable=True)
    sex = Database.db.Column(Database.db.Enum(SexEnum))

    def to_dict(self):
        return {
            'id': self.id,
            'cpf': self.cpf,
            'nome': self.name,
            'email': self.email,
            'data_nascimento': self.birth_date.isoformat(),
            'administrador': self.administrator,
            'atleta': self.athlete,
            'clube': self.club,
            'federacao': self.federation,
            'sexo': self.sex.name
        }