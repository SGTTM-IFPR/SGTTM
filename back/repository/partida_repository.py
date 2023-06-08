from typing import List

from model import PartidaModel
from repository.generic_repository import GenericRepository


class PartidaRepository(GenericRepository):
    def __init__(self):
        super().__init__(PartidaModel)

    def get_by_grupo_id(self, grupo_id):
        return self.model.query.filter_by(grupo_id=grupo_id).all()

    def get_partidas_jogadas(self, jogador_id) -> List[PartidaModel]:
        return self.model.query.filter(
            ((self.model.inscricao_atleta1_id == jogador_id) | (self.model.inscricao_atleta2_id == jogador_id))
            & (self.model.pontos_atleta_1 != self.model.pontos_atleta_2)
        ).all()

    def get_vitorias(self, jogador_id) -> List[PartidaModel]:
        return self.model.query.filter((PartidaModel.vencedor_id == jogador_id)).all()
    
    def get_partida_by_etapa_and_id_torneio(self, etapa, torneio_id) -> List[PartidaModel]:
        return self.model.query.filter_by(etapa=etapa, torneio_id=torneio_id).all()
