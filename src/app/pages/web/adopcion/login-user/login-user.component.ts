import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserPagAuth } from '../../../../modelos/modulo-usuario/usuarioPagina-modelo';
import { UserPlataformaService } from '../../../../servicios/userPlataforma/user-plataforma.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
   formularioLogin: FormGroup;
  usuario: UserPagAuth= new UserPagAuth();
  isLogueado: string="";
  constructor(private formBuilder: FormBuilder, private userPlataforma: UserPlataformaService,
  private ruta: Router) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario(){
    this.formularioLogin = this.formBuilder.group(
      {
         identidad: ['',Validators.required],
         clave: ['',Validators.required]
      }
    )
  }

  loginUser(){
     const formulario = this.formularioLogin.value;
     this.usuario.identidad = formulario.identidad;
     this.usuario.clave = formulario.clave;
      this.userPlataforma.onLoginUser(this.usuario.identidad,this.usuario.clave).subscribe(
      data=>{
          if(data["resul"]>0){
              this.isLogueado="true";
              this.userPlataforma.setUser(this.usuario.identidad);
              const token = this.usuario.identidad;
              this.userPlataforma.setToken(token);
              this.ruta.navigateByUrl('/perfil-usuario');
          }
          else{
              this.isLogueado="false";
              setTimeout(() => {
                this.isLogueado="";
              }, 2000);
              //this.formularioLogin.reset();
              
          }
      }
    );
  }

  salir(){
    this.userPlataforma.logoutUser();
     this.ruta.navigateByUrl('/pagAdopcion');
  }

}
