import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUsuariosService } from '../../servicios/usuariosAdmin/auth-usuarios.service';
import { UserInterface } from '../../modelos/modulo-usuariosAdmin/usuarioAdmin-modelo';
import { isError } from 'util';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  [x: string]: any;
  isLogueado:Boolean;
  formLogin: FormGroup;
  
  usuario: UserInterface ={
      identidad:'',
      clave:''
  };
  constructor(private formBuilder: FormBuilder, private authUsuarioService: AuthUsuariosService, 
    private ruta:Router) { }
    public isError = false;
  
    ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario(){
     this.formLogin = this.formBuilder.group({
       identidad: ['',Validators.required],
       clave: ['', Validators.required]
     })
  }

   onLogin(){
    const form = this.formLogin.value;
    this.usuario.identidad=form.identidad;
    this.usuario.clave = form.clave;
     this.authUsuarioService.loginUsuario(this.usuario.identidad, this.usuario.clave).subscribe(
      data=>{
          if(data["resul"]==1){
              
              this.isLogueado=true;
              this.authUsuarioService.setUser(this.usuario.identidad);
              const token = this.usuario.identidad;
              this.authUsuarioService.setToken(token);
              this.ruta.navigateByUrl('/user-profile');
            
              this.isError = false;
          }
          else{
              this.isLogueado=false;
               this.formLogin.reset();
              
          }
      }
    );
  }

}
