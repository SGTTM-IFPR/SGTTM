from flask import Flask, Blueprint
from flask_restx import Api

from .usuario.usuario_namespace import usuario_namespace
from .grupo.grupo_namespace import grupo_namespace
from .inscricao.inscricao_namespace import inscricao_namespace
from .partida.partida_namespace import partida_namespace
from .pontuacao.pontuacao_namespace import pontuacao_namespace
from .set.set_namespace import set_namespace
from .torneio.torneio_namespace import torneio_namespace

blueprint = Blueprint('api', __name__)
api = Api(blueprint
          , title='Tournament API'
          , version='1.0'
          , description='API para gerenciamento de torneios'
          , doc='/doc'
          , default='Tournament'
          , default_label='Tournament API'
          , validate=True
          )
def init_app(app: Flask):
    api.add_namespace(usuario_namespace)
    api.add_namespace(grupo_namespace)
    api.add_namespace(inscricao_namespace)
    api.add_namespace(partida_namespace)
    api.add_namespace(pontuacao_namespace)
    api.add_namespace(set_namespace)
    api.add_namespace(torneio_namespace)
    app.register_blueprint(blueprint)
    pass
