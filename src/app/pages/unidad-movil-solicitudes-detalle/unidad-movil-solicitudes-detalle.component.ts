import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Fundacion } from 'src/app/modelos/modulo-fundacion/fundacion-modelo';
import { RespuestaSolicitud } from 'src/app/modelos/modulo-unidadMovil/unidadMovil-modelo';
import { UserPagina } from 'src/app/modelos/modulo-usuario/usuarioPagina-modelo';
import { FundacionService } from 'src/app/servicios/fundacion/fundacion.service';
import { UserPlataformaService } from 'src/app/servicios/userPlataforma/user-plataforma.service';
import { VisitasMovilService } from 'src/app/servicios/visitas-movil/visitas-movil.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-unidad-movil-solicitudes-detalle',
  templateUrl: './unidad-movil-solicitudes-detalle.component.html',
  styleUrls: ['./unidad-movil-solicitudes-detalle.component.css']
})
export class UnidadMovilSolicitudesDetalleComponent implements OnInit {
  identidadUsuario: string;
  idFundacion: string;
  fundacion: Fundacion;
  public razonSocial: string;
  identidadFundacion: string;
  municipio: string;
  usuario:UserPagina;
  envioForm:boolean=false;
  cargando:boolean=false;
  respuestaSolicitud: RespuestaSolicitud = new RespuestaSolicitud();
  listaDocumentos: any[];
  nombre: string;
  url: string = environment.url;
  dato: {
    idSolicitud: string,
    idUsuarioAlcaldia: string,
};
formRespuesta: FormGroup;

  constructor(private rutaActiva: ActivatedRoute,private userPlataformaService: UserPlataformaService,private visitaService: VisitasMovilService,
    private fundacionService: FundacionService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.dato = {
      idSolicitud: this.rutaActiva.snapshot.params.parametro,
      idUsuarioAlcaldia: this.rutaActiva.snapshot.params.parametro2,
    };
    this.crearFormulario();
    this.identidadUsuario = this.userPlataformaService.getCurrentUser();
    this.cargarDatosUsuario();
    this.cargarListaDocumentos();
  }

  crearFormulario(){
    this.formRespuesta = this.formBuilder.group({
      comentarios: ['',Validators.required],
      estado: ['', Validators.required]
    })
 }

  cargarListaDocumentos() {
    this.visitaService.listarDocumentosByIdentidad(this.dato.idUsuarioAlcaldia).subscribe(
      (dataLista)=>{
        this.listaDocumentos = dataLista;
        console.log(this.listaDocumentos);
        this.nombre=this.listaDocumentos[0].nombre;
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

  agregarRespuesta(){
    const form = this.formRespuesta.value;
    this.respuestaSolicitud.comentarios = form.comentarios;
    this.respuestaSolicitud.estado = form.estado;
    this.respuestaSolicitud.idSolicitud = this.dato.idSolicitud;
    this.visitaService.enviarRespuestaSolicitud(this.respuestaSolicitud).subscribe(
      resp=>{
        this.cargarListaDocumentos();
        console.log('respuesta->>',resp);
      }
    );
  }

}