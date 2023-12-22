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

  // Nueva función para cargar ciudades
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
  

  volver(){
    this.router.navigate(['']);
  }

  async registrarCliente() {

    if(this.numIdentCliente !='' && this.nombresCliente != '' && this.apellidosCliente !='' &&
      this.correoCliente != '' && this.telefonoCliente != '' && this.fechaNacimientoCliente!='' &&
      this.idCiudadFK != null && this.idOcupacionFK != null){
        const correoValidar = this.validarCorreo(this.correoCliente);
        if(!correoValidar){
          this.dataError = 'Formato de correo no válido';
          return;
        }
        if(this.tipoNumero(this.numIdentCliente) != true){
          this.dataError = 'El número de identificación no tiene un formato válido';
          return;
        }
        if(this.tipoNumero(this.telefonoCliente) != true){
          this.dataError = 'El número de telefono no tiene un formato válido';
          return;
        }


        const requestBody = {
          "numIdentCliente":this.numIdentCliente,
          "nombresCliente":this.nombresCliente,
          "apellidosCliente":this.apellidosCliente,
          "correoCliente":this.correoCliente,
          "telefonoCliente":this.telefonoCliente,
          "fechaNacimientoCliente":this.fechaNacimientoCliente,
          "idCiudadFK":this.idCiudadFK,
          "idOcupacionFK":this.idOcupacionFK,
        }
        const data = await (await this.postCliente(requestBody)).toPromise();
        console.log(data)
        this.router.navigate(['']);
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

  // Post
  async postCliente(requestBody: any){

    return this.http.post<any>(`http://127.0.0.1:5000/clientes/`, requestBody);
  
  }




}
