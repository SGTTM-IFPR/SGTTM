from flask_restx import Namespace

from model.Enums.sexo_enum import SexoEnum
from extension.database import database
from sqlalchemy import Column, Integer, String, ForeignKey, Enum, Date, Boolean
from sqlalchemy.orm import relationship

api = Namespace('usuario', description='Usuario operations')


class UsuarioModel(database.Model):
    __tablename__ = "usuario"

    id = Column(Integer, primary_key=True)
    cpf = Column(String(100), nullable=False, unique=True)
    senha = Column(String(100), nullable=False)
    nome = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False, unique=True)
    data_de_nascimento = Column(Date, nullable=False)
    administrador = Column(Boolean, default=False)
    atleta = Column(Boolean, default=False)
    clube = Column(String(100), nullable=True)
    federacao = Column(String(100), nullable=True)
    sexo = Column(Enum(SexoEnum))

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
