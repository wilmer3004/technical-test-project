import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';  // Importa Location
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  clientes: any[] = [];  
  ciudades: any[] = [];  
  ocupaciones: any[] = [];  
  ocupacionMap: any = {};
  ciudadMap: any = {};
  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService, private location: Location) {}

  async ngOnInit() {
    // Obtén el token de la cookie
    const token = this.cookieService.get('token');

    // Verifica si el token está presente
    if (token) {
      // Configura el encabezado de autorización con el token en formato Bearer
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      // Realiza la solicitud HTTP con el encabezado de autorización
      // Clientes
      this.http.get<any>('http://127.0.0.1:5000/clientes/', { headers }).subscribe(data => {
        console.log(data);

        
        if(data.success == true){
        this.clientes=data.clientes
        }

      },
      error => {
        if (error.status === 401) {
          this.handleUnauthorizedError();
        }
      }
      );

      // Ocupaciones
      this.http.get<any>('http://127.0.0.1:5000/ocupacion/', { headers }).subscribe(data => {
        console.log(data);
        if(data.success == true){
          this.ocupaciones=data.ocupacion;
          

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
        if(data.success == true){
          this.ciudades=data.ciudades;

          // Crear el mapeo
          this.ciudadMap = {};
          for (const ciudad of this.ciudades) {
            this.ciudadMap[ciudad.idCiudad] = ciudad.nombreCiudad;
          }
        }
      });


    }
    else{
      this.router.navigate(['login']);
    }
  }

  logout(){
    this.cookieService.deleteAll();
    this.router.navigate(['login']);
  }

  async estadoCliente(numeroIdent:any,estadoCliente:any){
    let estadoCliente1 = estadoCliente
    estadoCliente1 = estadoCliente === 0 ? 1:0;
    const requestBody = {
      "estadoCliente" : estadoCliente1
    }
    const data = await (await this.stateClient(requestBody,numeroIdent)).toPromise();

    window.location.reload();

  }

  async stateClient(requestBody: any, numeroIdent: any) {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.put<any>(`http://127.0.0.1:5000/clientes/inactivate/${numeroIdent}`, requestBody, { headers })
      .toPromise()
      .catch(error => {
        if (error.status === 401) {
          this.handleUnauthorizedError();
        }
        throw error; // Re-lanza el error para que pueda ser manejado en otros lugares si es necesario
      });
  }

  formularioCliente(numeroIdent:any){
    this.router.navigate(['formclient',numeroIdent]);
  }

  private handleUnauthorizedError() {
    Swal.fire({
      title: '¡Sesión expirada!',
      text: 'La sesión se cerró porque el token expiró.',
      icon: 'error'
    });
    
    // Manejar el error 401 aquí, por ejemplo, redirigir al usuario al inicio de sesión
    this.cookieService.deleteAll();
    this.router.navigate(['login']);
  }

}
