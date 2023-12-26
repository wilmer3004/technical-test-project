import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';  // Importa Location
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css']
})
export class FormClienteComponent {

  apellidosCliente: string = '';
  clienteEsViable: number = 0;
  correoCliente: string = '';
  estadoCliente: number = 0;
  fechaNacimientoCliente: string = '';
  idCiudadFK: number = 0;
  idOcupacionFK: number = 0;
  nombresCliente: string = '';
  telefonoCliente: string = '';
  numIdentCliente: number = 0;

  dataError:string =''

  clientes: any[] = [];  
  ciudades: any[] = [];  
  ocupaciones: any[] = [];  
  ocupacionMap: any = {};
  ciudadMap: any = {};
  constructor(private route: ActivatedRoute,private router: Router, private http: HttpClient, private cookieService: CookieService, private location: Location) {}

  async ngOnInit() {
    // Obtén el token de la cookie
    const token = this.cookieService.get('token');
  
    // Verifica si el token está presente
    if (token) {
      // Configura el encabezado de autorización con el token en formato Bearer
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      // Suscríbete a los parámetros de la ruta
      this.route.params.subscribe(params => {
        this.numIdentCliente = params['id'];
      });
  
      // Clientes
      this.http.get<any>(`http://127.0.0.1:5000/clientes/${this.numIdentCliente}`, { headers }).subscribe(data => {
        console.log(data);
        if(data.message == "Unauthorized"){
          this.cookieService.deleteAll();
          this.router.navigate(['login']);
        }
        if (data.success == true) {
          // Asigna los valores a los campos del formulario
          const cliente = data.clientes[0];
          this.nombresCliente = cliente.nombresCliente;
          this.apellidosCliente = cliente.apellidosCliente;
          this.correoCliente = cliente.correoCliente;
          this.telefonoCliente = cliente.telefonoCliente;
          this.fechaNacimientoCliente = cliente.fechaNacimientoCliente;
          this.estadoCliente = cliente.estadoCliente;
          this.idCiudadFK = cliente.idCiudadFK;
          this.idOcupacionFK = cliente.idOcupacionFK;
        }
      });
  
      // Ocupaciones
      this.http.get<any>('http://127.0.0.1:5000/ocupacion/', { headers }).subscribe(data => {
        console.log(data);
        if (data.success == true) {
          this.ocupaciones = data.ocupacion;
  
          // Crear el mapeo
          this.ocupacionMap = {};
          for (const ocupacion of this.ocupaciones) {
            this.ocupacionMap[ocupacion.idOcupacion] = ocupacion.nombreOcupacion;
          }
        }
      });
  
      // Ciudades
      this.http.get<any>('http://127.0.0.1:5000/ciudad/', { headers }).subscribe(data => {
        console.log(data);
        if (data.success == true) {
          this.ciudades = data.ciudades;
  
          // Crear el mapeo
          this.ciudadMap = {};
          for (const ciudad of this.ciudades) {
            this.ciudadMap[ciudad.idCiudad] = ciudad.nombreCiudad;
          }
        }
      });
    } else {
      this.router.navigate(['login']);
    }
  }
  

  volver(){
    this.router.navigate(['dashboard']);
  }

  async editarCliente() {


    if( this.nombresCliente != '' && this.apellidosCliente !='' &&
      this.correoCliente != '' && this.telefonoCliente != '' && this.fechaNacimientoCliente!='' &&
      this.idCiudadFK != null && this.idOcupacionFK != null){
        const correoValidar = this.validarCorreo(this.correoCliente);


        if(!correoValidar){
          this.dataError = 'Formato de correo no válido';
          return;
        }
        if(this.correoCliente.length <6 || this.correoCliente.length >85){
          this.dataError = 'Longitud del correo menor a 6 o mayor a 255'
          return;
        }

        if(this.tipoNumero(this.telefonoCliente) != true){
          this.dataError = 'El número de telefono no tiene un formato tipo numero válido';
          return;
        }

        if(this.telefonoCliente.length <6 || this.telefonoCliente.length >12){
          this.dataError = 'Longitud del número de telefono menor a 6 o mayor a 12'
          return;
        }

        if(this.validarFecha(this.fechaNacimientoCliente) == true){
          this.dataError = 'El formato de la fecha de nacimiento no es válido (debe ser YYYY-MM-DD)';
          return;
        }
        if(this.validarFechaNacimiento(this.fechaNacimientoCliente) == false){
          this.dataError = 'La fecha de nacimiento no es válida. Debe tener entre 15 y 80 años.';
          return;
        }



        if(this.nombresCliente.length <2 || this.nombresCliente.length >85){
          this.dataError = 'Longitud de los nombres menor a 2 o mayor a 85'
          return;
        }

        if(this.apellidosCliente.length <2 || this.apellidosCliente.length >85){
          this.dataError = 'Longitud de los nombres menor a 2 o mayor a 85'
          return;
        }




        

        const requestBody = {
          "nombresCliente":this.nombresCliente,
          "apellidosCliente":this.apellidosCliente,
          "correoCliente":this.correoCliente,
          "telefonoCliente":this.telefonoCliente,
          "fechaNacimientoCliente":this.fechaNacimientoCliente,
          "estadoCliente":this.estadoCliente,
          "idCiudadFK":this.idCiudadFK,
          "idOcupacionFK":this.idOcupacionFK,
        }
        try {
          const data = await this.putCliente(requestBody, this.numIdentCliente);
          console.log(data)
          if(data.message == "Unauthorized"){
            this.cookieService.deleteAll();
            this.router.navigate(['login']);
          }
    
          // Errores de excepciones del servidor

          if (data && data.exception) {
            if (data.exception.includes("Duplicate entry")) {
              if (data.exception.includes(this.correoCliente)) {
                this.dataError = 'Ya existe un cliente con el mismo correo electrónico.';
                return;
              }
              if (data.exception.includes(this.telefonoCliente)) {
                this.dataError = 'Ya existe un cliente con el mismo número de teléfono.';
                return;
              } 
              else {
                // Otras comprobaciones de excepciones si es necesario
                this.dataError = 'Error inesperado al registrar el cliente.';
              }
              return;
            }
          }
          this.router.navigate(['dashboard']);

        } catch (error) {
          console.error('Error al realizar la solicitud:', error);
          this.dataError = 'Error inesperado al registrar el cliente.';
        }
      }

    else{
      this.dataError = 'Ningún dato puede quedar vacío'
    }
      


  }

// Validaciones

tipoNumero(numero:any){
  if (isNaN(numero)) {
    return false
  }
  else{
    return true
  }
}

validarCorreo(correo1: string): boolean {
  const patron = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return patron.test(correo1);
}

validarFecha(fecha:any){
  const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;

if (!fechaRegex.test(fecha)) {
  return true;
}
else{
  return false;
}
}

validarFechaNacimiento(fechaNacimientoCliente:string) {
  const fechaActual = new Date();
  const fechaNacimiento = new Date(fechaNacimientoCliente);

  // Calcula la edad
  const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

  // Verifica si la fecha de nacimiento es válida (entre 6 y 80 años en el pasado)
  if (edad < 15 || edad > 80) {
    return false
  } else {
   return true
  }
}





// Put

async putCliente(requestBody: any, numeroIdent: any) {
  const token = this.cookieService.get('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.put<any>(`http://127.0.0.1:5000/clientes/${numeroIdent}`, requestBody, { headers })
    .toPromise()
    .catch(error => {
      if (error.status === 401) {
        this.handleUnauthorizedError();
      }
      throw error; // Re-lanza el error para que pueda ser manejado en otros lugares si es necesario
    });
}

  private handleUnauthorizedError() {
    // Manejar el error 401 aquí, por ejemplo, redirigir al usuario al inicio de sesión
    Swal.fire({
      title: '¡Sesión expirada!',
      text: 'La sesión se cerró porque el token expiró.',
      icon: 'error'
    });
    
    this.cookieService.deleteAll();
    this.router.navigate(['login']);
  }



}
