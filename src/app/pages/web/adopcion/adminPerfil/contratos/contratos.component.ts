import { Component, OnInit } from '@angular/core';
import { UserPagina } from '../../../../../modelos/modulo-usuario/usuarioPagina-modelo';
import { Fundacion } from '../../../../../modelos/modulo-fundacion/fundacion-modelo';
import { FundacionService } from '../../../../../servicios/fundacion/fundacion.service';
import { UserPlataformaService } from '../../../../../servicios/userPlataforma/user-plataforma.service';
import { AdopcionService } from '../../../../../servicios/adopcion/adopcion.service';
import { Mascota } from '../../../../../modelos/modulo-mascota/mascota-modulo';
import * as htmlDocx from 'html-docx-js/dist/html-docx';
import { saveAs } from 'file-saver';
import { MascotasService } from '../../../../../servicios/mascotas/mascotas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {
  identidadUsuario: string;
  contrato :string;
  url:string = environment.url;
  cargando: string;
  usuario:UserPagina;
  contratos:Boolean=false;
  contenidoContrado: any[];
  mascotasContratos: Mascota[];
  usuarioBuscado: UserPagina[];
  listaUsuarios: UserPagina[];
  idFundacion: string;
  fundacion: Fundacion;
  public razonSocial: string;
  identidadFundacion: string;
  logoFundacion: string;
  showModal: Boolean=false;
  showModal2: Boolean=false;
  idenUsuarioSelec: string;
  nombreUsuarioSelec: string;
  formSubir: FormGroup;
  listaContratos:any[];
  listContratos : any[];
  
  constructor(private userPlataformaService: UserPlataformaService, private adopcionService: AdopcionService,
    private fundacionService: FundacionService, private mascotaService: MascotasService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.identidadUsuario = this.userPlataformaService.getCurrentUser();
    this.cargarDatosUsuario();
    
  }

  crearFormulario(){
    this.formSubir = this.formBuilder.group({
       avatar: ['']
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formSubir.get('avatar').setValue(file);
    }
  }

  subirContrato(){
    const formData = new FormData();
    formData.append('idenUsuario', this.idenUsuarioSelec);
    formData.append('avatar', this.formSubir.get('avatar').value);
    this.cargando = "ok";
    this.adopcionService.subirContratoAdopcion(formData).subscribe(
       data=>{
          if(data['resul'] > 0){
              this.contrato = "ok";
              this.cargando="";
          }
          else{
              this.contrato = "error";
          }
       }
       
    );
  }


  cerrarModal2(){
    this.showModal=false;
  }

  cerrarModal(){
    this.showModal2=false;
  }

  cargarDatosUsuario(){
    this.userPlataformaService.getUsuarioIdentidad(this.identidadUsuario).subscribe(
      data=>{
          this.usuario = data;
          this.idFundacion = this.usuario[0].idFundacion;
          this.cargarDatosFundacion(this.idFundacion);
          this.cargarContratos(this.idFundacion);
          this.cargarUsuariosPagina();
      }
    );
  }

  cargarUsuariosPagina(){
    this.adopcionService.getIdUsuariosPostuladosPorIdFundacion(this.idFundacion).subscribe(
      data=>{
        this.listaUsuarios = data;
      }
    )
  }

  cargarDatosFundacion(idFundacion: string){
    this.fundacionService.getFundacionId(idFundacion).subscribe(
      resul=>{
        this.fundacion = resul;
        this.razonSocial = this.fundacion[0].razonSocial;
        this.identidadFundacion = this.fundacion[0].identidad;
        this.logoFundacion = this.fundacion[0].logo;
       }
    )
  }

  cargarContratos(idFundacion: string){
    this.adopcionService.listarContratosPorFundacion(idFundacion).subscribe(
      data => {
         this.listContratos = data;
      }
    );
  }

   buscarContrato(event){
    let identidadBuscada = event;
    if(identidadBuscada==""){
      this.usuarioBuscado = null;
    }
    else{
     this.usuarioBuscado= this.listaUsuarios.filter(xUsuario=>{
        return xUsuario.identidad.toLocaleUpperCase().includes(identidadBuscada.toLocaleUpperCase());
     })
    }    
  }

  habilitarContratos(usuarioSelec: UserPagina){
      this.contratos=true;
      this.idenUsuarioSelec = usuarioSelec.identidad;
      this.nombreUsuarioSelec = usuarioSelec.nombres + " " + usuarioSelec.apellidos;
      this.adopcionService.getMascotasPostulacionesPorIdUsuario(usuarioSelec.idUsuario).subscribe(
        data=>{
             this.mascotasContratos = data;
          }
      );
  }

  habilitarSubir(usuarioSelec: UserPagina){
   this.showModal = true;
    this.idenUsuarioSelec = usuarioSelec.identidad;
    this.nombreUsuarioSelec = usuarioSelec.nombres + " " + usuarioSelec.apellidos;
    this.adopcionService.getMascotasPostulacionesPorIdUsuario(usuarioSelec.idUsuario).subscribe(
      data=>{
           this.mascotasContratos = data;
        }
    );
  }

  habilitarContratosSubidos(usuarioSelec: UserPagina){
    this.showModal2 = true;
    this.idenUsuarioSelec = usuarioSelec.identidad;
    this.nombreUsuarioSelec = usuarioSelec.nombres + " " + usuarioSelec.apellidos;
    this.adopcionService.listarContratosAdopcion(usuarioSelec.identidad).subscribe(
      data=>{
           this.listaContratos = data;
         }
    );
  }
  
  generarContrato(mascota: Mascota){
     this.mascotaService.getContenidoContrato().subscribe(
       data=>{
          this.contenidoContrado = data;
        }
     )
     let content ="<h3><center>CONTRATO LEGAL DE ADOPCIÓN DE UN ANIMAL DE COMPAÑÍA</center></h3><center>";
     content = content + "<span style='font-size:12px; font-weight:800'>"+ this.razonSocial.toUpperCase() + "</span><br>";
     content = content + "<span style='font-size:12px; font-weight:800'>"+ this.identidadFundacion + "</span></center><br>";
     content = content + "<img src='"+ this.logoFundacion + "'><br>";
     content = content + this.contenidoContrado[0].contenido;
     let htmlDocumennt = '<!DOCTYPE html><html><head><meta charset="utf-8"><title></title>';
     htmlDocumennt = htmlDocumennt + '</head><body>' + content + '</body></html>';
     const converted = htmlDocx.asBlob(htmlDocumennt);
     saveAs(converted,"contrato.docx");
  }
}
