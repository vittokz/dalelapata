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

eliminarImgVisita(idVisita: string, posicion: string): Observable<any>{
  return this.http.get<any>(this.url + "eliminarImgVisita.php?idVisita="+idVisita + "&posicion="+posicion);
}

public uploadFile(data):Observable<any>{
  let uploadURL = this.url + "addVisitaImagen.php";
  return this.http.post<any>(uploadURL, data);
}

//agregar imagen a visita

public uploadFileVisita(data):Observable<any>{
  let uploadURL = this.url + "addImagenVisita.php";
  return this.http.post<any>(uploadURL, data);
}

//subir documentos de municipios u organizaciones
public cargarDocumentos(data):Observable<any>{
  let uploadURL = this.url + "subirDocumentos.php";
  return this.http.post<any>(uploadURL, data);
}

listarDocumentosByIdentidad(identidad: string): Observable<any[]>{
  return this.http.get<any[]>(this.url + "getListaDocumentosByIdentidad.php?identidad="+identidad);
}
listarDocumentosTodos(): Observable<any[]>{
  return this.http.get<any[]>(this.url + "getAllListaDocumentos.php");
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

 //editar imagen
 updateVisitaImg(idVisita:string, urlFoto: string, numero: string):Observable<any>{
   var urlFotoEnviada: string ="";
   urlFotoEnviada = "urlFoto"+numero;
   console.log(urlFotoEnviada);
  let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
  options 	: any		= {
    "idVisita" : idVisita,
    urlFotoEnviada : urlFoto,
  };    
  console.log(options );
       return this.http.post(this.url + "updateVisitaImg.php", JSON.stringify(options), headers);
}


}
