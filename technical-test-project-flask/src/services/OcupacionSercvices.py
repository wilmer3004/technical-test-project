from src.database.db_mysql import get_connection
from src.models.OcupacionModel import OcupacionModel

class ClienteService:
    # Get
    @classmethod
    def get_ocupacion(cls):
        try:
            connection = get_connection()
            ocupaciones = []
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM ciudad")
                resultOcupaciones = cursor.fetchall()
                for row in resultOcupaciones:
                    ocupacion = OcupacionModel(int(row[0]),row[1],row[2])
                    ocupaciones.append(ocupacion.to_json())
            connection.commit()
            return ocupaciones
        except Exception as ex:
            print (ex)
            return str(ex)
        finally:
            connection.close()



    # Get por id
    @classmethod
    def get_ocupacion_id(cls,idOcupacion):
        try:
            connection = get_connection()
            ocupaciones = []
            with connection.cursor() as cursor:
                sql = "SELECT * FROM ocupacion WHERE idOcupacion = %s"
                data = (idOcupacion,)
                cursor.execute(sql,data)
                resultOcupacion = cursor.fetchall()
                for row in resultOcupacion:
                    ocupacion = OcupacionModel(int(row[0]),row[1],row[2])
                    ocupaciones.append(ocupacion.to_json())
            connection.commit()
            return ocupaciones
        except Exception as ex:
            print (ex)
            return str(ex)
        finally:
            connection.close()