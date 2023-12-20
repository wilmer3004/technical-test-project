import traceback

from flask import Blueprint, jsonify, request

from src.services.ClienteService import ClienteService

# Security
from src.utils.Security import Security


main = Blueprint('cliente_blueprint',__name__)

# Get
@main.route('/',methods=['GET'])
def get_cliente():
    has_access = Security.verify_token(request.headers)
    if has_access:
        try:
            clientes = ClienteService.get_cliente()
            if len(clientes)>0:
                
                return jsonify({'message':'SUCCESS','success':True,'clientes':clientes})
            else:
                return jsonify({'message':'NOTFOUND','success':True, "ex":clientes})
        except Exception as ex:
            traceback_str = traceback.format_exc()
            return jsonify({
                'message': 'ERROR',
                'success': False,
                'exception_details': str(ex),
                'traceback': traceback_str
            }), 500
    else:
        response = jsonify({'message':'Unauthorized'})
        return response,401


# Post
@main.route('/',methods=['POST'])
def add_Cliente():
    # has_access = Security.verify_token(request.headers)
    # if has_access:
        try:
            numIdentCliente = int(request.json['numIdentCliente'])
            nombresCliente = request.json['nombresCliente']
            apellidosCliente = request.json['apellidosCliente']
            correoCliente =request.json['correoCliente']
            telefonoCliente = int(request.json['telefonoCliente'])
            fechaNacimientoCliente = request.json['fechaNacimientoCliente']
            estadoCliente = request.json['estadoCliente']        
            clienteEsViable = request.json['clienteEsViable']        
            idCiudadFK = request.json['idCiudadFK']        
            idOcupacionFK = request.json['idOcupacionFK']    

            clienteAdd = ClienteService.add_cliente(numIdentCliente,nombresCliente,apellidosCliente,correoCliente,telefonoCliente,fechaNacimientoCliente,estadoCliente,clienteEsViable,idCiudadFK,idOcupacionFK)
            if clienteAdd == True:
                return jsonify({'add':clienteAdd,'message':'SUCCESS','success':True})
            else:
                return jsonify({'message':'NOT ADD','success':True, 'exeption':clienteAdd})
        except Exception as ex:
            traceback_str = traceback.format_exc()
            return jsonify({
                'message': 'ERROR',
                'success': False,
                'exception_details': str(ex),
                'traceback': traceback_str
            }), 500
    # else:
    #     response = jsonify({'message':'Unauthorized'})
    #     return response,401
        



# Put
@main.route('/<numIdentCliente>', methods=['PUT'])
def put_cliente(numIdentCliente):
    has_access = Security.verify_token(request.headers)
    if has_access:
        try:
            nombresCliente = request.json['nombresCliente']
            apellidosCliente = request.json['apellidosCliente']
            correoCliente = request.json['correoCliente']
            telefonoCliente = int(request.json['telefonoCliente'])
            fechaNacimientoCliente = request.json['fechaNacimientoCliente']
            estadoCliente = request.json['estadoCliente']
            clienteEsViable = request.json['clienteEsViable']
            idCiudadFK = request.json['idCiudadFK']
            idOcupacionFK = request.json['idOcupacionFK']

            clientePut = ClienteService.put_cliente(numIdentCliente, nombresCliente, apellidosCliente, correoCliente, telefonoCliente, fechaNacimientoCliente, estadoCliente, clienteEsViable, idCiudadFK, idOcupacionFK)
            if clientePut == True:
                return jsonify({'put': clientePut, 'message': 'SUCCESS', 'success': True})
            else:
                return jsonify({'message': 'NOT PUT', 'success': True, 'exception': clientePut})
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


# Put
@main.route('/inactivate/<numIdentCliente>', methods=['PUT'])
def inactivate_cliente(numIdentCliente):
    has_access = Security.verify_token(request.headers)
    if has_access:
        try:
            estadoCliente = request.json['estadoCliente']
            clienteinactivate = ClienteService.inactivate_cliente(numIdentCliente, estadoCliente)
            if clienteinactivate == True:
                return jsonify({'put': clienteinactivate, 'message': 'SUCCESS', 'success': True})
            else:
                return jsonify({'message': 'NOT PUT', 'success': True, 'exception': clienteinactivate})
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
@main.route('/<numIdentCliente>',methods=['GET'])
def get_cliente_id(numIdentCliente):
    has_access = Security.verify_token(request.headers)
    if has_access:
        try:
            clientes = ClienteService.get_cliente_id(numIdentCliente)
            if len(clientes)>0:
                
                return jsonify({'message':'SUCCESS','success':True,'clientes':clientes})
            else:
                return jsonify({'message':'NOTFOUND','success':True, "ex":clientes})
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



