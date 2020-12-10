import { Injectable } from '@angular/core';
import { Fundacion } from '../../modelos/modulo-fundacion/fundacion-modelo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserPagina } from '../../modelos/modulo-usuario/usuarioPagina-modelo';

@Injectable({
  providedIn: 'root'
})
export class FundacionService {
  url: string = environment.url + "fundacion/";
  fundacion: Fundacion = new Fundacion ();
  resul: any;
  headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private ruta: Router) { }

  getFundaciones():Observable<Fundacion[]>{
     return this.http.get<Fundacion[]>(this.url + "getFundacion.php");
  }

  eliminarFundacion(idFundacion:string):Observable<any>{
    console.log(idFundacion);
     return this.http.get<any>(this.url + 'eliminarFundacion.php?idFundacion=' + idFundacion);
  }

  public uploadFile(data) {
    return this.http.post<any>(this.url + 'addFundacion.php', data);
  }
  
  getUsuariosFundacion(idFundacion:string):Observable<UserPagina[]>{
     return this.http.get<UserPagina[]>(this.url + "exportUsuariosFundacion.php?idFundacion="+idFundacion);
     
  }
  //adicioanr una fundacion
  agregarFundacion(fundacion: Fundacion):Observable<any>{
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
    options 	: any		= {
        "tipoDoc": fundacion.tipoDoc,
        "identidad": fundacion.identidad,
        "razon" : fundacion.razonSocial, 
        "municipio" : fundacion.municipio, 
        "ccResponsable" : fundacion.ccResponsable, 
        "nomResponsable" : fundacion.nombreResponsable, 
        "telefono": fundacion.telefono,
        "movil": fundacion.movil,
        "email": fundacion.email,
        "direccion": fundacion.direccion,
        "fecha": fundacion.fechaFundacion,
        "descripcion" : fundacion.descripcion,
        "facebook" : fundacion.facebook,
        "twitter" : fundacion.twitter,
        "clave": fundacion.clave,
      };    
        return this.http.post(this.url + "addFundacion.php", JSON.stringify(options), headers);
  }


 //consumir consulta de nombre de fundacion
 buscarNombreFundacion(funda: string){
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
      options 	: any		= {"idFundacion" : funda };
       return this.http.post(this.url + "buscarNombreFundacion.php", JSON.stringify(options), headers);
    }
  //fin buscarNombreFundacion
  //traer Usuario mediante IdUsuario
  getFundacionId(idFundacion: string):Observable<Fundacion>{
    return this.http.get<Fundacion>(this.url + 'getFundacionId.php?idFundacion=' + idFundacion);
 }
}
