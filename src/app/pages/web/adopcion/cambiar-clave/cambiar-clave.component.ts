import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserPagina } from '../../../../modelos/modulo-usuario/usuarioPagina-modelo';
import { UserPlataformaService } from '../../../../servicios/userPlataforma/user-plataforma.service';

@Component({
  selector: 'app-cambiar-clave',
  templateUrl: './cambiar-clave.component.html',
  styleUrls: ['./cambiar-clave.component.css']
})
export class CambiarClaveComponent implements OnInit {
  formClave: FormGroup;
  formValidar: FormGroup;
  usuarioBuscado: UserPagina = new UserPagina();
  encontrado: string;
  actualizado: Boolean;
  public can: number=0;
  constructor(private formBuilder: FormBuilder, private userSercive: UserPlataformaService) { }

  ngOnInit(): void {
    this.crearFormularioValidar();
    this.crearFormulario();
  }

  

  crearFormularioValidar(){
    this.formValidar = this.formBuilder.group(
      {
         cedula: ['',Validators.required]
      }
    )
  }

  buscarIdentidad(){
    const frm = this.formValidar.value;
    this.userSercive.getUsuarioIdentidad(frm.cedula).subscribe(
      data=>{
         if(data["resul"]==0){
              this.encontrado="error";  
         }else{
              this.usuarioBuscado = data;        
              this.encontrado="ok";      
         }
               
      }
    );
  }



  crearFormulario(){
    this.formClave = this.formBuilder.group(
      {
        clave: ['',Validators.required]
      }
    )
  }

  cambiarClave(){
    const frm = this.formClave.value;
    const clave = frm.clave;
    console.log("a:"+this.usuarioBuscado[0].identidad);
    this.userSercive.editarClaveUsuario(this.usuarioBuscado[0].identidad,clave).subscribe(
      data=>{
         this.actualizado=true; 
              
      }
    )

  }

}
