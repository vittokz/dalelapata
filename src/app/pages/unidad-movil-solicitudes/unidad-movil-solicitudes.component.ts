import { Component, OnInit } from '@angular/core';
import { Fundacion } from 'src/app/modelos/modulo-fundacion/fundacion-modelo';
import { UserPagina } from 'src/app/modelos/modulo-usuario/usuarioPagina-modelo';
import { FundacionService } from 'src/app/servicios/fundacion/fundacion.service';
import { UserPlataformaService } from 'src/app/servicios/userPlataforma/user-plataforma.service';
import { VisitasMovilService } from 'src/app/servicios/visitas-movil/visitas-movil.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-unidad-movil-solicitudes',
  templateUrl: './unidad-movil-solicitudes.component.html',
  styleUrls: ['./unidad-movil-solicitudes.component.css']
})
export class UnidadMovilSolicitudesComponent implements OnInit {
  identidadUsuario: string;
  idFundacion: string;
  fundacion: Fundacion;
  public razonSocial: string;
  identidadFundacion: string;
  municipio: string;
  usuario:UserPagina;
  envioForm:boolean=false;
  cargando:boolean=false;
  listaDocumentos: any[];
  url: string = environment.url;

  constructor(private userPlataformaService: UserPlataformaService,private visitaService: VisitasMovilService,
    private fundacionService: FundacionService) { }

  ngOnInit(): void {
    this.identidadUsuario = this.userPlataformaService.getCurrentUser();
    this.cargarDatosUsuario();
    this.cargarListaDocumentos();
  }

  cargarListaDocumentos() {
    this.visitaService.listarDocumentosTodos().subscribe(
      (dataLista)=>{
        this.listaDocumentos = dataLista;
        console.log(this.listaDocumentos);
      }
    );
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
      this.municipio = this.fundacion[0].municipio;
      this.idFundacion= this.fundacion[0].idFundacion;
  
     }
  );
}

}
