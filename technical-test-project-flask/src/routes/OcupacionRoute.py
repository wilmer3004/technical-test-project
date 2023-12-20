import traceback

from flask import Blueprint, jsonify, request

from src.services.OcupacionSercvices import OcupacionSercvices

main = Blueprint('ocupacion_blueprint',__name__)

# Get
@main.route('/',methods=['GET'])
def get_ocupacion():
    try:
        ocupaciones = OcupacionSercvices.get_ocupacion()
        if len(ocupaciones)>0: 
            return jsonify({'message':'SUCCESS','success':True,'ocupacion':ocupaciones})
        else:
            return jsonify({'message':'NOTFOUND','success':True, "ex":ocupaciones})
    except Exception as ex:
        traceback_str = traceback.format_exc()
        return jsonify({
            'message': 'ERROR',
            'success': False,
            'exception_details': str(ex),
            'traceback': traceback_str
        }), 500

# Get por id
@main.route('/<idOcupacion>',methods=['GET'])
def get_ocupacion_id(idOcupacion):
    try:
        ocupaciones = OcupacionSercvices.get_ocupacion_id(idOcupacion)
        if len(ocupaciones)>0:
            
            return jsonify({'message':'SUCCESS','success':True,'clientes':ocupaciones})
        else:
            return jsonify({'message':'NOTFOUND','success':True, "ex":ocupaciones})
    except Exception as ex:
        traceback_str = traceback.format_exc()
        return jsonify({
            'message': 'ERROR',
            'success': False,
            'exception_details': str(ex),
            'traceback': traceback_str
        }), 500







