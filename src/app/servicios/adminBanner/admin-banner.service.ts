import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Banner } from 'src/app/modelos/modulo-banner/banner-modelo';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AdminBannerService {
  urlBanner: string = environment.url + "adminBanner/";

  resul:any;
  url:string="";
  constructor(public http:HttpClient) { }
 
  //solicita todas llos banner
  getBanner(): Observable<Banner[]>{
    return this.http.get<Banner[]>(this.urlBanner +"getBanner.php")
  }



  getAliados(): Observable<Banner[]>{
    return this.http.get<Banner[]>(this.urlBanner +"getAliados.php")
  }

  getAliadosActivos(): Observable<Banner[]>{
    return this.http.get<Banner[]>(this.urlBanner +"getAliadosActivos.php")
  }

   //solicita todas llos banner
   getBannerActivos(): Observable<Banner[]>{
    return this.http.get<Banner[]>(this.urlBanner +"getBannerActivos.php")
  }

  //solicita todas llos banner
  updateEstadoBanner(id:string, estado:string){
   
    return this.http.get<any>(this.urlBanner +"updateBanner.php?id="+id+"&estado="+estado);
  }

  public addBanner(data) {
    console.log(data);
    let uploadURL = this.urlBanner + "addBanner.php";
    return this.http.post<any>(uploadURL, data);
  }

}
