import { Component, OnInit } from '@angular/core';
import { UserPagina } from 'src/app/modelos/modulo-usuario/usuarioPagina-modelo';
import { Mascota } from 'src/app/modelos/modulo-mascota/mascota-modulo';
import { Fundacion } from 'src/app/modelos/modulo-fundacion/fundacion-modelo';
import { MascotasService } from 'src/app/servicios/mascotas/mascotas.service';
import { ExportarService } from 'src/app/servicios/exportarExcel/exportar.service';
import { FundacionService } from 'src/app/servicios/fundacion/fundacion.service';
import { UserPlataformaService } from 'src/app/servicios/userPlataforma/user-plataforma.service';

@Component({
  selector: 'app-mascotas-microchip',
  templateUrl: './mascotas-microchip.component.html',
  styleUrls: ['./mascotas-microchip.component.css']
})
export class MascotasMicrochipComponent implements OnInit {
  public idUsuario: string;
  public idFundacion: string;
  public cantidadMascotasChip: Number;
  identidadUsuario: string;
  usuario:UserPagina;
  mascota: Mascota= new Mascota();
  mascotasFundacionChip: Mascota[];
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
        this.mascotaService.getMascotasPorFundacionChip(idFundacion).subscribe(
          data=>{
              this.mascotasFundacionChip = data;
              this.cantidadMascotasChip = this.mascotasFundacionChip.length;
            }
        );
  }

  generarExcel(jsonElmentos: any[],nombreArchivo:string):void{
    this.exportExcelService.exportExcel(jsonElmentos,nombreArchivo);
 }

}
