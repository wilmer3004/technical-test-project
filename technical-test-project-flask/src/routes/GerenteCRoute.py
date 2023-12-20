import traceback

from flask import Blueprint,request, jsonify

# Entities
from src.models.GerenteCModel import GerenteCModel
# Models
from src.services.GerenteCServices import GerenteCServices 
# Security
from src.utils.Security import Security

main = Blueprint('gerente_Blueprint',__name__)

@main.route('/',methods=['POST'])
def login():
    try:
        correoGerentC = request.json['correoGerentC']
        passwordGerenteC = request.json['passwordGerenteC']
        _autenticacion = GerenteCModel(0,correoGerentC,passwordGerenteC,"","")
        autenticacion_usuario = GerenteCServices.login_user(_autenticacion)
        if (autenticacion_usuario != None):
            generar_token = Security.generar_token(autenticacion_usuario)
            return jsonify({'success':True ,'token':generar_token})
        else:
            return jsonify({'success':False, 'error':'datos-erroneos'})
    except Exception as ex:
            traceback_str = traceback.format_exc()
            return jsonify({
                'message': 'ERROR',
                'success': False,
                'exception_details': str(ex),
                'traceback': traceback_str
            }), 500