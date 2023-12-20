class ClienteModel:

    # Constructor
    def __init__(self,numIdentCliente,nombresCliente,apellidosCliente,correoCliente,telefonoCliente,fechaNacimientoCliente,estadoCliente,clienteEsViable,idCiudadFK,idOcupacionFK) -> None:
        
        self.numIdentCliente= numIdentCliente
        self.nombresCliente = nombresCliente
        self.apellidosCliente = apellidosCliente
        self.correoCliente = correoCliente
        self.telefonoCliente = telefonoCliente
        self.fechaNacimientoCliente = fechaNacimientoCliente
        self.estadoCliente = estadoCliente
        self.clienteEsViable = clienteEsViable
        self.idCiudadFK = idCiudadFK
        self.idOcupacionFK = idOcupacionFK
    
    # metodo convertir informacion a json
    def to_json(self):
        return{
         "numIdentCliente" : self.numIdentCliente,
         "nombresCliente" : self.nombresCliente, 
         "apellidosCliente" : self.apellidosCliente, 
         "correoCliente" : self.correoCliente, 
         "telefonoCliente" : self.telefonoCliente,
         "fechaNacimientoCliente" : self.fechaNacimientoCliente, 
         "estadoCliente" : self.estadoCliente, 
         "clienteEsViable" : self.clienteEsViable, 
         "idCiudadFK" : self.idCiudadFK, 
         "idOcupacionFK" : self.idOcupacionFK 
        }




