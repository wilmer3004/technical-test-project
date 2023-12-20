import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  correo: string = '';
  password: string = '';
  response: any = {};
  token: string = '';

  constructor(private router:Router, private http:HttpClient, private cookieService: CookieService) {}

  ngOnInit(): void {}

  async login() {
    if (this.correo != '' && this.password != '') {
      const correoValidar = this.validarCorreo(this.correo);
      const passwordValidar = this.password.length;

      if (correoValidar && passwordValidar > 8) {
        const requestBody = {
          correoGerenteC: this.correo,
          PasswordGerenteC: this.password
        };

        try {
          // Convertir el observable a una promesa usando toPromise()
          const data = await this.postLogin(requestBody).toPromise();

          // Después de la solicitud, verificar la respuesta
          if (data.success) {
            this.response = data;  // Actualizar la variable response
            this.token = this.response.token;
            // Almacena el token en la cookie
            this.cookieService.set('token', this.token);
            this.router.navigate(['dashboard']);
          } else {
            alert('Datos de usuario inválidos');
          }
        } catch (error) {
          console.error('Error en la solicitud:', error);
          alert('Error en la solicitud');
        }
      } else if (!correoValidar && passwordValidar > 8) {
        alert('Formato de correo no válido');
      } else if (correoValidar && passwordValidar < 8) {
        alert('Longitud mínima de 8 caracteres para la contraseña');
      } else {
        alert('Formato de contraseña y/o correo inválidos');
      }
    } else {
      alert('Ninguno de los campos puede quedar vacío');
    }
  }

  validarCorreo(correo1: string): boolean {
    const patron = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return patron.test(correo1);
  }

  postLogin(requestBody: any) {
    return this.http.post<any>('http://127.0.0.1:5000/gerentec/', requestBody);
  }
}
