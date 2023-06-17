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
            if partida_id is None:
                continue

            update_data = {}

            self.determine_winner(partida, update_data)
            print(update_data)
            updated_partida: PartidaModel = self.repository.update(partida_id, update_data)

            updated_partidas.append(updated_partida)

        return updated_partidas


    def update(self, partida_id, partida):
        if partida is None or partida_id is None:
            return
        print('----------UPDATE CURRENT MATCH: START-------------')
        update_data = {}
        partida_model = PartidaModel(**partida)
        self.determine_winner(partida_model, update_data)
        print(update_data)
        update_partida: PartidaModel = self.repository.update(partida_id, update_data)
        self. update_next_match(update_partida)
        return update_partida

    def update_next_match(self, old_partida: PartidaModel):
        print('----------UPDATE NEXT MATCH: START-----------------')
        if old_partida is None or old_partida.id_proxima_partida is None or old_partida.id_proxima_partida == 0:
            print('nao passou da primeira validacao')
            return
        if old_partida.vencedor_id is None:
            print('nao passou da segunda validacao')
            return
        print('----------UPDATE NEXT MATCH: CHECK ALL CONDITIONS-----------------')
        next_partida: PartidaModel = self.repository.get_by_id(old_partida.id_proxima_partida)

        update_data = {}

        if next_partida.inscricao_atleta1_id is None:
            update_data['inscricao_atleta1_id'] = old_partida.vencedor_id
        else:
            update_data['inscricao_atleta2_id'] = old_partida.vencedor_id
        print('chegou aqui')
        print(update_data)
        update_next_partida: PartidaModel = self.repository.update(next_partida.id, update_data)


    @staticmethod
    def determine_winner(partida, update_data):
        if partida.pontos_atleta_1 is None or partida.pontos_atleta_2 is None:
            return
        pontos_atleta_1 = partida.pontos_atleta_1
        pontos_atleta_2 = partida.pontos_atleta_2
        print(partida.id, pontos_atleta_1, pontos_atleta_2)
        update_data['pontos_atleta_1'] = partida.pontos_atleta_1
        update_data['pontos_atleta_2'] = partida.pontos_atleta_2

        if partida.pontos_atleta_1 == partida.pontos_atleta_2:
            update_data['vencedor_id'] = None
            update_data['concluida'] = False
            print('empate')
            return
        print('chegou aqui', partida.pontos_atleta_1, partida.pontos_atleta_2)
        if partida.pontos_atleta_1 > partida.pontos_atleta_2:
            update_data['vencedor_id'] = partida.inscricao_atleta1_id
        elif partida.pontos_atleta_1 < partida.pontos_atleta_2:
            update_data['vencedor_id'] = partida.inscricao_atleta2_id
        update_data['concluida'] = True
