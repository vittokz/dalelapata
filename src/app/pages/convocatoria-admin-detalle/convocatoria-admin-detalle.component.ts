import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { setTime } from "ngx-bootstrap/chronos/utils/date-setters";
import { Ciudad } from "src/app/modelos/modulo-ciudades/ciudades-modelo";
import { Fundacion } from "src/app/modelos/modulo-fundacion/fundacion-modelo";
import { RespuestaSolicitud } from "src/app/modelos/modulo-unidadMovil/unidadMovil-modelo";
import { UserPagina } from "src/app/modelos/modulo-usuario/usuarioPagina-modelo";
import { ConvocatoriaService } from "src/app/servicios/convocatoria/convocatoria.service";
import { FundacionService } from "src/app/servicios/fundacion/fundacion.service";
import { MascotasService } from "src/app/servicios/mascotas/mascotas.service";
import { UserPlataformaService } from "src/app/servicios/userPlataforma/user-plataforma.service";
import { AuthUsuariosService } from "src/app/servicios/usuariosAdmin/auth-usuarios.service";
import { VisitasMovilService } from "src/app/servicios/visitas-movil/visitas-movil.service";
import { environment } from "src/environments/environment.prod";
@Component({
  selector: 'app-convocatoria-admin-detalle',
  templateUrl: './convocatoria-admin-detalle.component.html',
  styleUrls: ['./convocatoria-admin-detalle.component.css']
})
export class ConvocatoriaAdminDetalleComponent implements OnInit {

  identidadUsuario: string;
  idFundacion: string;
  fundacion: Fundacion;
  public razonSocial: string;
  identidadFundacion: string;
  identidadAcceso: string;
  municipio: string;
  usuario: UserPagina;
  bandera: boolean = false;
  ciudadesFormulario: Ciudad[];
  archivoSelect: any;
  envioForm: boolean = false;
  cargando: boolean = false;
  respuestaSolicitud: RespuestaSolicitud = new RespuestaSolicitud();
  listaDocumentos: any[];
  listaNitRegistrados: any[];
  nombre: string;
  showModal = false;
  url: string = environment.url;
  estadoRegistro: boolean = false;
  dato: {
    idMunicipio: string;
    nombreMunicipio: string;
  };
  formRespuesta: FormGroup;
  formFecha : FormGroup;

  constructor(
    private rutaActiva: ActivatedRoute,
    private userPlataformaService: UserPlataformaService,
    private convocatoriaService: ConvocatoriaService,
    private fundacionService: FundacionService,
    private formBuilder: FormBuilder,
    private mascotaService: MascotasService,
    private authService: AuthUsuariosService
  ) {}

  ngOnInit(): void {
    this.dato = {
      idMunicipio: this.rutaActiva.snapshot.params.parametro,
      nombreMunicipio: this.rutaActiva.snapshot.params.parametro2,
    };
    this.crearFormulario();
    this.identidadUsuario = this.userPlataformaService.getCurrentUser();
    this.identidadAcceso = this.authService.getCurrentUser();
    this.cargarDatosUsuario();
    this.cargarListaDocumentos();
  }

  crearFormulario() {
    this.formRespuesta = this.formBuilder.group({
      comentarios: ["", Validators.required],
      estado: ["", Validators.required],
    });
    this.formFecha = this.formBuilder.group({
      fecha: ["", Validators.required],
      fecha2: ["", Validators.required],
      nit:[""],
    });
  }

  cerrarModal() {
    this.showModal = false;
  }


  cargarListaDocumentos() {
    this.convocatoriaService
      .listarDocumentosByIdMunicipio(this.dato.idMunicipio)
      .subscribe((dataLista) => {
        this.listaDocumentos = dataLista;
      });
      this.convocatoriaService
      .cargarSelectIdentidades(this.dato.idMunicipio)
      .subscribe((dataLista) => {
        this.listaNitRegistrados = dataLista;
      });
  }

  cargarDatosUsuario() {
    this.userPlataformaService
      .getUsuarioIdentidad(this.identidadAcceso)
      .subscribe((data) => {
        this.usuario = data;
        this.idFundacion = this.usuario.idFundacion;
        this.cargarDatosFundacion(this.idFundacion);
      });
  }

  asignarComentario(item) {
    this.archivoSelect = item;
    this.bandera = true;
  }
  editarComentario(item) {
    this.archivoSelect = item;

    this.bandera = true;
    this.formRespuesta.controls["comentarios"].setValue(
      this.archivoSelect.comentario
    );
  }
  cancelarRespuesta() {
    this.bandera = false;
  }

  cargarDatosFundacion(idFundacion: string) {
    this.fundacionService.getFundacionId(idFundacion).subscribe((resul) => {
      this.fundacion = resul;
      this.razonSocial = this.fundacion.razonSocial;
      this.identidadFundacion = this.fundacion.identidad;
      this.municipio = this.fundacion.municipio;
      this.idFundacion = this.fundacion.idFundacion;
    });
  }

  agregarRespuesta() {
    const form = this.formRespuesta.value;
    this.respuestaSolicitud.comentarios = form.comentarios;
    this.respuestaSolicitud.estado = form.estado;
    this.respuestaSolicitud.idSolicitud = this.archivoSelect.idSolicitud;
    this.respuestaSolicitud.usuarioComento = this.identidadAcceso;
    this.convocatoriaService
      .enviarRespuestaSolicitud(this.respuestaSolicitud)
      .subscribe((resp) => {
        this.formRespuesta.reset();
        this.cargarListaDocumentos();
        this.bandera = false;
      });
  }
}
