import json

from dependency_injector.wiring import inject, Provide

from container.container import Container
from service.inscricao_service import InscricaoService
from service.torneio_service import TorneioService
from service.usuario_service import UsuarioService


def init_app(self):
    try:
        with open('init_value/usuario.json', 'r') as f:
            data = json.load(f)
            for user in data:
                create_usuario(user)

        with open('init_value/torneio.json', 'r') as f:
            data = json.load(f)
            for torneio in data:
                create_torneio(torneio)
        with open('init_value/inscricao.json', 'r') as f:
            data = json.load(f)
            for inscricao in data:
                create_inscricao(inscricao)

    except Exception as e:
        print(e)
        return {'error': str(e)}, 400
    # create(data)


@inject
def create_usuario(data, service: UsuarioService = Provide[Container.usuario_service]):
    print(data)
    service.create(data)

@inject
def create_torneio(data, service: TorneioService = Provide[Container.torneio_service]):
    print(data)
    service.create(data)

@inject
def create_inscricao(data, service: InscricaoService = Provide[Container.inscricao_service]):
    print(data)
    service.create(data)

