import { environment } from 'src/environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MascotasService } from '../../../../servicios/mascotas/mascotas.service';
import { UserPlataformaService } from '../../../../servicios/userPlataforma/user-plataforma.service';
import { Mascota, Raza } from '../../../../modelos/modulo-mascota/mascota-modulo';
import { UserPagina } from '../../../../modelos/modulo-usuario/usuarioPagina-modelo';
import { Ciudad } from '../../../../modelos/modulo-ciudades/ciudades-modelo';
import { LogroService } from '../../../../servicios/logros/logro.service';
import { Logros } from '../../../../modelos/modulo-logros/logros-modelo';

@Component({
  selector: 'app-perfil-mascota',
  templateUrl: './perfil-mascota.component.html',
  styleUrls: ['./perfil-mascota.component.css']
})
export class PerfilMascotaComponent implements OnInit {
  mascotaSel: Mascota[];  raza : Raza;  
  url: string = environment.url;
  usuario: any; 
  ciudad: Ciudad;
  adoptador: UserPagina;
  listaLogros: Logros[];
  idRazaBuscar : string; idMascotaBuscar:string; idCiudadBuscar:string;
  nomRaza:string; idUsuarioAdoptador:string; urlMascota:string;
  nomCiudad: string;
  nomAdoptador: string;

  dato : {
    idMascota: string
  };
  constructor(private rutaActiva: ActivatedRoute,private mascotaService: MascotasService,
    private userPlataforma: UserPlataformaService, private logroService: LogroService) { }

  ngOnInit(): void {
    this.dato = {
      idMascota: this.rutaActiva.snapshot.params.parametro
    };
    this.cargarDatosMascota();
    this.cargarLogrosMascota();
  }

  cargarLogrosMascota(){
    this.logroService.getLogrosIdMascota(this.dato.idMascota).subscribe(
      data=>{
         this.listaLogros=data;
      }
    )
  }

  cargarDatosMascota(){
    this.mascotaService.getIdMascota(this.dato.idMascota).subscribe(
      (data)=>{
        this.mascotaSel= data;
         this.urlMascota = this.mascotaSel[0].urlFoto;
         this.idRazaBuscar= this.mascotaSel[0].idRaza;   
         this.idMascotaBuscar= this.mascotaSel[0].idMascota; 
         this.idCiudadBuscar= this.mascotaSel[0].ciudad;
         //traer nombre de la raza 
         this.mascotaService.getRazaId(this.idRazaBuscar).subscribe(
             (dataRaza)=>{
               this.raza = dataRaza;
               this.nomRaza= this.raza[0].nombre;
              }
           );
           //traer idUsuario del usuario que adopto en postulaciones
         this.mascotaService.getUsuarioPorIdMascota(this.idMascotaBuscar).subscribe(
          (dataUsuario)=>{
            this.usuario = dataUsuario;
            this.nomAdoptador = this.usuario[0].nombres + " " + this.usuario[0].apellidos;
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

}
