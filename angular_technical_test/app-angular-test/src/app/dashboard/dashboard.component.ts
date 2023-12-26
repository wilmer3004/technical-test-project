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

  currentPage: number = 1;
  itemsPerPage: number = 10;


  searchTerm: string = '';  // Nueva propiedad para almacenar el término de búsqueda

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

  async estadoCliente(numeroIdent: any, estadoCliente: any) {
    let estadoCliente1 = estadoCliente
    estadoCliente1 = estadoCliente === 0 ? 1 : 0;
    const requestBody = {
      "estadoCliente": estadoCliente1
    }
  
    try {
      const data = await this.stateClient(requestBody, numeroIdent);
      window.location.reload();
    } catch (error) {
      if (error === 401) {
        this.handleUnauthorizedError();
      }
    }
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

  
  registrar() {
    this.router.navigate(['formclient']);
  }

  filterClients(): any[] {
    const filteredClients = this.clientes.filter(cliente =>
      cliente.nombresCliente.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      cliente.apellidosCliente.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      cliente.numIdentCliente.toString().includes(this.searchTerm) ||
      cliente.correoCliente.toString().includes(this.searchTerm) ||
      cliente.telefonoCliente.toString().includes(this.searchTerm)
    );

    if (filteredClients.length > 0) {
      this.currentPage = 1;
    }
  
    return filteredClients;
  }

  
  changePage(page: number): void {
    this.currentPage = page;
  }

  totalPages(): number {
    return Math.ceil(this.filterClients().length / this.itemsPerPage);
  }

  paginatedClients(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filterClients().slice(startIndex, endIndex);
  }
  pagesArray(): number[] {
    const totalPages = this.totalPages();
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  

}
