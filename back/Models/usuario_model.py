from Models.Enums.sexo_enum import SexoEnum
from database import Database


class UsuarioModel(Database.db.Model):
    __tablename__ = "usuario"

    id = Database.db.Column(Database.db.Integer, primary_key=True)
    cpf = Database.db.Column(Database.db.String(100), nullable=False, unique=True)
    senha = Database.db.Column(Database.db.String(100), nullable=False)
    nome = Database.db.Column(Database.db.String(100), nullable=False)
    email = Database.db.Column(Database.db.String(100), nullable=False, unique=True)
    data_de_nascimento = Database.db.Column(Database.db.Date, nullable=False)
    administrador = Database.db.Column(Database.db.Boolean, default=False)
    atleta = Database.db.Column(Database.db.Boolean, default=False)
    clube = Database.db.Column(Database.db.String(100), nullable=True)
    federacao = Database.db.Column(Database.db.String(100), nullable=True)
    sexo = Database.db.Column(Database.db.Enum(SexoEnum))

    def to_dict(self):
        return {
            'id': self.id,
            'cpf': self.cpf,
            'nome': self.nome,
            'email': self.email,
            'senha': self.senha,
            'data_de_nascimento': self.data_de_nascimento.isoformat(),
            'administrador': self.administrador,
            'atleta': self.atleta,
            'clube': self.clube,
            'federacao': self.federacao,
            'sexo': self.sexo.name
        }


