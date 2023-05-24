import { Component, OnInit } from "@angular/core";
import { Ciudad } from "src/app/modelos/modulo-ciudades/ciudades-modelo";
import { Fundacion } from "src/app/modelos/modulo-fundacion/fundacion-modelo";
import { UserPagina } from "src/app/modelos/modulo-usuario/usuarioPagina-modelo";
import { ConvocatoriaService } from "src/app/servicios/convocatoria/convocatoria.service";
import { ExportarService } from "src/app/servicios/exportarExcel/exportar.service";
import { FundacionService } from "src/app/servicios/fundacion/fundacion.service"
import { MascotasService } from "src/app/servicios/mascotas/mascotas.service";
import { UserPlataformaService } from "src/app/servicios/userPlataforma/user-plataforma.service";
import { AuthUsuariosService } from "src/app/servicios/usuariosAdmin/auth-usuarios.service";
import { VisitasMovilService } from "src/app/servicios/visitas-movil/visitas-movil.service";
import { environment } from "src/environments/environment.prod";
@Component({
  selector: 'app-convocatoria-admin',
  templateUrl: './convocatoria-admin.component.html',
  styleUrls: ['./convocatoria-admin.component.css']
})
export class ConvocatoriaAdminComponent implements OnInit {
  identidadUsuario: string;
  idFundacion: string;
  fundacion: Fundacion;
  public razonSocial: string;
  identidadFundacion: string;
  municipio: string;
  ciudadesFormulario: Ciudad[];
  usuario: UserPagina;
  envioForm: boolean = false;
  cargando: boolean = false;
  listaDocumentos: any[];
  listaDocumentosByNombreMunicipio: any[];
  url: string = environment.url;
  botonEstado: string;
  titleBoton: string ="";

  constructor(
    private userPlataformaService: UserPlataformaService,
    private convocatoriaService: ConvocatoriaService,
    private fundacionService: FundacionService,
    private mascotaService: MascotasService,
    private exportExcelService: ExportarService,
  ) {}

  ngOnInit(): void {
    this.identidadUsuario = this.userPlataformaService.getCurrentUser();
    this.cargarDatosUsuario();
    this.cargarCiudades();
    this.cargarListaDocumentos();
  }

  cargarListaDocumentos() {
    this.convocatoriaService.listarDocumentosTodos().subscribe((dataLista) => {
      this.listaDocumentos = dataLista;
      console.log(this.listaDocumentos);
    });
    this.convocatoriaService
      .listarDocumentosTodosByNombreMunicipio()
      .subscribe((dataLista) => {
        this.listaDocumentosByNombreMunicipio = dataLista;
        console.log(this.listaDocumentosByNombreMunicipio);
      });
  }

 

  cargarCiudades() {
    this.mascotaService.getCiudades().subscribe((data) => {
      this.ciudadesFormulario = data;
      console.log(this.ciudadesFormulario);
    });
  }

  

  cargarDatosUsuario() {
    this.userPlataformaService
      .getUsuarioIdentidad(this.identidadUsuario)
      .subscribe((data) => {
        this.usuario = data;
        this.idFundacion = this.usuario.idFundacion;
        this.cargarDatosFundacion(this.idFundacion);
      });
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

  generarExcel(jsonElmentos: any[], nombreArchivo: string): void {
    this.exportExcelService.exportExcel(jsonElmentos, nombreArchivo);
  }
}