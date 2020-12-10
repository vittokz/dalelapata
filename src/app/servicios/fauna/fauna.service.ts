import { Injectable } from '@angular/core';
import { Noticias, Archivo } from '../../modelos/modulo-fauna/fauna-modelo';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FaunaService {
  urlNoticia: string = environment.url + "noticias/";
  resul:any;
  url:string="";
  constructor(public http:HttpClient) { }
  noticia: Noticias= new Noticias();
  
  //solicita todas las noticias
  getNoticias(): Observable<Noticias[]>{
    return this.http.get<Noticias[]>(this.urlNoticia +"getNoticias.php")
  }

  public uploadFile(data) {
    let uploadURL = this.urlNoticia + "addNoticias.php";
    return this.http.post<any>(uploadURL, data);
  }

  agregarNoti(noti: Noticias) {
      //let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post<Noticias>(this.url, JSON.stringify(noti)).subscribe((data:any) => {
      this.resul = data.result;
      })
  }


  //elimina noticia
    eliminarNoticia(idNoti: string): Observable<any>{
         return this.http.get(this.urlNoticia + "deleteNoticias.php?idNoticia=" + idNoti);
    }

  //adiciona noticia
  addNoticia(noti: Noticias): void{
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
    options 	: any		= { "key" : "create", "nombre" : noti.nombre, "descripcion" : 
    noti.descripcion };    
         this.http.post(this.urlNoticia + "addNoticias.php", JSON.stringify(options), headers)
        .subscribe((data : any) =>
        {
          if(data.result=="ok"){
            this.resul=data;
            console.log("Se agrego correctamente");
          }
          else{
             console.log("error Ingresando datos");
          }    
        },
        (error : any) =>
        {
          
        });

   }
}
