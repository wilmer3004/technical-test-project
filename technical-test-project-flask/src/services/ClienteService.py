from src.database.db_mysql import get_connection
from src.models.ClienteModel import ClienteModel
from datetime import datetime

class ClienteService:
    # Get
    @classmethod
    def get_cliente(cls):
        try:
            connection = get_connection()
            clientes = []
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM cliente")
                resultCliente = cursor.fetchall()
                for row in resultCliente:
                    
                    fecha_nacimiento = row[5]
                    fecha_actual = datetime.now()

                    # Calcular la edad
                    edad = fecha_actual.year - fecha_nacimiento.year - ((fecha_actual.month, fecha_actual.day) < (fecha_nacimiento.month, fecha_nacimiento.day))


                    if edad >=18 and edad <=65:
                        sql = ("UPDATE cliente SET  clienteEsViable = %s WHERE numIdentCliente = %s")
                        data = (1,int(row[0]))
                        cursor.execute(sql,data)
                    else:
                        sql = ("UPDATE cliente SET  clienteEsViable = %s WHERE numIdentCliente = %s")
                        data = (0,int(row[0]))
                        cursor.execute(sql,data)

                    cliente = ClienteModel(int(row[0]),row[1],row[2],row[3],int(row[4]),str(fecha_nacimiento),row[6],row[7],row[8],row[9])
                    clientes.append(cliente.to_json())
                    
            connection.commit()
            return clientes
        except Exception as ex:
            print (ex)
            return str(ex)
        finally:
            connection.close()

    # Post
    @classmethod
    def add_cliente(cls,numIdentCliente,nombresCliente,apellidosCliente,correoCliente,telefonoCliente,fechaNacimientoCliente,estadoCliente,clienteEsViable,idCiudadFK,idOcupacionFK):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                sql = 'INSERT INTO cliente VALUES  (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'
                data = (numIdentCliente,nombresCliente,apellidosCliente,correoCliente,telefonoCliente,fechaNacimientoCliente,estadoCliente,clienteEsViable,idCiudadFK,idOcupacionFK)
                cursor.execute(sql, data)
            connection.commit()  # Realizar commit de la transacción
            return True
        except Exception as ex:
            print(ex)
            return str(ex)
        finally:
            connection.close()

    # Put
    @classmethod
    def put_cliente(cls, numIdentCliente, nombresCliente, apellidosCliente, correoCliente, telefonoCliente, fechaNacimientoCliente, estadoCliente, clienteEsViable, idCiudadFK, idOcupacionFK):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                sql = 'UPDATE cliente SET nombresCliente = %s, apellidosCliente = %s, correoCliente = %s, telefonoCliente = %s, fechaNacimientoCliente = %s, estadoCliente = %s, clienteEsViable = %s, idCiudadFK = %s, idOcupacionFK = %s WHERE numIdentCliente = %s'
                data = (nombresCliente, apellidosCliente, correoCliente, telefonoCliente, fechaNacimientoCliente, estadoCliente, clienteEsViable, idCiudadFK, idOcupacionFK, numIdentCliente)
                cursor.execute(sql, data)
            connection.commit()
            return True
        except Exception as ex:
            print(ex)
            return str(ex)
        finally:
            connection.close()



    # Put imactivate
    @classmethod
    def inactivate_cliente(cls, numIdentCliente, estadoCliente):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                sql = 'UPDATE cliente SET  estadoCliente = %s WHERE numIdentCliente = %s'
                data = (estadoCliente, numIdentCliente)
                cursor.execute(sql, data)
            connection.commit()
            return True
        except Exception as ex:
            print(ex)
            return str(ex)
        finally:
            connection.close()
    

    # Get por id
    @classmethod
    def get_cliente_id(cls,numIdentCliente):
        try:
            connection = get_connection()
            clientes = []
            with connection.cursor() as cursor:
                sql = "SELECT * FROM cliente WHERE numIdentCliente = %s"
                data = (numIdentCliente,)
                cursor.execute(sql,data)
                resultCliente = cursor.fetchall()
                for row in resultCliente:
                    cliente = ClienteModel(int(row[0]),row[1],row[2],row[3],int(row[4]),row[5],row[6],row[7],row[8],row[9])
                    clientes.append(cliente.to_json())
            connection.commit()
            return clientes
        except Exception as ex:
            print (ex)
            return str(ex)
        finally:
            connection.close()