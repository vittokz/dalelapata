import { environment } from 'src/environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { UserPlataformaService } from '../../../../servicios/userPlataforma/user-plataforma.service';
import { UserPagina } from '../../../../modelos/modulo-usuario/usuarioPagina-modelo';
import { Ciudad } from '../../../../modelos/modulo-ciudades/ciudades-modelo';
import { FundacionService } from '../../../../servicios/fundacion/fundacion.service';
import { Router } from '@angular/router';
import { PdfMakeWrapper, Txt,Img, Table } from 'pdfmake-wrapper';
import { Fundacion } from '../../../../modelos/modulo-fundacion/fundacion-modelo';
import { Mascota, Raza } from '../../../../modelos/modulo-mascota/mascota-modulo';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ExportarService } from '../../../../servicios/exportarExcel/exportar.service';
import { MascotasService } from '../../../../servicios/mascotas/mascotas.service';


@Component({
  selector: 'app-perfil-pag',
  templateUrl: './perfil-pag.component.html',
  styleUrls: ['./perfil-pag.component.css']
})
export class PerfilPagComponent implements OnInit {
  url: string = environment.url+'fundacion/img/';
  logoFundacion: string;
  identidadFundacion: string;
  oculto: Boolean = false;
  dismissible = true;
  dismissibleEditar = true;
  identidadUsuario: string;
  usuario:UserPagina;
  usuarioFundacion: UserPagina[];
  fundacion: Fundacion;
  mascota: Mascota= new Mascota();
  ciudades: Ciudad[];
  mascotasUsuario: Mascota[];
  mascotasAdoptadas: Mascota[];
  public insertado: Number;
  public editado: Number;
  linkPerfil: Boolean=true;
  linkMascota: Boolean=false;
  public idFundacion: string;
  razonSocialFund: string = "";
  public idUsuario: string;
  ciudadesFormulario: Ciudad[];
  razas: Raza;
  public cantidadMascotas: Number;
  envioForm: string="";
  envioFormEditar: string="";
  datosPostulacionMascota:Mascota[];
  datosPostulacionMascotaAdoptadas:Mascota[];
  registro: FormGroup;
  formEditar: FormGroup;
  public isLogueado: Boolean=false;
    alerts:any;
    alertsEditar:any;
    defaultAlerts: any[] = [
    {
      type: 'success',
      msg: 'Se registro correctamente la mascota !!!'
    }
  ];

  defaultAlertsEditar: any[] = [
    {
      type: 'success',
      msg: 'Se modifico Usuario correctamente!!!'
    }
  ];

  constructor(private userPlataformaService: UserPlataformaService,
  private ruta: Router, private fundacionService: FundacionService,
  private formBuild: FormBuilder,private mascotaService: MascotasService,
  private exportExcelService: ExportarService) {
    this.alerts = this.defaultAlerts;
    this.alertsEditar = this.defaultAlertsEditar;
   }

  ngOnInit(): void {
    this.verificarAccesoUsuario();
    this.identidadUsuario = this.userPlataformaService.getCurrentUser();
    this.cargarDatosUsuario();
    this.cargarRazas();
    this.cargarCiudades();
    this.cargarCiudadMascota();
    this.crearFormulario();//formulario mascota
    this.crearFormularioPerfil();//formulario mascota
   }


   cargarRazas(){
    this.mascotaService.getRazaAll().subscribe(
      data=>{
          this.razas = data;
      }
    )
  }

  cargarCiudades(){
    this.mascotaService.getCiudades().subscribe(
      data=>{
          this.ciudadesFormulario = data;
      }
    )
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  onClosedEditar(dismissedAlert: any): void {
    this.alertsEditar = this.alertsEditar.filter(alert => alert !== dismissedAlert);
  }
  verificarAccesoUsuario(): void{
    if(this.userPlataformaService.getCurrentUser() == null){
      this.isLogueado=false;
      this.ruta.navigateByUrl('/loginUser');
     }
   else{
     this.isLogueado=true;
     
    }
  }

  cargarCiudadMascota(){
    this.mascotaService.getCiudades().subscribe(
      data=>{
          this.ciudades = data;
        }
    );
  }

  generarExcel(jsonElmentos: any[],nombreArchivo:string):void{
    this.exportExcelService.exportExcel(jsonElmentos,nombreArchivo);
 }

  cargarDatosUsuario(){
    this.userPlataformaService.getUsuarioIdentidad(this.identidadUsuario).subscribe(
      data=>{
          this.usuario = data;
          this.idFundacion = this.usuario[0].idFundacion;
          this.idUsuario = this.usuario[0].idUsuario;
          this.cargarDatosPerfil(this.usuario);
          this.cargarMascotasPorIdUsuario(this.idUsuario);
          this.buscarIdMascotaPostulacion(this.identidadUsuario);
          this.cargarDatosFundacion(this.idFundacion);
      }
    );
  }

  editarPerfil(){
    const frm = this.formEditar.value;
    this.usuario.idUsuario = frm.idUsuario;
    this.usuario.identidad = frm.identificacion;
    this.usuario.idFundacion = frm.idFundacion;
    this.usuario.tipoDoc = frm.tipoDoc;
    this.usuario.nombres = frm.nombre;
    this.usuario.apellidos = frm.apellido;
    this.usuario.telefono = frm.telefono;
    this.usuario.movil = frm.movil;
    this.usuario.direccion = frm.direccion;
    this.usuario.email = frm.email;
    this.usuario.twitter = frm.twitter;
    this.usuario.facebook= frm.facebook;
    this.usuario.clave= frm.clave;
    this.userPlataformaService.editarUsuario(this.usuario).subscribe(
      data=>{
        this.editado = data.resul;
        if(this.editado > 0){
          this.envioFormEditar="ok";
        
       }
       if(this.editado != 1){
         this.envioFormEditar="error";
      }
      }
    );
  }

  cargarDatosFundacion(idFundacion: string){
    this.fundacionService.getFundacionId(idFundacion).subscribe(
      resul=>{
        this.fundacion = resul;
        this.razonSocialFund = this.fundacion[0].razonSocial;
        this.logoFundacion = this.fundacion[0].logo;
        this.identidadFundacion = this.fundacion[0].identidad;
      }
    )
  }
 //busco concel idUsuario los id MASCOTAS q tiene para devolverlas
  buscarIdMascotaPostulacion(identidad:string){
    //datos mascotas postuladas
    this.mascotaService.getIdMascotaPorIdUsuarioPostulaciones(identidad).subscribe(
      data=>{
          this.datosPostulacionMascota = data;
        }
    );
    //datos mascotas adoptadas
    this.mascotaService.getIdMascotaPorIdUsuarioPostulacionesAdoptadas(identidad).subscribe(
      data=>{
          this.datosPostulacionMascotaAdoptadas = data;
        }
    );
  }      

  cargarMascotasPorIdUsuario(idUsuario:string){
    this.mascotaService.getMascotasPorIdUsuario(idUsuario).subscribe(
      data=>{
          this.mascotasUsuario = data;
          this.cantidadMascotas = this.mascotasUsuario.length;
        }
    );
  }

  activarPerfil(){
    this.linkPerfil=true;
    this.linkMascota = false;
  }

  activarMascota(){
    this.linkPerfil=false;
    this.linkMascota = true;
  }

  crearFormularioPerfil(){
    this.formEditar= this.formBuild.group({
      idUsuario: new FormControl(''),
      identificacion: new FormControl(''),
      idFundacion: new FormControl(''),
      tipoDoc: new FormControl(''),
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      telefono: new FormControl(''),
      movil: new FormControl(''),
      direccion: new FormControl(''),
      email: new FormControl(''),
      twitter: new FormControl(''),
      facebook: new FormControl(''),
      clave: new FormControl('')
    })
  }

  cargarDatosPerfil(user : UserPagina){
    this.formEditar.get('idUsuario').setValue(user[0].idUsuario)
    this.formEditar.get('identificacion').setValue(user[0].identidad)
    this.formEditar.get('idFundacion').setValue(user[0].idFundacion)
    this.formEditar.get('tipoDoc').setValue(user[0].tipoDoc)
    this.formEditar.get('nombre').setValue(user[0].nombres)
    this.formEditar.get('apellido').setValue(user[0].apellidos)
    this.formEditar.get('telefono').setValue(user[0].telefono)
    this.formEditar.get('movil').setValue(user[0].movil)
    this.formEditar.get('direccion').setValue(user[0].direccion)
    this.formEditar.get('email').setValue(user[0].email)
    this.formEditar.get('twitter').setValue(user[0].twitter)
    this.formEditar.get('facebook').setValue(user[0].facebook)
    this.formEditar.get('clave').setValue(user[0].clave)
}

  crearFormulario(){
    this.registro = this.formBuild.group({
      nombre: ['',Validators.required],
      edad: ['',Validators.required],
      raza: ['',Validators.required],
      especie: ['',Validators.required],
      genero: ['',Validators.required],
      tamano: ['',Validators.required],
      peso: ['',Validators.required],
      ciudad: ['', Validators.required],
      estadoMascota: ['',Validators.required],
      color: ['',Validators.required],
      foto: ['',Validators.required],
      descripcion: ['', Validators.required]
    })
  }


  agregarMascota(){

    const frm = this.registro.value;
    this.mascota.numChip = "";
    this.mascota.idUsuario = this.idUsuario;
    this.mascota.idFundacion = "no";
    this.mascota.nombre = frm.nombre;
    this.mascota.edad = frm.edad;
    this.mascota.idRaza = frm.raza;
    this.mascota.idEspecie = frm.especie;
    this.mascota.idGenero = frm.genero;
    this.mascota.tamano = frm.tamano;
    this.mascota.peso = frm.peso;
    this.mascota.ciudad = frm.ciudad;
    this.mascota.estadoMascota = frm.estadoMascota;
    this.mascota.color= frm.color;
    this.mascota.urlFoto= frm.foto;
    this.mascota.descripcion = frm.descripcion;
    this.mascotaService.addMascota(this.mascota).subscribe(
      data=>{
        this.insertado = data.resul;
        if(this.insertado == 1){
          this.envioForm="ok";
          this.mascotasUsuario.unshift(this.mascota);
          this.registro.reset();
       }
       if(this.insertado != 1){
         this.envioForm="error";
      }
      }
    );
    
    
}



  //generar pdf ausuarios
  async generarPdf(){
    const pdf = new PdfMakeWrapper();
    pdf.pageSize('A4');
    pdf.pageMargins([ 40, 60, 40, 60 ]);
    pdf.header('Fundacion maquina de animales y cuidado personal ');
    //pdf.add(await new Img('assets/img/eventosSADS/eventosBanner.jpg').build());
    pdf.add(
      new Txt('Reporte de Usuarios de Fundación').alignment('center').italics().end
    );
     pdf.add(new Table([
      [ 'IDENTIDAD', 'NOMBRE','MOVIL','EMAIL'],
     
      [ 'for(let c of this.usuarioFundacion)', 'column 2']
     ]).widths([ '*', 100 ]).end);
    pdf.footer('Generado por: '+ this.usuario[0].nombres + " " + this.usuario[0].apellidos);
   
    pdf.create().open();
 }
}
