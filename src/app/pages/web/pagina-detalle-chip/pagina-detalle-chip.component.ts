import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { MascotasService } from '../../../servicios/mascotas/mascotas.service';
import { Mascota, Raza } from '../../../modelos/modulo-mascota/mascota-modulo';
import { UserPagina } from '../../../modelos/modulo-usuario/usuarioPagina-modelo';
import { UserPlataformaService } from '../../../servicios/userPlataforma/user-plataforma.service';
import { Ciudad } from '../../../modelos/modulo-ciudades/ciudades-modelo';
import { AdopcionService } from '../../../servicios/adopcion/adopcion.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-pagina-detalle-chip',
  templateUrl: './pagina-detalle-chip.component.html',
  styleUrls: ['./pagina-detalle-chip.component.css']
})
export class PaginaDetalleChipComponent implements OnInit {
  datoChip: { idchip: string };
  url:string = environment.url;
  mascotaSel: Mascota;  raza : Raza;  usuario: UserPagina; ciudad: Ciudad;
  usuariosTodos:UserPagina[];
  proceso: string = "";
  showModal: Boolean=false;
  usuariosEncontrado:UserPagina[]; // almacena datos de usuario q se postula
  adoptame: Boolean=false;
  idRazaBuscar : string; idUsuarioBuscar:string; idCiudadBuscar:string;
  nomRaza:string; nomUsuario:string; emailUsuario:string;
  nomCiudad: string;
  registroAdopcion: string;

  
  usuarioLogueado:UserPagina;//datos usuario logueado
  identidadLogueado: string; //variable q guarda el nombre de usuario del logueado

  constructor(private rutaActiva: ActivatedRoute, private mascotaService: MascotasService,
    private userPlataforma: UserPlataformaService,private adopcionService: AdopcionService) { }

  ngOnInit(): void {
    this.registroAdopcion="";
    this.datoChip = {
      idchip: this.rutaActiva.snapshot.params.parametro
    }
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
    this.mascotaService.getMascotasIdChip(this.datoChip.idchip).subscribe(
      (data)=>{
        this.mascotaSel= data;
        this.idRazaBuscar= this.mascotaSel[0].idRaza;   
        this.idUsuarioBuscar= this.mascotaSel[0].idUsuario; 
        this.proceso= this.mascotaSel[0].estadoMascota; //verifico q tipo de mascota es adoptada, extraviada etc   
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

    irAdoptame(){
      this.adoptame=true;
   }
  
    buscarUsuario(event){
      let txtBuscar = event;
       this.usuariosEncontrado= this.usuariosTodos.filter(xUsuario=>{
          return xUsuario.identidad.toLocaleUpperCase().includes(txtBuscar.toLocaleUpperCase());
       })
       console.log(this.usuariosEncontrado.length);  
    }
  
    cancelar(){
      this.adoptame= false;
    }

    confirmarPostulacion(idUsuario:string, idMascota:string){
      this.adopcionService.addPostulaciones(idUsuario,idMascota).subscribe(
        data=>{
           if(data=="ok" || data==""){
              this.registroAdopcion="ok";
              }
            else{
              this.registroAdopcion="error";
            }
        }
      );
    }

}
