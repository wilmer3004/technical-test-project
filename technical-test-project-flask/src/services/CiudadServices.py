from src.database.db_mysql import get_connection
from src.models.CiudadModel import CiudadModel

class ClienteService:
    # Get
    @classmethod
    def get_ciudad(cls):
        try:
            connection = get_connection()
            ciudades = []
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM ciudad")
                resultCiudad = cursor.fetchall()
                for row in resultCiudad:
                    ciudad = CiudadModel(int(row[0]),row[1],row[2])
                    ciudades.append(ciudad.to_json())
            connection.commit()
            return ciudades
        except Exception as ex:
            print (ex)
            return str(ex)
        finally:
            connection.close()



    # Get por id
    @classmethod
    def get_ciudad_id(cls,idCiudad):
        try:
            connection = get_connection()
            ciudades = []
            with connection.cursor() as cursor:
                sql = "SELECT * FROM ciudad WHERE idCiudad = %s"
                data = (idCiudad,)
                cursor.execute(sql,data)
                resultCiudad = cursor.fetchall()
                for row in resultCiudad:
                    ciudad = CiudadModel(int(row[0]),row[1],row[2])
                    ciudades.append(ciudad.to_json())
            connection.commit()
            return ciudades
        except Exception as ex:
            print (ex)
            return str(ex)
        finally:
            connection.close()


