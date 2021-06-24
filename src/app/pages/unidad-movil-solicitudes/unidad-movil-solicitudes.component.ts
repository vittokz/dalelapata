import { Component, OnInit } from '@angular/core';
import { Ciudad } from 'src/app/modelos/modulo-ciudades/ciudades-modelo';
import { Fundacion } from 'src/app/modelos/modulo-fundacion/fundacion-modelo';
import { UserPagina } from 'src/app/modelos/modulo-usuario/usuarioPagina-modelo';
import { FundacionService } from 'src/app/servicios/fundacion/fundacion.service';
import { MascotasService } from 'src/app/servicios/mascotas/mascotas.service';
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
  ciudadesFormulario: Ciudad[];
  usuario:UserPagina;
  envioForm:boolean=false;
  cargando:boolean=false;
  listaDocumentos: any[];
  url: string = environment.url;

  constructor(private userPlataformaService: UserPlataformaService,private visitaService: VisitasMovilService,
    private fundacionService: FundacionService, private mascotaService: MascotasService) { }

  ngOnInit(): void {
    this.identidadUsuario = this.userPlataformaService.getCurrentUser();
    this.cargarDatosUsuario();
    this.cargarCiudades();
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

 cargarCiudades(){
  this.mascotaService.getCiudades().subscribe(
    data=>{
        this.ciudadesFormulario = data;
    }
  )
}

 cargarDatosUsuario(){
  this.userPlataformaService.getUsuarioIdentidad(this.identidadUsuario).subscribe(
    data=>{
        this.usuario = data;
        this.idFundacion = this.usuario.idFundacion;
        this.cargarDatosFundacion(this.idFundacion);
    }
  );
}

cargarDatosFundacion(idFundacion: string){
  this.fundacionService.getFundacionId(idFundacion).subscribe(
    resul=>{
      this.fundacion = resul;
      this.razonSocial = this.fundacion.razonSocial;
      this.identidadFundacion = this.fundacion.identidad;
      this.municipio = this.fundacion.municipio;
      this.idFundacion= this.fundacion.idFundacion;
  
     }
  );
}

}
