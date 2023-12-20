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
        correoGerenteC = request.json['correoGerenteC']
        passwordGerenteC = request.json['PasswordGerenteC']
        _autenticacion = GerenteCModel(0,correoGerenteC,passwordGerenteC,"","")
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
    

# Get
@main.route('/',methods=['GET'])
def get_gerentec():
    has_access = Security.verify_token(request.headers)
    if has_access:
        try:
            gerentesc = GerenteCServices.get_gerentec()
            if len(gerentesc)>0: 
                return jsonify({'message':'SUCCESS','success':True,'gerentesc':gerentesc})
            else:
                return jsonify({'message':'NOTFOUND','success':True, "ex":gerentesc})
        except Exception as ex:
            traceback_str = traceback.format_exc()
            return jsonify({
                'message': 'ERROR',
                'success': False,
                'exception_details': str(ex),
                'traceback': traceback_str
            }), 500
    else:
        response = jsonify({'message': 'Unauthorized'})
        return response, 401

# Get por id
@main.route('/<numIdentGerentC>',methods=['GET'])
def get_gerentesc_id(numIdentGerentC):
    has_access = Security.verify_token(request.headers)
    if has_access:
        try:
            gerentesc = GerenteCServices.get_gerente_id(numIdentGerentC)
            if len(gerentesc)>0:
                
                return jsonify({'message':'SUCCESS','success':True,'gerentesc':gerentesc})
            else:
                return jsonify({'message':'NOTFOUND','success':True, "ex":gerentesc})
        except Exception as ex:
            traceback_str = traceback.format_exc()
            return jsonify({
                'message': 'ERROR',
                'success': False,
                'exception_details': str(ex),
                'traceback': traceback_str
            }), 500
    else:
        response = jsonify({'message': 'Unauthorized'})
        return response, 401
