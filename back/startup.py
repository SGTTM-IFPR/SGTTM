from flask import Flask
from flask_cors import CORS
from container.container import Container
from extension import configuration


class Startup:

    def __init__(self):
        self.app = Flask(__name__)
        CORS(self.app)
        print(self.get_url_map())
        self.app = Flask(__name__)
        configuration.init_app(self.app)
        with self.app.app_context():
            configuration.load_extensions(self.app)
        # with self.app.app_context():
        #     Database.db.create_all()
        #     user_service = UserService()
        #     user_service.create_user(user_data)
        #
        #     tournament_service = TournamentService()
        #     tournament_data = {
        #         "nome": str("Ifpr-foz"),
        #         "data_inicio": "2023-05-01",
        #         "data_final": "2023-05-01",
        #         "local": "Foz do Iguaçu",
        #         "tipo_torneio": TipoTorneioEnum.COPA
        #     }
        #     tournament_service.create_tournament(tournament_data)
        #
        #     inscricao_service = InscricaoService()
        #     inscricao_data = {
        #         "usuario_id": 44,
        #         "torneio_id": 44,
        #         "condicao": CondicaoEnum.ESTUDANTE_IFPR
        #     }
        #     inscricao_service.create_inscricao(inscricao_data)
        # Habilitar o CORS
        # cors = CORS(self.app, resources={r"/*": {"origins": "*"}})

    def run(self, debug=True):
        self.app.run(debug=debug)

    def get_url_map(self):
        return self.app.url_map


if __name__ == "__main__":
    container = Container()
    my_app = Startup()
    my_app.run()
    print(my_app.get_url_map)

