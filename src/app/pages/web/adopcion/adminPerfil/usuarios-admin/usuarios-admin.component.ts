import { Component, OnInit } from '@angular/core';
import { UserPlataformaService } from '../../../../../servicios/userPlataforma/user-plataforma.service';
import { FundacionService } from '../../../../../servicios/fundacion/fundacion.service';
import { UserPagina } from '../../../../../modelos/modulo-usuario/usuarioPagina-modelo';
import { ExportarService } from '../../../../../servicios/exportarExcel/exportar.service';
import { Fundacion } from '../../../../../modelos/modulo-fundacion/fundacion-modelo';

@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios-admin.component.html',
  styleUrls: ['./usuarios-admin.component.css']
})
export class UsuariosAdminComponent implements OnInit {
  identidadUsuario: string;
  usuario:UserPagina;
  usuarioFundacion: UserPagina[];
  idFundacion: string;
  fundacion: Fundacion;
  public razonSocial: string;
  
  constructor(private userPlataformaService: UserPlataformaService,
    private fundacionService: FundacionService,private exportExcelService: ExportarService) { }

  ngOnInit(): void {
    this.identidadUsuario = this.userPlataformaService.getCurrentUser();
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario(){
    this.userPlataformaService.getUsuarioIdentidad(this.identidadUsuario).subscribe(
      data=>{
          this.usuario = data;
          this.idFundacion = this.usuario[0].idFundacion;
            this.cargarUsuariosFundacion(this.idFundacion);
            this.cargarDatosFundacion(this.idFundacion);
      }
    );
  }

  cargarDatosFundacion(idFundacion: string){
    this.fundacionService.getFundacionId(idFundacion).subscribe(
      resul=>{
        this.fundacion = resul;
        this.razonSocial = this.fundacion[0].razonSocial;
        console.log("ra:" + this.fundacion[0].razonSocial);
      }
    )
  }

  cargarUsuariosFundacion(idFundacion:string){
    this.fundacionService.getUsuariosFundacion(idFundacion).subscribe(
      data=>{
          this.usuarioFundacion = data;
       }
    );
  }

  generarExcel(jsonElmentos: any[],nombreArchivo:string):void{
    this.exportExcelService.exportExcel(jsonElmentos,nombreArchivo);
 }

}
