import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  clientes: any[] = [];  
  ciudades: any[] = [];  
  ocupaciones: any[] = [];  
  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) {}

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
      });

      // Ocupaciones
      this.http.get<any>('http://127.0.0.1:5000/ocupacion/', { headers }).subscribe(data => {
        console.log(data);
        if(data.success == true){
          this.ocupaciones=data.ocupacion
        }
      });

      // Ciudades
      this.http.get<any>('http://127.0.0.1:5000/ciudad/', { headers }).subscribe(data => {
        console.log(data);
        if(data.success == true){
          this.ciudades=data.ciudades
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


}
