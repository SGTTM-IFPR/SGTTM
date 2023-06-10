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

    def get_partida_by_etapa_and_id_torneio(self, etapa, torneio_id):
        return self.repository.get_partida_by_etapa_and_id_torneio(etapa, torneio_id)
    
    def get_all_partidas_by_torneio_id(self, torneio_id):
        return self.repository.get_all_partidas_by_torneio_id(torneio_id)

    def update_all(self, partidas):
        updated_partidas = []

        for partida in partidas:
            partida_id = partida.id
            pontos_atleta_1 = partida.pontos_atleta_1
            pontos_atleta_2 = partida.pontos_atleta_2
            print(partida_id, pontos_atleta_1, pontos_atleta_2)
            if partida_id is None:
                continue

            update_data = {}

            self.determine_winner(partida, update_data)
            print(update_data)
            updated_partida: PartidaModel = self.repository.update(partida_id, update_data)

            updated_partidas.append(updated_partida)

        return updated_partidas

    @staticmethod
    def determine_winner(partida, update_data):
        if partida.pontos_atleta_1 is None or partida.pontos_atleta_2 is None:
            return

        update_data['pontos_atleta_1'] = partida.pontos_atleta_1
        update_data['pontos_atleta_2'] = partida.pontos_atleta_2

        if partida.pontos_atleta_1 == partida.pontos_atleta_2:
            update_data['vencedor_id'] = None
            update_data['concluida'] = False
            print('empate')
            return

        if partida.pontos_atleta_1 > partida.pontos_atleta_2:
            update_data['vencedor_id'] = partida.inscricao_atleta1_id
        elif partida.pontos_atleta_1 < partida.pontos_atleta_2:
            update_data['vencedor_id'] = partida.inscricao_atleta2_id
        update_data['concluida'] = True
