class OcupacionModel:

    # Constructor
    def __init__(self,idOcupacion,nombreOcupacion,estadoOcupacion) -> None:
        self.idOcupacion= idOcupacion
        self.nombreOcupacion = nombreOcupacion
        self.estadoOcupacion = estadoOcupacion
        
    
    # metodo convertir informacion a json
    def to_json(self):
        return{
         "idOcupacion" : self.idOcupacion,
         "nombreOcupacion" : self.nombreOcupacion, 
         "estadoOcupacion" : self.estadoOcupacion
        }