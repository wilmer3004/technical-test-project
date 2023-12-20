import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  correo: string = '';
  password: string = '';

  constructor(private router:Router){
  }

  ngOnInit(): void {  }
  
  login(){
    
    if (this.correo != '' && this.password != ''){
      
      // Variables
      const correoValidar = this.validarCorreo(this.correo);
      const passwordValidar = this.password.length
      
      // Validar que los datos sean correctos
        if(correoValidar == true && passwordValidar>8){
          // const usuarioEncontrado = this.usuarios.find((usuario: { Correo: string, Password: string }) => usuario.Correo === this.correo && usuario.Password === this.password);
          // if(usuarioEncontrado){

          // }
          // else{
          //   alert('Datos de usuario invalidos');
          // }
        }

        else if(correoValidar==false && passwordValidar>8){
          alert('formato de correo no valido')
        }
       
        else if (correoValidar==true && passwordValidar<8){
          alert('Longitud minima de 8 caracteres')
        }
        else{
          alert('Formato de contraseña y correo invalidos ')

        }
    }
    else{
      alert('ninguno de los campos puede quedar vacio')
    }

  }

  validarCorreo(correo1: string): boolean {
    const patron = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return patron.test(correo1);
  }



}
