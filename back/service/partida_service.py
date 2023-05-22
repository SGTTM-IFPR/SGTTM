from dependency_injector.wiring import inject

from model import PartidaModel
from repository.partida_repository import PartidaRepository
from service.generic_service import GenericService


class PartidaService(GenericService[PartidaModel]):

    @inject
    def __init__(self, repository: PartidaRepository):
        super().__init__(repository)

    def get_by_grupo_id(self, grupo_id):
        return self.repository.get_by_grupo_id(grupo_id)

    def update_all(self, partidas):
        updated_partidas = []

        for partida in partidas:
            partida_id = partida.id
            pontos_atleta_1 = partida.pontos_atleta_1
            pontos_atleta_2 = partida.pontos_atleta_2
            
            if pontos_atleta_1 is None:
                pontos_atleta_1 = 0
                
            if pontos_atleta_2 is None:
                pontos_atleta_2 = 0

            if partida_id is None or (pontos_atleta_1 is None and pontos_atleta_2 is None):
                continue

            update_data = {}
            if pontos_atleta_1 is not None:
                update_data['pontos_atleta_1'] = pontos_atleta_1
            if pontos_atleta_2 is not None:
                update_data['pontos_atleta_2'] = pontos_atleta_2

            if pontos_atleta_1 > pontos_atleta_2:
                update_data['vencedor_id'] = partida.inscricao_atleta1_id
            elif pontos_atleta_1 < pontos_atleta_2:
                update_data['vencedor_id'] = partida.inscricao_atleta2_id

            updated_partida: PartidaModel = self.repository.update(partida_id, update_data)

            updated_partidas.append(updated_partida)

        return updated_partidas

    @staticmethod
    def determine_winner(partida, update_data):
        if not partida or partida.pontos_atleta_1 is None or partida.pontos_atleta_2 is None:
            return

        if partida.pontos_atleta_1 > partida.pontos_atleta_2:
            update_data['vencedor_id'] = partida.inscricao_atleta1_id
        elif partida.pontos_atleta_1 < partida.pontos_atleta_2:
            update_data['vencedor_id'] = partida.inscricao_atleta2_id
        print(update_data['vencedor_id'])
