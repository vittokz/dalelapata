import { AdopcionService } from 'src/app/servicios/adopcion/adopcion.service';
import { Component, OnInit } from '@angular/core';
import { Fundacion } from 'src/app/modelos/modulo-fundacion/fundacion-modelo';
import { UserPagina } from 'src/app/modelos/modulo-usuario/usuarioPagina-modelo';
import { FundacionService } from 'src/app/servicios/fundacion/fundacion.service';
import { UserPlataformaService } from 'src/app/servicios/userPlataforma/user-plataforma.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {
  identidadUsuario: string;
  idFundacion: string;
  fundacion: Fundacion;
  usuario:UserPagina;
  public razonSocial: string;
  identidadFundacion: string;
  cargando: string;
  envioNoti: string;

  constructor(private userPlataformaService: UserPlataformaService,private fundacionService: FundacionService,
    private adopcionService: AdopcionService)
   { }

  ngOnInit(): void {
    this.identidadUsuario = this.userPlataformaService.getCurrentUser();
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario(){
    this.userPlataformaService.getUsuarioIdentidad(this.identidadUsuario).subscribe(
      data=>{
          this.usuario = data;
          this.idFundacion = this.usuario[0].idFundacion;
          this.cargarDatosFundacion(this.idFundacion);
      }
    );
  }

  cargarDatosFundacion(idFundacion: string){
    this.fundacionService.getFundacionId(idFundacion).subscribe(
      resul=>{
        this.fundacion = resul;
        this.razonSocial = this.fundacion[0].razonSocial;
        this.identidadFundacion = this.fundacion[0].identidad;
       }
    )
  }


  enviarNotificaciones(){
     this.cargando = "ok";
     this.adopcionService.enviarNotificaciones(this.idFundacion).subscribe(
       data=>{
         this.envioNoti = "ok";
        this.cargando="";
       }
     );
  }

}
