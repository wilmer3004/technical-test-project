import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';  // Importa Location
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-form-cliente-post',
  templateUrl: './form-cliente-post.component.html',
  styleUrls: ['./form-cliente-post.component.css']
})
export class FormClientePostComponent {

  fechaSeleccionada: Date = new Date();

  apellidosCliente: string = '';
  clienteEsViable: any;
  correoCliente: string = '';
  fechaNacimientoCliente: string = '';
  idCiudadFK: number = 1;
  idOcupacionFK: number = 1;
  nombresCliente: string = '';
  telefonoCliente: any ;
  numIdentCliente: any ;

  dataError:string = '';

  clientes: any[] = [];  
  ciudades: any[] = [];  
  ocupaciones: any[] = [];  
  ocupacionMap: any = {};
  ciudadMap: any = {};

  // Constructor
  constructor(private route: ActivatedRoute,private router: Router, private http: HttpClient, private cookieService: CookieService, private location: Location) {}

  async ngOnInit() {
    try {
      await this.loadOcupaciones();
      await this.loadCiudades();
    } catch (error) {
      console.error('Error en la solicitud:', error);
      this.dataError = '¡Error de conexión al servidor!';
    }
  }
  // Funcion para cargar ocupaciones
  private async loadOcupaciones() {
    const data = await this.http.get<any>('http://127.0.0.1:5000/ocupacion/').toPromise();
    if (data.success == true) {
      this.ocupaciones = data.ocupacion;

      // Crear el mapeo
      this.ocupacionMap = {};
      for (const ocupacion of this.ocupaciones) {
        this.ocupacionMap[ocupacion.idOcupacion] = ocupacion.nombreOcupacion;
      }
    }
  }

  // Función para cargar ciudades
  private async loadCiudades() {
    const data = await this.http.get<any>('http://127.0.0.1:5000/ciudad/').toPromise();
    if (data.success == true) {
      this.ciudades = data.ciudades;

      // Crear el mapeo
      this.ciudadMap = {};
      for (const ciudad of this.ciudades) {
        this.ciudadMap[ciudad.idCiudad] = ciudad.nombreCiudad;
      }
    }
  }
  
  // Funcion volver
  volver(){
    this.location.back();
  }

  // Funcion registrar
  async registrarCliente() {

    if(this.numIdentCliente !='' && this.nombresCliente != '' && this.apellidosCliente !='' &&
      this.correoCliente != '' && this.telefonoCliente != '' && this.fechaNacimientoCliente!='' &&
      this.idCiudadFK != null && this.idOcupacionFK != null){
        const correoValidar = this.validarCorreo(this.correoCliente);

        


        // Errores de formulario 
        if(this.tipoNumero(this.numIdentCliente) != true){
          this.dataError = 'El número de identificación no tiene un formato tipo numero válido';
          return;
        }
        // Errores de longitud
        if(this.numIdentCliente.length <6 || this.numIdentCliente.length >12){
          this.dataError = 'Longitud del número de identificación menor a 6 o mayor a 12'
          return;
        }

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
          "numIdentCliente":this.numIdentCliente.trim(),
          "nombresCliente":this.nombresCliente.trim(),
          "apellidosCliente":this.apellidosCliente.trim(),
          "correoCliente":this.correoCliente.trim(),
          "telefonoCliente":this.telefonoCliente.trim(),
          "fechaNacimientoCliente":this.fechaNacimientoCliente,
          "idCiudadFK":this.idCiudadFK,
          "idOcupacionFK":this.idOcupacionFK,
        }

        try {
          const data = await (await this.postCliente(requestBody)).toPromise();
          console.log(data);
    
          // Errores de excepciones del servidor
          if (data && data.exeption) {
            if (data.exeption.includes("Duplicate entry")) {
              if (data.exeption.includes(this.numIdentCliente)) {
                this.dataError = 'Ya existe un cliente con el mismo número de identificación.';
              } else if (data.exeption.includes(this.correoCliente)) {
                this.dataError = 'Ya existe un cliente con el mismo correo electrónico.';
              } else if (data.exeption.includes(this.telefonoCliente)) {
                this.dataError = 'Ya existe un cliente con el mismo número de teléfono.';
              } else {
                // Otras comprobaciones de excepciones si es necesario
                this.dataError = 'Error inesperado al registrar el cliente.';
              }
    
              return;
            }
          }
    
          this.location.back();

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


  // Post
  async postCliente(requestBody: any){

    return this.http.post<any>(`http://127.0.0.1:5000/clientes/`, requestBody);
  
  }




}
