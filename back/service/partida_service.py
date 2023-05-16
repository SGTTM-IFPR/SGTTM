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
        if not partidas:
            return []

        updated_partidas = []
        print(partidas)
        for partida in partidas:
            partida_id = partida.get('id')
            pontos_atleta_1 = partida.get('pontos_atleta_1')
            if pontos_atleta_1 is None:
                pontos_atleta_1 = 0
            pontos_atleta_2 = partida.get('pontos_atleta_2')
            if pontos_atleta_2 is None:
                pontos_atleta_2 = 0
            print('atleta1',pontos_atleta_1)
            print('atleta2',pontos_atleta_2)
            if partida_id is not None:
                updated_partida = self.repository.update(
                    partida_id,
                    {'pontos_atleta_1': pontos_atleta_1,
                     'pontos_atleta_2': pontos_atleta_2})
                updated_partidas.append(updated_partida)

        return updated_partidas
