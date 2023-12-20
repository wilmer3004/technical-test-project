import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-pagina-inicio',
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.css']
})
export class PaginaInicioComponent {

  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) {}

  async ngOnInit() {
  }

  login() {
    this.router.navigate(['login']);
  }

  registrar() {
    this.router.navigate(['formclient']);
  }
}
