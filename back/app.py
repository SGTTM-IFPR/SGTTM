import json
from flask import Flask
from Controllers.UserController import routes

app = Flask(__name__)

app.register_blueprint(routes)

if __name__ == "__main__": app.run(debug=True)

print(app.url_map)

@app.route("/")
def hello_world():
    return "Hello world"
