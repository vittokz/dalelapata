import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fundacion } from 'src/app/modelos/modulo-fundacion/fundacion-modelo';
import { UserPagina } from 'src/app/modelos/modulo-usuario/usuarioPagina-modelo';
import { ConvocatoriaService } from 'src/app/servicios/convocatoria/convocatoria.service';
import { FundacionService } from 'src/app/servicios/fundacion/fundacion.service';
import { UserPlataformaService } from 'src/app/servicios/userPlataforma/user-plataforma.service';
import { AuthUsuariosService } from 'src/app/servicios/usuariosAdmin/auth-usuarios.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-convocatoria',
  templateUrl: './convocatoria.component.html',
  styleUrls: ['./convocatoria.component.css']
})
export class ConvocatoriaComponent implements OnInit {
  formulario: FormGroup;
  cargando: boolean = false;
  public razonSocial: string;
  envioForm: boolean = false;
  identidadFundacion: string;
  municipio: string;
  tipoArchivo: string;
  usuario: UserPagina;
  identidadUsuario: string;
  listaDocumentos: any[];
  url: string = environment.url;
  idFundacion: string;
  fundacion: Fundacion;
  constructor(
    private authService: AuthUsuariosService,
    private convocatoriaService: ConvocatoriaService,
    private fundacionService: FundacionService,
    private userPlataformaService: UserPlataformaService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.identidadUsuario = this.userPlataformaService.getCurrentUser();
    this.cargarDatosUsuario();
    this.cargarListaDocumentos();
  }

  cargarListaDocumentos() {
    this.convocatoriaService
      .listarDocumentosByIdentidad(this.identidadUsuario)
      .subscribe((dataLista) => {
        this.listaDocumentos = dataLista;
      });
  }

  crearFormulario() {
    this.formulario = this.formBuilder.group({
      tipoArchivo: ["", Validators.required],
      file1: ["", Validators.required],
    });
  }

  cargarDatosUsuario() {
    this.userPlataformaService
      .getUsuarioIdentidad(this.identidadUsuario)
      .subscribe((data) => {
        this.usuario = data;
        this.idFundacion = this.usuario[0].idFundacion;
        this.cargarDatosFundacion(this.idFundacion);
      });
  }

  
  cargarDatosFundacion(idFundacion: string) {
    this.fundacionService.getFundacionId(idFundacion).subscribe((resul) => {
      this.fundacion = resul;
      this.razonSocial = this.fundacion[0].razonSocial;
      this.identidadFundacion = this.fundacion[0].identidad;
      this.municipio = this.fundacion[0].municipio;
      this.idFundacion = this.fundacion[0].idFundacion;
    });
  }
  
  onFileSelect(event) {
    const file = event.target.files[0];
    this.formulario.get("file1").setValue(file);
  }
  selectArchivo(event) {
    this.tipoArchivo = event.target.value;
  }

  subirArchivos() {
    const formData = new FormData();
    formData.append("file1", this.formulario.get("file1").value);
    formData.append("tipoArchivo", this.tipoArchivo);
    formData.append("idMunicipio", this.municipio);
    formData.append("usuarioRegistro", this.identidadFundacion);
    this.cargando = true;

    this.convocatoriaService.cargarDocumentos(formData).subscribe(
      (res) => {
      //  this.cargarListaDocumentos();
        this.envioForm = true;
        this.cargando = false;
        this.formulario.reset();
        setTimeout(() => {
          this.envioForm = false;
        }, 2000);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
