import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fundacion } from 'src/app/modelos/modulo-fundacion/fundacion-modelo';
import { UserPagina } from 'src/app/modelos/modulo-usuario/usuarioPagina-modelo';
import { FundacionService } from 'src/app/servicios/fundacion/fundacion.service';
import { UserPlataformaService } from 'src/app/servicios/userPlataforma/user-plataforma.service';
import { VisitasMovilService } from 'src/app/servicios/visitas-movil/visitas-movil.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-unidad-movil-municipios',
  templateUrl: './unidad-movil-municipios.component.html',
  styleUrls: ['./unidad-movil-municipios.component.css']
})
export class UnidadMovilMunicipiosComponent implements OnInit {
  identidadUsuario: string;
  idFundacion: string;
  fundacion: Fundacion;
  public razonSocial: string;
  identidadFundacion: string;
  municipio: string;
  usuario:UserPagina;
  tipoArchivo:string;
  formulario: FormGroup;
  envioForm:boolean=false;
  cargando:boolean=false;
  listaDocumentos: any[];
  url: string = environment.url;

  constructor(private userPlataformaService: UserPlataformaService,private fundacionService: FundacionService,
    private formBuilder: FormBuilder,private visitaService: VisitasMovilService) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.identidadUsuario = this.userPlataformaService.getCurrentUser();
    this.cargarDatosUsuario();
    this.cargarListaDocumentos();
  }
  cargarListaDocumentos() {
     this.visitaService.listarDocumentosByIdentidad(this.identidadUsuario).subscribe(
       (dataLista)=>{
         this.listaDocumentos = dataLista;
         console.log(this.listaDocumentos);
       }
     );
  }

  crearFormulario(){
    this.formulario = this.formBuilder.group({
           tipoArchivo: ['', Validators.required],
           file1: ['', Validators.required]
    });
  }

  onFileSelect(event) {
   
      const file = event.target.files[0];
      this.formulario.get('file1').setValue(file);
    
  }
  selectArchivo(event) {
    this.tipoArchivo = event.target.value;
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

  subirArchivos() {
    const formData = new FormData();
    formData.append('file1', this.formulario.get('file1').value);
    formData.append('tipoArchivo', this.tipoArchivo);
    formData.append('idMunicipio', this.municipio);
    formData.append('usuarioRegistro', this.identidadFundacion);
    this.cargando = true;
    
     this.visitaService.cargarDocumentos(formData).subscribe(
      (res) => {
        this.cargarListaDocumentos();
        this.envioForm=true;
        this.cargando = false;
        this.formulario.reset();
        setTimeout(() => {
          this.envioForm=false;
        }, 2000);
      },
      (err) => {  
        console.log(err);
      }
    ); 
  }

}
