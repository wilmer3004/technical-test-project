import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-inicio',
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.css']
})
export class PaginaInicioComponent {

  constructor(private router:Router,private http:HttpClient){
  }

  async ngOnInit() {
    this.http.get<any>(`http://127.0.0.1:5000/clientes/`).subscribe(data => {
     console.log(data)
      });
  }

login(){
  this.router.navigate(['login']);
}

registrar(){
  this.router.navigate(['registroUsu']);
}
  


}
