import { OnInit } from '@angular/core';
import { UserPlataformaService } from '../../../../../servicios/userPlataforma/user-plataforma.service';
import { MascotasService } from '../../../../../servicios/mascotas/mascotas.service';
import { FundacionService } from '../../../../../servicios/fundacion/fundacion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ExportarService } from '../../../../../servicios/exportarExcel/exportar.service';
import { UserPagina } from '../../../../../modelos/modulo-usuario/usuarioPagina-modelo';
import { Mascota, Raza } from '../../../../../modelos/modulo-mascota/mascota-modulo';
import { Ciudad } from '../../../../../modelos/modulo-ciudades/ciudades-modelo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Fundacion } from '../../../../../modelos/modulo-fundacion/fundacion-modelo';
import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PopupAgregarLogroComponent } from '../popupAgregarLogro/popup-agregar-logro/popup-agregar-logro.component';
import { PopupVerLogrosComponent } from '../popupVerLogros/popup-ver-logros/popup-ver-logros.component';

@Component({
  selector: 'app-registrar-mascota',
  templateUrl: './registrar-mascota.component.html',
  styleUrls: ['./registrar-mascota.component.css']
})
 
export class RegistrarMascotaComponent implements OnInit {
    public idUsuario: string;
    public idFundacion: string;
    public cantidadMascotasAdoptadas: Number;
    public cantidadMascotasPorAdoptar: Number;
    identidadUsuario: string;
    usuario:UserPagina;
    mascota: Mascota= new Mascota();
    mascotasFundacionAdoptadas: Mascota[];
    mascotasFundacionPorAdoptar: Mascota[];
    fundacion: Fundacion;
    public razonSocial: string;
    modalRef: BsModalRef;

    constructor(private fundacionService: FundacionService,private userPlataformaService: UserPlataformaService,
    private mascotaService: MascotasService,private rutaActiva: ActivatedRoute,
    private exportExcelService: ExportarService,private modalService: BsModalService) {
      
     }

  ngOnInit(): void {
    
    this.identidadUsuario = this.userPlataformaService.getCurrentUser();
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario(){
    this.userPlataformaService.getUsuarioIdentidad(this.identidadUsuario).subscribe(
      data=>{
          this.usuario = data;
          this.idFundacion = this.usuario[0].idFundacion;
          this.idUsuario = this.usuario[0].idUsuario;
            this.cargarMascotasFundacion(this.idFundacion);
            this.cargarDatosFundacion(this.idFundacion);
      }
    );
  }

  cargarDatosFundacion(idFundacion: string){
    this.fundacionService.getFundacionId(idFundacion).subscribe(
      resul=>{
        this.fundacion = resul;
        this.razonSocial = this.fundacion[0].razonSocial;
      }
    )
  }

  cargarMascotasFundacion(idFundacion:string){
        this.mascotaService.getMascotasPorFundacionAdoptadas(idFundacion).subscribe(
          data=>{
              this.mascotasFundacionAdoptadas = data;
              this.cantidadMascotasAdoptadas = this.mascotasFundacionAdoptadas.length;
            }
        );
  }


  generarExcel(jsonElmentos: any[],nombreArchivo:string):void{
    this.exportExcelService.exportExcel(jsonElmentos,nombreArchivo);
 }

 

}
