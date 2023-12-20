# Database
from src.database.db_mysql import get_connection
# Models
from src.models.GerenteCModel import GerenteCModel

class GerenteCServices():
    
    @classmethod
    def login_user(cls,usuario):
        try:
            connection = get_connection()
            autenticacion_usuario = None
            with connection.cursor() as cursor:
                sql = 'SELECT * FROM gerenteComercial WHERE correoGerentC = %s AND passwordGerenteC=%s'
                data = (usuario.correoGerentC,usuario.passwordGerenteC)
                cursor.execute(sql,data)
                row = cursor.fetchone()
                if row != None:
                    autenticacion_usuario = GerenteCModel(int(row[0]),row[2],row[1],row[3],row[4])
            connection.commit()
            connection.close()
            return autenticacion_usuario
        except Exception as ex:
            print(ex)