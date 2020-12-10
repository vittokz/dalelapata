import { Component, OnInit } from '@angular/core';
import { AuthUsuariosService } from '../../servicios/usuariosAdmin/auth-usuarios.service';
import { UserInterface } from '../../modelos/modulo-usuariosAdmin/usuarioAdmin-modelo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  identidadUsuario:string;
  usuarioLogueado: UserInterface[];
  formPerfil: FormGroup;
  
  constructor(private authService: AuthUsuariosService,private formBuild: FormBuilder) { }
  
  ngOnInit() {
    this.identidadUsuario = this.authService.getCurrentUser();
    this.crearFormulario(this.identidadUsuario);
  }

  crearFormulario(identidad:string){
    this.formPerfil = this.formBuild.group({
      identidad: ['',Validators.required],
      nombres: ['',Validators.required],
      apellidos: ['',Validators.required],
      email: ['',Validators.required],
      telefono: ['',Validators.required],
      direccion: ['',Validators.required],
      clave: ['',Validators.required]
    });
    this.authService.getUsuarioPorIdentidad(identidad).subscribe(
      data=>{
          this.usuarioLogueado = data;  
          this.formPerfil.get('identidad').setValue(this.usuarioLogueado[0].identidad)
          this.formPerfil.get('nombres').setValue(this.usuarioLogueado[0].nombre)
          this.formPerfil.get('apellidos').setValue(this.usuarioLogueado[0].apellido)
          this.formPerfil.get('email').setValue(this.usuarioLogueado[0].email)
          this.formPerfil.get('telefono').setValue(this.usuarioLogueado[0].telefono)
          this.formPerfil.get('direccion').setValue(this.usuarioLogueado[0].direccion)
          this.formPerfil.get('clave').setValue(this.usuarioLogueado[0].clave)
       }
    );
  }
  editar(){

  }

}
