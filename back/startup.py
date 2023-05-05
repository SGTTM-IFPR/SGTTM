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


    def run(self, debug=True):
        self.app.run(debug=debug)

    def get_url_map(self):
        return self.app.url_map


if __name__ == "__main__":
    container = Container()
    my_app = Startup()
    my_app.run()
    print(my_app.get_url_map)

