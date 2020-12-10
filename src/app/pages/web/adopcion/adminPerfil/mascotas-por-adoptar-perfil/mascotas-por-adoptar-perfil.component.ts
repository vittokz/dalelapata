import { Component, OnInit } from '@angular/core';
import { UserPlataformaService } from '../../../../../servicios/userPlataforma/user-plataforma.service';
import { MascotasService } from '../../../../../servicios/mascotas/mascotas.service';
import { ExportarService } from '../../../../../servicios/exportarExcel/exportar.service';
import { Ciudad } from '../../../../../modelos/modulo-ciudades/ciudades-modelo';
import { Raza, Mascota } from '../../../../../modelos/modulo-mascota/mascota-modulo';
import { UserPagina } from '../../../../../modelos/modulo-usuario/usuarioPagina-modelo';
import { FundacionService } from '../../../../../servicios/fundacion/fundacion.service';
import { Fundacion } from '../../../../../modelos/modulo-fundacion/fundacion-modelo';

@Component({
  selector: 'app-mascotas-por-adoptar-perfil',
  templateUrl: './mascotas-por-adoptar-perfil.component.html',
  styleUrls: ['./mascotas-por-adoptar-perfil.component.css']
})
export class MascotasPorAdoptarPerfilComponent implements OnInit {
  public idUsuario: string;
  public idFundacion: string;
  public cantidadMascotasPorAdoptar: Number;
  identidadUsuario: string;
  usuario:UserPagina;
  mascota: Mascota= new Mascota();
  mascotasFundacionPorAdoptar: Mascota[];
  fundacion: Fundacion;
  public razonSocial: string;
  
  constructor(private userPlataformaService: UserPlataformaService,
    private mascotaService: MascotasService,private fundacionService: FundacionService,
    private exportExcelService: ExportarService) {
       
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
        this.mascotaService.getMascotasPorFundacionPorAdoptadar(idFundacion).subscribe(
          data=>{
              this.mascotasFundacionPorAdoptar = data;
              this.cantidadMascotasPorAdoptar = this.mascotasFundacionPorAdoptar.length;
            }
        );
  }

  generarExcel(jsonElmentos: any[],nombreArchivo:string):void{
    this.exportExcelService.exportExcel(jsonElmentos,nombreArchivo);
 }

}
