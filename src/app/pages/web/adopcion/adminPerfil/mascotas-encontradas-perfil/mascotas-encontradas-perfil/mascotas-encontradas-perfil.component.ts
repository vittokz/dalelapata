import { Component, OnInit } from '@angular/core';
import { UserPagina } from '../../../../../../modelos/modulo-usuario/usuarioPagina-modelo';
import { Mascota } from '../../../../../../modelos/modulo-mascota/mascota-modulo';
import { Fundacion } from '../../../../../../modelos/modulo-fundacion/fundacion-modelo';
import { MascotasService } from 'src/app/servicios/mascotas/mascotas.service';
import { UserPlataformaService } from '../../../../../../servicios/userPlataforma/user-plataforma.service';
import { FundacionService } from 'src/app/servicios/fundacion/fundacion.service';
import { ExportarService } from 'src/app/servicios/exportarExcel/exportar.service';

@Component({
  selector: 'app-mascotas-encontradas-perfil',
  templateUrl: './mascotas-encontradas-perfil.component.html',
  styleUrls: ['./mascotas-encontradas-perfil.component.css']
})
export class MascotasEncontradasPerfilComponent implements OnInit {

  public idUsuario: string;
  public idFundacion: string;
  public cantidadMascotasPorAdoptar: Number;
  identidadUsuario: string;
  usuario:UserPagina;
  mascota: Mascota= new Mascota();
  mascotasFundacionEncontradas: Mascota[];
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
        this.mascotaService.getMascotasPorFundacionEncontradas(idFundacion).subscribe(
          data=>{
              this.mascotasFundacionEncontradas = data;
              this.cantidadMascotasPorAdoptar = this.mascotasFundacionEncontradas.length;
            }
        );
  }

  generarExcel(jsonElmentos: any[],nombreArchivo:string):void{
    this.exportExcelService.exportExcel(jsonElmentos,nombreArchivo);
 }

}
