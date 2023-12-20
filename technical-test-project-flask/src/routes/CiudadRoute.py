import traceback

from flask import Blueprint, jsonify, request

from src.services.CiudadServices import CiudadServices

main = Blueprint('ciudad_blueprint',__name__)

# Get
@main.route('/',methods=['GET'])
def get_ciudad():
    try:
        ciudades = CiudadServices.get_ciudad()
        if len(ciudades)>0: 
            return jsonify({'message':'SUCCESS','success':True,'ciudades':ciudades})
        else:
            return jsonify({'message':'NOTFOUND','success':True, "ex":ciudades})
    except Exception as ex:
        traceback_str = traceback.format_exc()
        return jsonify({
            'message': 'ERROR',
            'success': False,
            'exception_details': str(ex),
            'traceback': traceback_str
        }), 500

# Get por id
@main.route('/<idCiudad>',methods=['GET'])
def get_ciudad_id(idCiudad):
    try:
        ciudades = CiudadServices.get_ciudad_id(idCiudad)
        if len(ciudades)>0:
            
            return jsonify({'message':'SUCCESS','success':True,'ciudades':ciudades})
        else:
            return jsonify({'message':'NOTFOUND','success':True, "ex":ciudades})
    except Exception as ex:
        traceback_str = traceback.format_exc()
        return jsonify({
            'message': 'ERROR',
            'success': False,
            'exception_details': str(ex),
            'traceback': traceback_str
        }), 500




