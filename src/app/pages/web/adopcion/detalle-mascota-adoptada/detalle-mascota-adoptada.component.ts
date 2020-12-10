import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MascotasService } from '../../../../servicios/mascotas/mascotas.service';
import { UserPlataformaService } from '../../../../servicios/userPlataforma/user-plataforma.service';
import { Mascota, Raza } from '../../../../modelos/modulo-mascota/mascota-modulo';
import { UserPagina } from '../../../../modelos/modulo-usuario/usuarioPagina-modelo';
import { Ciudad } from '../../../../modelos/modulo-ciudades/ciudades-modelo';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-detalle-mascota-adoptada',
  templateUrl: './detalle-mascota-adoptada.component.html',
  styleUrls: ['./detalle-mascota-adoptada.component.css']
})
export class DetalleMascotaAdoptadaComponent implements OnInit {
  dato: { idMascota: string };
  mascotaSel: Mascota[];  raza : Raza;  usuario: UserPagina; ciudad: Ciudad;
  idRazaBuscar : string; idUsuarioBuscar:string; idCiudadBuscar:string;
  nomRaza:string; nomUsuario:string; emailUsuario:string;
  nomCiudad: string;
  url: string = environment.url;
  constructor(private rutaActiva: ActivatedRoute, private mascotaService: MascotasService,
    private userPlataforma: UserPlataformaService) { }

  ngOnInit(): void {
    
    this.dato = {
      idMascota: this.rutaActiva.snapshot.params.parametro
    };
    
    this.cargarDatosMascota();
  }

  cargarDatosMascota(){
    this.mascotaService.getIdMascota(this.dato.idMascota).subscribe(
      (data)=>{
        this.mascotaSel= data;
         this.idRazaBuscar= this.mascotaSel[0].idRaza;   
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

}
