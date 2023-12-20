from flask import Flask
from flask_cors import CORS

# Routes
from .routes import ClienteRoute, GerenteCRoute,CiudadRoute,OcupacionRoute

app = Flask(__name__)

def init_app(config):
# Configuración
    app.config.from_object(config)

    # Habilitar CORS para un dominio en especifico  en todos los endpoints
    CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST","PUT","DELETE", "OPTIONS"], "allow_headers": ["Content-Type", "Authorization"]}})

    # Blueprints

    # Clientes
    app.register_blueprint(ClienteRoute.main, url_prefix='/clientes')
    # GerenteRoute
    app.register_blueprint(GerenteCRoute.main, url_prefix='/gerentec')
    # Ciudades
    app.register_blueprint(CiudadRoute.main, url_prefix='/ciudad')
    # Ocupacion
    app.register_blueprint(OcupacionRoute.main, url_prefix='/ocupacion')



    return app

