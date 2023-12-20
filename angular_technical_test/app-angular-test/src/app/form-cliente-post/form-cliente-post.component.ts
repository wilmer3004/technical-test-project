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
  estadoCliente: number = 0;
  fechaNacimientoCliente: string = '';
  idCiudadFK: number = 1;
  idOcupacionFK: number = 1;
  nombresCliente: string = '';
  telefonoCliente: any ;
  numIdentCliente: any ;

  clientes: any[] = [];  
  ciudades: any[] = [];  
  ocupaciones: any[] = [];  
  ocupacionMap: any = {};
  ciudadMap: any = {};
  constructor(private route: ActivatedRoute,private router: Router, private http: HttpClient, private cookieService: CookieService, private location: Location) {}

  async ngOnInit() {
    
      this.http.get<any>('http://127.0.0.1:5000/ocupacion/').subscribe(data => {
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
      this.http.get<any>('http://127.0.0.1:5000/ciudad/').subscribe(data => {
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
  }
  

  volver(){
    this.router.navigate(['']);
  }

  async registrarCliente() {

      const requestBody = {
        "numIdentCliente":this.numIdentCliente,
        "nombresCliente":this.nombresCliente,
        "apellidosCliente":this.apellidosCliente,
        "correoCliente":this.correoCliente,
        "telefonoCliente":this.telefonoCliente,
        "fechaNacimientoCliente":this.fechaNacimientoCliente,
        "estadoCliente":this.estadoCliente,
        "idCiudadFK":this.idCiudadFK,
        "idOcupacionFK":this.idOcupacionFK,
      }
      const data = await (await this.postCliente(requestBody)).toPromise();
      console.log(data)
      this.router.navigate(['']);
      
  }
  async postCliente(requestBody: any){

    return this.http.post<any>(`http://127.0.0.1:5000/clientes/`, requestBody);
  
  }




}
