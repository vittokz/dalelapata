import { Component, OnInit } from '@angular/core';
import { Fundacion } from '../../../../../modelos/modulo-fundacion/fundacion-modelo';
import { Mascota, Postulados } from '../../../../../modelos/modulo-mascota/mascota-modulo';
import { UserPagina } from 'src/app/modelos/modulo-usuario/usuarioPagina-modelo';
import { MascotasService } from '../../../../../servicios/mascotas/mascotas.service';
import { ExportarService } from '../../../../../servicios/exportarExcel/exportar.service';
import { UserPlataformaService } from '../../../../../servicios/userPlataforma/user-plataforma.service';
import { FundacionService } from '../../../../../servicios/fundacion/fundacion.service';
import { AdopcionService } from '../../../../../servicios/adopcion/adopcion.service';

@Component({
  selector: 'app-postulaciones',
  templateUrl: './postulaciones.component.html',
  styleUrls: ['./postulaciones.component.css']
})
export class PostulacionesComponent implements OnInit {
  public idUsuario: string;
  public idFundacion: string;
  public cantidadMascotasPostuladas: Number;
  identidadUsuario: string;
  usuario:UserPagina;
  listaMascotasPostulados: Mascota[];
  mascota: Mascota= new Mascota();
  mascotasFundacionExtraviadas: Mascota[];
  fundacion: Fundacion;
  public razonSocial: string;
  
  constructor(private userPlataformaService: UserPlataformaService,
    private mascotaService: MascotasService,private fundacionService: FundacionService,
    private exportExcelService: ExportarService, private adopcionService: AdopcionService) {
       
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
            this.cargarPostuladosFundacion(this.idFundacion);
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

  cargarPostuladosFundacion(idFundacion:string){
        this.adopcionService.getPostulacionesPorIdFundacion(idFundacion).subscribe(
          data=>{
              this.listaMascotasPostulados = data;
              this.cantidadMascotasPostuladas = this.listaMascotasPostulados.length;
            }
        );
  }

  generarExcel(jsonElmentos: any[],nombreArchivo:string):void{
    this.exportExcelService.exportExcel(jsonElmentos,nombreArchivo);
 }

}
