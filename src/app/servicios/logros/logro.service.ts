import { Injectable } from '@angular/core';
import { Logros } from '../../modelos/modulo-logros/logros-modelo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogroService {
  url:string = environment.url + "logros/"
  constructor(private http: HttpClient) { }
  
  //traer todos los logros
  getAllLogros(): Observable<Logros[]>{
    return this.http.get<Logros[]>(this.url + "getAll.php");
  }

  eliminarLogro(idLogro:string):Observable<any>{
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' });
    let options 	: any		= {
      "idLogro" : idLogro
    };
    return  this.http.post(this.url + "eliminarLogro.php", JSON.stringify(options), headers);
  }
 
  //traer logros por idMascota
  getLogrosIdMascota(paramIdMascota: string): Observable<Logros[]>{
    return this.http.get<Logros[]>(this.url + "getLogrosIdMascota.php?idMascota="+paramIdMascota);
  }

  public uploadFile(data) {
    let uploadURL = this.url + "addLogro.php";
    return this.http.post<any>(uploadURL, data);
  }

  //Agregar logro
  addLogro(nuevoLogro: Logros): Observable<any>{
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
      options 	: any		= {
        "nombre" : nuevoLogro.nombre,
        "descripcion" : nuevoLogro.descripcion,
        "fecha" : nuevoLogro.fecha,
        "estado" : nuevoLogro.estado,
        "img" : nuevoLogro.img,
        "estadoMascota" : nuevoLogro.estadoMascota,
        "idMascota" : nuevoLogro.idMascota,
        "idUsuario" : nuevoLogro.idUsuario,
    };    
        return  this.http.post(this.url + "addLogro.php", JSON.stringify(options), headers);
    }

}
