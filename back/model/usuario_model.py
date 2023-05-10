from flask_restx import Namespace
from sqlalchemy import Column, Integer, String, Enum, Date, Boolean
from sqlalchemy_serializer import SerializerMixin

from extension.database import database
from model.Enums.sexo_enum import SexoEnum

api = Namespace('usuario', description='Usuario operations')


class UsuarioModel(database.Model, SerializerMixin):
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
