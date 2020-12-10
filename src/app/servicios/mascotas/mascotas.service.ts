import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mascota, Raza } from '../../modelos/modulo-mascota/mascota-modulo';
import { environment } from '../../../environments/environment';
import { Ciudad } from '../../modelos/modulo-ciudades/ciudades-modelo';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {
  url:string = environment.url + "mascotas/";
   constructor(private http: HttpClient) { }
   //metodos postulaciones
   getUsuarioAdoptadorPorIdMascota(idMascota:string):Observable<any[]>{
      return this.http.get<any[]>(this.url + 'getPostulaciones_datosUsuarioAdoptador.php?idMascota='+ idMascota);
     }

   public uploadFile(data) {
    
      let uploadURL = this.url+ "addMascota.php";
      return this.http.post<any>(uploadURL, data);
    }
   
   //eliminar mascota
   eliminarMascota(idMascota: string){
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
    options 	: any		= {
        "idMascota" : idMascota, 
    };    
      return  this.http.post(this.url + "eliminarMascota.php", JSON.stringify(options), headers);
   }
   
   //traer idUsuario mediante el idMascota
   getUsuarioPorIdMascota(idMascota:string):Observable<any[]>{
      return this.http.get<any[]>(this.url + 'getIdUsuarioPorIdMascota.php?idMascota='+ idMascota);
     }
   //recoger idMascota mediante idUsuario en postulaciones
   getIdMascotaPorIdUsuarioPostulaciones(identidad: string):Observable<any>{
      return this.http.get<any>(this.url + 'getIdMascotaPorIdUsuarioPostulaciones.php?identidad=' + identidad);
   }

   //recoger idMascota mediante idUsuario en postulaciones
   getIdMascotaPorIdUsuarioPostulacionesAdoptadas(identidad: string):Observable<any>{
      return this.http.get<any>(this.url + 'getIdMascotaPorIdUsuarioPostulacionesAdoptadas.php?identidad=' + identidad);
   }
   //traer depostulaciones las mascotas q tienen el id de l Fundacion




 //----------------------------
  

   getMascotas():Observable<Mascota[]>{
    return this.http.get<Mascota[]>(this.url + 'getMascotas.php');
   }

   getMascotasChip():Observable<Mascota[]>{
      return this.http.get<Mascota[]>(this.url + 'getMascotasChip.php');
     }
    //traer mascotass por tipo

    getMascotasPorAdoptarTipo(tipo:string, municipio:string):Observable<Mascota[]>{
      return this.http.get<Mascota[]>(this.url + 'getMascotasPorAdoptarTipo.php?tipo=' + tipo + "&municipio=" + municipio);
     }
     getMascotasAdoptadasTipo(tipo:string, municipio:string):Observable<Mascota[]>{
      return this.http.get<Mascota[]>(this.url + 'getMascotasAdoptadasTipo.php?tipo=' + tipo + "&municipio=" + municipio);
     }
     getMascotasExtraviadasTipo(tipo:string, municipio:string):Observable<Mascota[]>{
      return this.http.get<Mascota[]>(this.url + 'getMascotasExtraviadasTipo.php?tipo=' + tipo + "&municipio=" + municipio);
     }
     getMascotasEncontradasTipo(tipo:string, municipio:string):Observable<Mascota[]>{
      return this.http.get<Mascota[]>(this.url + 'getMascotasEncontradasTipo.php?tipo=' + tipo + "&municipio=" + municipio);
     }
     getMascotasEsterilizadasTipo(tipo:string, municipio:string):Observable<Mascota[]>{
      return this.http.get<Mascota[]>(this.url + 'getMascotasEsterilizadasTipo.php?tipo=' + tipo + "&municipio=" + municipio);
     }
    //fin mascotas por tipo

   //traer mascotas por adoptar
   getMascotasPorAdoptar():Observable<Mascota[]>{
      return this.http.get<Mascota[]>(this.url + 'getMascotasPorAdoptar.php');
     }
     
   //traer mascotas adoptadas
   getMascotasAdoptadas():Observable<Mascota[]>{
      return this.http.get<Mascota[]>(this.url + 'getMascotasAdoptadas.php');
     }
     
   //traer mascotas extraviadas
   getMascotasExtraviadas():Observable<Mascota[]>{
      return this.http.get<Mascota[]>(this.url + 'getMascotasExtraviadas.php');
     }
   
   //traer mascotas encontradas
   getMascotasEncontradas():Observable<Mascota[]>{
      return this.http.get<Mascota[]>(this.url + 'getMascotasEncontradas.php');
     }

    //traer mascotas encontradas
   getMascotasEsterilizadas():Observable<Mascota[]>{
      return this.http.get<Mascota[]>(this.url + 'getMascotasEsterilizadas.php');
     }
   getMascotasMinimo():Observable<Mascota[]>{
    return this.http.get<Mascota[]>(this.url + 'getMascotasMinimo.php');
   }
   
   getMascotasPorFundacion(idFundacion:string):Observable<Mascota[]>{
      return this.http.get<Mascota[]>(this.url + 'getMascotasPorFundacion.php?idFundacion='+ idFundacion);
     }

     getMascotasPorFundacionChip(idFundacion:string):Observable<Mascota[]>{
      return this.http.get<Mascota[]>(this.url + 'getMascotasPorFundacionChip.php?idFundacion='+ idFundacion);
     }

     getMascotasPorFundacionAdoptadas(idFundacion:string):Observable<Mascota[]>{
      return this.http.get<Mascota[]>(this.url + 'getMascotasPorFundacionAdoptadas.php?idFundacion='+ idFundacion);
     }
     getMascotasPorFundacionPorAdoptadar(idFundacion:string):Observable<Mascota[]>{
      return this.http.get<Mascota[]>(this.url + 'getMascotasPorFundacionPorAdoptadar.php?idFundacion='+ idFundacion);
     }
     getMascotasPorFundacionEncontradas(idFundacion:string):Observable<Mascota[]>{
      return this.http.get<Mascota[]>(this.url + 'getMascotasPorFundacionEncontradas.php?idFundacion='+ idFundacion);
     }
     getMascotasPorFundacionExtraviadas(idFundacion:string):Observable<Mascota[]>{
      return this.http.get<Mascota[]>(this.url + 'getMascotasPorFundacionExtraviadas.php?idFundacion='+ idFundacion);
     }
   
     getMascotasPorIdUsuario(idUsuario:string):Observable<Mascota[]>{
      return this.http.get<Mascota[]>(this.url + 'getMascotasPorIdUsuario.php?idUsuario='+ idUsuario);
     }
   //recoger datos mascota por chip
   getMascotasIdChip(idChip: string):Observable<Mascota>{
      return this.http.get<Mascota>(this.url + 'getMascotasIdChip.php?numChip=' + idChip);
   }
   //get razas por id
   getRazaId(idRaza: string):Observable<Raza>{
      return this.http.get<Raza>(this.url + 'getRazaId.php?idRaza=' + idRaza);
   }
   //get razas all
   getRazaAll():Observable<Raza>{
      return this.http.get<Raza>(this.url + 'getRazaAll.php');
   }

   //get por idMascota
   getIdMascota(idMascota: string):Observable<Mascota[]>{
      return this.http.get<Mascota[]>(this.url + 'getIdMascota.php?idMascota=' + idMascota);
   }

   //--------get ciudades 
   getCiudadId(idCiudad: string):Observable<Ciudad>{
      return this.http.get<Ciudad>(this.url + 'getCiudadId.php?idCiudad=' + idCiudad);
   }  
   getCiudades():Observable<Ciudad[]>{
      return this.http.get<Ciudad[]>(this.url + 'getCiudades.php');
   }
   
   //adicionar mascota
   addMascota(mascota:Mascota): Observable<any>
  {
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
    options 	: any		= {
        "key" : "create",
         "idUsuario" : mascota.idUsuario,
         "idFundacion" : mascota.idFundacion,
         "nombre" : mascota.nombre,
         "edad" : mascota.edad,
         "idRaza": mascota.idRaza,
         "idEspecie": mascota.idEspecie,
         "idGenero": mascota.idGenero,
         "tamano": mascota.tamano,
         "peso": mascota.peso,
         "ciudad": mascota.ciudad,
         "estadoMascota": mascota.estadoMascota,
         "color": mascota.color,
         "foto": mascota.urlFoto,
         "descripcion": mascota.descripcion   
   };    
      return  this.http.post(this.url + "addMascota.php", JSON.stringify(options), headers);
   }

   //registrar mascota desde administracion
   addMascotaAdmin(mascota:Mascota): Observable<any>
  {
    console.log(JSON.stringify(mascota));
    
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
    options 	: any		= {
         "idUsuario" : mascota.idUsuario,
         "idMascota" : mascota.idMascota,
         "idFundacion" : mascota.idFundacion,
         "chip" : mascota.numChip,
         "nombre" : mascota.nombre,
         "edad" : mascota.edad,
         "idRaza": mascota.idRaza,
         "idEspecie": mascota.idEspecie,
         "idGenero": mascota.idGenero,
         "tamano": mascota.tamano,
         "peso": mascota.peso,
         "ciudad": mascota.ciudad,
         "estadoMascota": mascota.estadoMascota,
         "color": mascota.color,
         "foto": mascota.urlFoto,
         "descripcion": mascota.descripcion   
   };    
      return  this.http.post(this.url + "addMascotaAdmin.php", JSON.stringify(options), headers);
   }

   //editar mascota
   editarMascotaAdmin(mascota:Mascota): Observable<any>
  {
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
    options 	: any		= {
         "idMascota" : mascota.idMascota,
         "idFundacion" : mascota.idFundacion,
         "chip" : mascota.numChip,
         "nombre" : mascota.nombre,
         "edad" : mascota.edad,
         "idRaza": mascota.idRaza,
         "idEspecie": mascota.idEspecie,
         "idGenero": mascota.idGenero,
         "tamano": mascota.tamano,
         "peso": mascota.peso,
         "ciudad": mascota.ciudad,
         "estadoMascota": mascota.estadoMascota,
         "color": mascota.color,
         "descripcion": mascota.descripcion,
         "observacion": mascota.observacion,
         "usuarioEdito": mascota.usuarioEdito
   
   };    
       console.log(options);
      return  this.http.post(this.url + "updateMascotaPorAdmin.php", JSON.stringify(options), headers);
   }

   //get contenido de contrato

   getContenidoContrato():Observable<any>{
      return  this.http.get(this.url + "getContenidoContrato.php");
   }

}
