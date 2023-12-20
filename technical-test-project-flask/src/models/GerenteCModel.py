class GerenteCModel:

    # Constructor
    def __init__(self,numIdentGerentC,correoGerentC,passwordGerenteC,nombresCliente,apellidosCliente) -> None:
        self.numIdentGerentC= numIdentGerentC
        self.correoGerentC = correoGerentC
        self.passwordGerenteC = passwordGerenteC
        self.nombresCliente = nombresCliente
        self.apellidosCliente = apellidosCliente
        
    
    # metodo convertir informacion a json
    def to_json(self):
        return{
         "numIdentGerentC" : self.numIdentGerentC,
         "correoGerentC" : self.correoGerentC, 
         "passwordGerenteC" : self.passwordGerenteC,
         "nombresCliente" : self.nombresCliente, 
         "apellidosCliente" : self.apellidosCliente
        }