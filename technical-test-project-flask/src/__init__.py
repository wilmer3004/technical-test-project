from flask import Flask
from flask_cors import CORS

# Routes
from .routes import ClienteRoute

app = Flask(__name__)

def init_app(config):
# Configuración
    app.config.from_object(config)

    # Habilitar CORS para un dominio en especifico  en todos los endpoints
    CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST","PUT","DELETE", "OPTIONS"], "allow_headers": ["Content-Type", "Authorization"]}})

    # Blueprints

    app.register_blueprint(ClienteRoute.main, url_prefix='/clientes')

    return app

