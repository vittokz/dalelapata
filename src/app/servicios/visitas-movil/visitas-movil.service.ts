import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UnidadMovil } from 'src/app/modelos/modulo-unidadMovil/unidadMovil-modelo';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class VisitasMovilService {
url:string = environment.url + "unidadMovil/"
constructor(private http: HttpClient) { }

getVisitas(): Observable<UnidadMovil[]>{
  return this.http.get<UnidadMovil[]>(this.url + "getVisitasAdmin.php");
}

public uploadFile(data):Observable<any>{
  let uploadURL = this.url + "addVisitaImagen.php";
  return this.http.post<any>(uploadURL, data);
}

  //adicionar visitas unidad movil
addVisita(visita: UnidadMovil): Observable<any>
{
  let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
  options 	: any		= {
     "idMunicipio" : visita.idMunicipio,
     "latitud" : visita.latitud,
     "longitud" : visita.longitud,
     "proceso" : visita.proceso,
     "fechaInicial" : visita.fechaInicial,
     "fechaFinal" : visita.fechaFinal,
     "cantidad" : visita.cantidad,
     "estado" : visita.estado,
     "usuarioRegistro" : visita.usuarioRegistro
 };    
    return  this.http.post(this.url + "addVisita.php", JSON.stringify(options), headers);
 }

 //editar visita
 updateVisita(visita: UnidadMovil):Observable<any>{
  let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
  options 	: any		= {
    "idVisita" : visita.idVisita,
    "idMunicipio" : visita.idMunicipio,
    "latitud" : visita.latitud,
    "longitud" : visita.longitud,
    "proceso" : visita.proceso,
    "fechaInicial" : visita.fechaInicial,
    "fechaFinal" : visita.fechaFinal,
    "cantidad" : visita.cantidad,
    "estado" : visita.estado
  };    
       return this.http.post(this.url + "updateVisita.php", JSON.stringify(options), headers);
}


}
