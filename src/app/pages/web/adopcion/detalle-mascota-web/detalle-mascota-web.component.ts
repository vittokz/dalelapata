import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from './../../../../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Mascota, Raza } from '../../../../modelos/modulo-mascota/mascota-modulo';
import { MascotasService } from '../../../../servicios/mascotas/mascotas.service';
import { ActivatedRoute, Params} from '@angular/router';
import { UserPagina } from '../../../../modelos/modulo-usuario/usuarioPagina-modelo';
import { UserPlataformaService } from '../../../../servicios/userPlataforma/user-plataforma.service';
import { Ciudad } from '../../../../modelos/modulo-ciudades/ciudades-modelo';
import { AdopcionService } from '../../../../servicios/adopcion/adopcion.service';

@Component({
  selector: 'app-detalle-mascota-web',
  templateUrl: './detalle-mascota-web.component.html',
  styleUrls: ['./detalle-mascota-web.component.css']
})
export class DetalleMascotaWebComponent implements OnInit {
  [x: string]: any;
  url:string = environment.url;
  dato: { idMascota: string };
  mascotaSel: Mascota[];  raza : Raza; ciudad: Ciudad;
  idRazaBuscar : string; idUsuarioBuscar:string; idCiudadBuscar:string;
  nomRaza:string; nomUsuario:string; emailUsuario:string;
  nomCiudad: string;
  adoptame: Boolean=false;
  numRegistros:number=0;
  registroAdopcion: string;
  proceso: string = "";
  showModal: Boolean=false;
  habilitado: Boolean=false;
  envioForm: string;
  usuario: UserPagina; 
  isNuevo:Boolean=false;
  identUsuCreado: string;
  //
  nombreMascotaSel: string;
  formValidar: FormGroup;
  formAceptar:FormGroup;
  usuarioBuscado: UserPagina = new UserPagina();
  usuarioCreado: UserPagina;
  idUsuarioPostulado:string;
  idFundacionPostulado: string;
  usuarioLogueado:UserPagina;//datos usuario logueado
  identidadLogueado: string; //variable q guarda el nombre de usuario del logueado
  urlFacebook: string = "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdalelapata.narino.gov.co%2F%23%2FdetalleMascotaWeb%2F";
  urlFacebook2 : string = "&amp;src=sdkpreparse";
  urlFacebookTitle : string ="https://dalelapata.narino.gov.co/#/detalleMascotaWeb/";
  constructor(private rutaActiva: ActivatedRoute, private mascotaService: MascotasService,
    private userPlataforma: UserPlataformaService,private adopcionService: AdopcionService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.crearFormularioValidar();
    this.registroAdopcion="";
   
    this.dato = {
      idMascota: this.rutaActiva.snapshot.params.parametro
    };
    this.urlFacebook = this.urlFacebook + this.dato.idMascota + this.urlFacebook2;
    this.urlFacebookTitle = this.urlFacebookTitle + this.dato.idMascota;
    this.identidadLogueado = this.userPlataforma.getCurrentUser();
    if(this.identidadLogueado==null){
      this.registroAdopcion="vacio";
    }
    this.cargarDatosMascota();
    this.cargarDatosUsuarioLogueado();
  }

  cargarDatosUsuarioLogueado(){
    this.userPlataforma.getUsuarioIdentidad(this.identidadLogueado).subscribe(
      (data)=>{
         this.usuarioLogueado = data;
      }
    )
  }

  cargarDatosMascota(){
    this.mascotaService.getIdMascota(this.dato.idMascota).subscribe(
      (data)=>{
        this.mascotaSel= data;
         this.idRazaBuscar= this.mascotaSel[0].idRaza;   
         this.proceso= this.mascotaSel[0].estadoMascota; //verifico q tipo de mascota es adoptada, extraviada etc   
         this.idUsuarioBuscar= this.mascotaSel[0].idUsuario; 
         this.idCiudadBuscar= this.mascotaSel[0].ciudad;
         //traer nombre de la raza 
         this.mascotaService.getRazaId(this.idRazaBuscar).subscribe(
             (dataRaza)=>{
               this.raza = dataRaza;
               this.nomRaza= this.raza[0].nombre;
              }
           );
         
           //traer nombre usuario que registro
         this.userPlataforma.getUsuarioId(this.idUsuarioBuscar).subscribe(
          (dataUsuario)=>{
            this.usuario = dataUsuario;
            this.nomUsuario = this.usuario[0].nombres+ " " + this.usuario[0].apellidos;
            this.emailUsuario = this.usuario[0].email;
          }
        ); 
        
        //traer nombre ciudad de la mascota
        this.mascotaService.getCiudadId(this.idCiudadBuscar).subscribe(
          (dataCiudad)=>{
            this.ciudad = dataCiudad;
            this.nomCiudad = this.ciudad[0].nombre;
           }
        );  
      }
    );
    }

    irAdoptame(mascotaSelec: Mascota){
       this.nombreMascotaSel = mascotaSelec.nombre;
       this.showModal=true;
    }

    crearFormularioValidar(){
      this.formValidar = this.formBuilder.group(
        {
           cedula: ['', Validators.required]
        }
      );

      this.formAceptar = this.formBuilder.group(
        {
           nombres: ['', Validators.required],
           apellidos: ['', Validators.required],
           movil: ['', Validators.required],
           direccion: ['', Validators.required],
           email: ['', Validators.required]
        }
      );
    }

    buscarIdentidad(){
     
      const frm = this.formValidar.value;
      this.identUsuCreado = frm.cedula;
      this.userPlataforma.getUsuarioIdentidad(frm.cedula).subscribe(
        data=>{
         if(data["resul"]==0){
            this.habilitado = true;
            this.isNuevo=true;
            this.formAceptar.reset();
          }
         else{
           this.usuarioBuscado = data;     
           this.habilitado=true;  
           this.idUsuarioPostulado = this.usuarioBuscado[0].idUsuario;
           this.idFundacionPostulado = this.usuarioBuscado[0].idFundacion;
           this.formAceptar.get('nombres').setValue(this.usuarioBuscado[0].nombres);
           this.formAceptar.get('apellidos').setValue(this.usuarioBuscado[0].apellidos);
           this.formAceptar.get('movil').setValue(this.usuarioBuscado[0].movil);
           this.formAceptar.get('direccion').setValue(this.usuarioBuscado[0].direccion);  
           this.formAceptar.get('email').setValue(this.usuarioBuscado[0].email); 
           this.habilitado = true;
           this.isNuevo=false;
         }
        }
      );
    }

    limpiar(){
      this.formAceptar.reset();
      this.formValidar.reset();
    }

    buscarUsuario(event){
      let txtBuscar = event;
       this.usuariosEncontrado= this.usuariosTodos.filter(xUsuario=>{
          return xUsuario.identidad.toLocaleUpperCase().includes(txtBuscar.toLocaleUpperCase());
       })
       this.numRegistros= this.usuariosEncontrado.length;
  
    }

    cancelar(){
      this.adoptame= false;
    }

    agregarPostulacion(identidadUsuCreado: string, idMascota: string){
      this.adopcionService.addPostulaciones(identidadUsuCreado,idMascota).subscribe(
        data=>{
          console.log("adop:" + data["resul"]);
           if(data["resul"]=="ok" || data["resul"]==""){
              this.registroAdopcion="ok";
              this.formValidar.reset();
              }
            else{
              this.registroAdopcion="error";
             }
        }
      );
    }

    aceptarNuevaPostulacion(){
     
      if(!this.isNuevo){
         this.agregarPostulacion(this.identUsuCreado,this.dato.idMascota);
      }
      else {
        console.log("entro a nuevo id");
        const frm = this.formAceptar.value;
        const frmValidar = this.formValidar.value; 
        this.usuario.idUsuario = this.idUsuarioPostulado;
        this.usuario.idFundacion = 'no';
        this.usuario.tipoDoc = 'CC';
        this.usuario.identidad = frmValidar.cedula;
        this.usuario.nombres = frm.nombres;
        this.usuario.apellidos = frm.apellidos;
        this.usuario.direccion = frm.direccion;
        this.usuario.telefono = frm.movil;
        this.usuario.movil = frm.movil;
        this.usuario.email = frm.email;
        this.usuario.clave = frmValidar.cedula;
           this.userPlataforma.agregarUsuarioyPostulacion(this.usuario, this.dato.idMascota).subscribe(
          data=>{
             if(data["resul"]=="1"){
              this.envioForm="ok";
              this.registroAdopcion="ok";
            }
            if(data["resul"]=="-1"){
              this.envioForm="ok"
              this.registroAdopcion="error";;
            }
            if(data["resul"]=="0"){
              this.envioForm="error";
            }
          }
        );
      }
    }

    cerrarModal(){
      this.showModal=false;
      this.formAceptar.reset();
      this.formValidar.reset();
      this.habilitado=false;
      this.registroAdopcion="";
      this.envioForm="";
    }

}
