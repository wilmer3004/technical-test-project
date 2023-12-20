import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';  // Importa Location
import { CookieService } from 'ngx-cookie-service';
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
  telefonoCliente: number = 0;
  numIdentCliente: number = 0;

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
      const data = await (await this.putCliente(requestBody, this.numIdentCliente)).toPromise();
      console.log(data)
      this.router.navigate(['dashboard']);
      
  }
  async putCliente(requestBody: any, numeroIdent: any){
    const token = this.cookieService.get('token');
    
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.put<any>(`http://127.0.0.1:5000/clientes/${numeroIdent}`, requestBody, { headers });
  
  }



}
