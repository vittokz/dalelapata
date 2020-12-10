import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserPagina } from '../../../../modelos/modulo-usuario/usuarioPagina-modelo';
import { UserPlataformaService } from '../../../../servicios/userPlataforma/user-plataforma.service';
import { FundacionService } from '../../../../servicios/fundacion/fundacion.service';
import { Fundacion } from 'src/app/modelos/modulo-fundacion/fundacion-modelo';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {
  registro: FormGroup;
  usuario: UserPagina = new UserPagina(); 
  envioForm: string;
  dismissible = true;
  fundaciones: Fundacion[];
  alerts:any;
  defaultAlerts: any[] = [
    {
      type: 'info',
      msg: 'Se registro correctamente el usuario.'
    }
  ];
   
  constructor(private formBuild: FormBuilder, private usuarioService: UserPlataformaService,
    private fundacionService: FundacionService) { 
    this.alerts = this.defaultAlerts;
  }

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarFundaciones();
  }
 
  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  cargarFundaciones(){
    this.fundacionService.getFundaciones().subscribe(
      data=>{
          this.fundaciones=data;
          console.log(this.fundaciones);
      }
    );
  }

  crearFormulario(){
    this.registro = this.formBuild.group({
      fundacion: ['',Validators.required],
      tipoDoc: ['',Validators.required],
      identidad: ['',Validators.required],
      nombres: ['',Validators.required],
      apellidos: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['@',Validators.required],
      telefono: ['', Validators.required],
      movil: ['',Validators.required],
      clave: ['',Validators.required],
      claveConfirm : ['',Validators.required]
    })
  }

  agregarUsuario(){
      const frm = this.registro.value;
      this.usuario.idFundacion = frm.fundacion;
      this.usuario.tipoDoc = frm.tipoDoc;
      this.usuario.identidad = frm.identidad;
      this.usuario.nombres = frm.nombres;
      this.usuario.apellidos = frm.apellidos;
      this.usuario.direccion = frm.direccion;
      this.usuario.telefono = frm.telefono;
      this.usuario.movil = frm.movil;
      this.usuario.email = frm.email;
      this.usuario.clave = frm.clave;
      this.usuario.clave = frm.clave;
      this.usuarioService.agregarUsuario(this.usuario).subscribe(
        data=>{
          if(data["resul"]>0){
            this.envioForm="ok";
            this.registro.reset();
          }
          if(data["resul"]==0){
            this.envioForm="error";
          }
          if(data["resul"]==-1){
            this.envioForm="errorFundacion";
          }
        }
      );
     
  }

}
