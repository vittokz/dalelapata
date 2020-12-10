import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mascota } from '../../modelos/modulo-mascota/mascota-modulo';
import { UserPagina } from '../../modelos/modulo-usuario/usuarioPagina-modelo';

@Injectable({
  providedIn: 'root'
})
export class AdopcionService {
  url:string = environment.url + "adopcionPostulacion/";
  constructor(private http: HttpClient) { 
    
  }

//metodos para realizar el reporte completo
getReporteCompleto():Observable<any>{
   return this.http.get<any>(this.url + 'reporteCompleto.php');
}


//fin reporte completo
subirContratoAdopcion(data): Observable<any>{
  let uploadURL = this.url + "subirContratoAdopcion.php";
  return this.http.post<any>(uploadURL, data);
}
listarContratosAdopcion(identidad:string): Observable<any[]>{
  let uploadURL = this.url + "listaContratosAdopcion.php?identidad=";
  return this.http.get<any[]>(uploadURL + identidad);
}

listarContratosPorFundacion(idFundacion:string): Observable<any[]>{
  let uploadURL = this.url + "listaContratosPorFundacion.php?idFundacion=";
  return this.http.get<any[]>(uploadURL + idFundacion);
}
  
  //traer mascotas en las q se postularon por fundacion
  getPostulacionesPorIdFundacion(idFundacion:string): Observable<Mascota[]>{
     return this.http.get<Mascota[]>(this.url + "getPostulacionesPorFundacion.php?idFundacion=" + idFundacion);
 }

 //traer mascotas en las q se postularon por IdUsuario
 getMascotasPostulacionesPorIdUsuario(idUsuario:string): Observable<Mascota[]>{
   return this.http.get<Mascota[]>(this.url + "getIdMascotaPostuladosPorIdUsuario.php?idUsuario=" + idUsuario);
}

generaWordIdUsuarioIdMascota(idUsuario:string): Observable<Mascota[]>{
  return this.http.get<Mascota[]>(this.url + "generarWordTenencia.php?idUsuario=" + idUsuario);
}

 //traer idUsuarios que se postularon a mascotas por fundacion
 getIdUsuariosPostuladosPorIdFundacion(idFundacion:string): Observable<UserPagina[]>{
  return this.http.get<UserPagina[]>(this.url + "getIdUsuariosPostuladosPorFundacion.php?idFundacion=" + idFundacion);
}

 //traer idUsuario postulados con idMAscota
 getUsuariosPostuladosPorIdMascota(idMascota:string): Observable<UserPagina[]>{
  return this.http.get<UserPagina[]>(this.url + "getUsuariosPostuladosPorIdMascota.php?idMascota=" + idMascota);
 }


 //Aceptar postulación de usuario
 aceptarPostulacionUsuario(idUsuario:string,idMascota: string): Observable<any>{
  let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
    options 	: any		= {
         "idUsuario" : idUsuario, 
         "idMascota" : idMascota
    };
    return this.http.post(this.url + 'aceptarAdopcionUsuario.php', JSON.stringify(options), headers);
 }
  

  addPostulaciones(identidad:string,idMascota:string):Observable<any>{
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
    options 	: any		= {
         "identidad" : identidad, 
         "idMascota" : idMascota
    };
    return this.http.post(this.url + 'addPostulacion.php', JSON.stringify(options), headers);
      
  }

  enviarNotificaciones(idFundacion: string): Observable<any>{
      return this.http.get<any>(this.url + "enviarNotificaciones.php?idFundacion=" + idFundacion);
  }


}
