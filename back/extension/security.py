import toml

config = toml.load("settings.toml")
SECRET_KEY = config["security"]["SECRET_KEY"]
