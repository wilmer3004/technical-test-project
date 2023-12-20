from src.database.db_mysql import get_connection
from decouple import config
import datetime 
import pytz
import jwt



class Security:

    tz=pytz.timezone('America/Bogota')
    secret = config('JWT_KEY')
    # Generar token
    @classmethod
    def generar_token(cls,autenticacion_usuario):
        payload ={
            'iat':datetime.datetime.now(tz = cls.tz),
            'exp':datetime.datetime.now(tz = cls.tz) + datetime.timedelta(hours=1),
            'nombreGerenteC': autenticacion_usuario.nombresGerenteC,
            'apellidosGerenteC': autenticacion_usuario.apellidosGerenteC,
            
        }
        return jwt.encode(payload,cls.secret,algorithm="HS256")
    
    
    # Validar token
    @classmethod
    def verify_token(cls,headers):
        if 'Authorization' in headers.keys():
            authorization = headers['Authorization']
            encoded_token = authorization.split(" ")[1]
            
            try:
                paylod= jwt.decode(encoded_token,cls.secret,algorithms=["HS256"])
                
                return True
            except (jwt.ExpiredSignatureError, jwt.InvalidSignatureError):
                return False
            
        return False
    