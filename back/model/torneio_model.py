from sqlalchemy import Column, Integer, String, Enum, Date
from sqlalchemy_serializer import SerializerMixin

from extension.database import database
from model.Enums.fase_enum import FaseEnum
from model.Enums.tipo_torneio_enum import TipoTorneioEnum
from model.Enums.status_enum import StatusEnum


class TorneioModel(database.Model, SerializerMixin):
    __tablename__ = "torneio"

    id = Column(Integer, primary_key=True)
    nome = Column(String(100), nullable=False, unique=True)
    data_inicio = Column(Date, nullable=False)
    data_final = Column(Date, nullable=False)
    local = Column(String(100), nullable=False)
    status = Column(Enum(StatusEnum), nullable=False, server_default=StatusEnum.ABERTO.value)
    tipo_torneio = Column(Enum(TipoTorneioEnum), nullable=False)
    fase_atual = Column(Enum(FaseEnum), nullable=False)
    fase_grupo_concluida = False

    def to_dict(self, **kwargs):
        data = super().to_dict()
        if self.tipo_torneio != TipoTorneioEnum.COPA:
            data['fase_grupo_concluida'] = True
        else:
            data['fase_grupo_concluida'] = self.fase_grupo_concluida
        print(data['fase_grupo_concluida'])
        print(data['status'])
        return data
