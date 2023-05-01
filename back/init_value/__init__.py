import json

from dependency_injector.wiring import inject, Provide

from container.container import Container
from service.usuario_service import UsuarioService


def init_app(self):
    try:
        with open('init_value/usuario.json', 'r') as f:
            data = json.load(f)
            for user in data:
                create(user)
    except Exception as e:
        print(e)
        return {'error': str(e)}, 400
    # create(data)


@inject
def create(data, service: UsuarioService = Provide[Container.usuario_service]):
    print(data)
    service.create(data)
