class GerenteCModel:

    # Constructor
    def __init__(self,numIdentGerentC,correoGerentC,passwordGerenteC,nombresGerenteC,apellidosGerenteC) -> None:
        self.numIdentGerentC= numIdentGerentC
        self.correoGerentC = correoGerentC
        self.passwordGerenteC = passwordGerenteC
        self.nombresGerenteC = nombresGerenteC
        self.apellidosGerenteC = apellidosGerenteC
        
    
    # metodo convertir informacion a json
    def to_json(self):
        return{
         "numIdentGerentC" : self.numIdentGerentC,
         "correoGerentC" : self.correoGerentC, 
         "passwordGerenteC" : self.passwordGerenteC,
         "nombresGerenteC" : self.nombresGerenteC, 
         "apellidosGerenteC" : self.apellidosGerenteC
        }