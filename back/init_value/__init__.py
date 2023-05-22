import json
import hashlib
import random

from dependency_injector.wiring import inject, Provide

from container.container import Container
from model import UsuarioModel
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
    data['senha'] = hashlib.sha256(data.get("senha").encode()).hexdigest()
    data['cpf'] = generate_random_cpf()
    usuario_existente = service.get_usuario_by_email(data['email'])
    if usuario_existente:
        return
    service.create(data)

@inject
def create_torneio(data, service: TorneioService = Provide[Container.torneio_service]):
    print(data)
    service.create(data)

@inject
def create_inscricao(data, service: InscricaoService = Provide[Container.inscricao_service]):
    print(data)
    service.create(data)


def generate_random_cpf():
    cpf = [random.randint(0, 9) for _ in range(9)]  # Generate random digits for the CPF

    # Calculate the first verification digit
    digit1 = sum([(i + 1) * v for i, v in enumerate(cpf)]) % 11
    cpf.append((digit1 if digit1 < 10 else 0))

    # Calculate the second verification digit
    digit2 = sum([(i + 2) * v for i, v in enumerate(cpf)]) % 11
    cpf.append((digit2 if digit2 < 10 else 0))

    cpf_str = ''.join(map(str, cpf))
    return cpf_str[:3] + '.' + cpf_str[3:6] + '.' + cpf_str[6:9] + '-' + cpf_str[9:]