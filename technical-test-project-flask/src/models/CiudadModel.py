class CiudadModel:

    # Constructor
    def __init__(self,idCiudad,nombreCiudad,estadoCiudad) -> None:
        self.idCiudad= idCiudad
        self.nombreCiudad = nombreCiudad
        self.estadoCiudad = estadoCiudad
        
    
    # metodo convertir informacion a json
    def to_json(self):
        return{
         "idCiudad" : self.idCiudad,
         "nombreCiudad" : self.nombreCiudad, 
         "estadoCiudad" : self.estadoCiudad
        }




