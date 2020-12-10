import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { UserInterface } from '../../modelos/modulo-usuariosAdmin/usuarioAdmin-modelo';
@Injectable({
  providedIn: 'root'
})
export class AuthUsuariosService {
  url: string = environment.url + "authUsuarios/";
   headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' });
     
   constructor(private http: HttpClient) { }
  

  registrarUsuario(nuevoUsuario: UserInterface):Observable<any>{
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' });
    let options : any		= {
      tipoDoc: nuevoUsuario.tipoDoc,
      tipoUsuario: nuevoUsuario.tipoUsuario,
      identidad: nuevoUsuario.identidad,
      nombre: nuevoUsuario.nombre,
      apellido: nuevoUsuario.apellido,
      email: nuevoUsuario.email, 
      telefono: nuevoUsuario.telefono,
      direccion: nuevoUsuario.direccion,
      municipio: nuevoUsuario.municipio,
      clave: nuevoUsuario.clave
    };

     return this.http.post(this.url + "registrarUsuario.php", JSON.stringify(options), headers);
  }

  loginUsuario(identidad:string,clave: string): Observable<any>{
    let options = {
      identidad:identidad,
      clave:clave
    };
    return this.http.post(<any>this.url + "loginUsuario.php", options, this.headers);
    
  }

  //cuando recuperemos nuestro usuario lo guardo en el navegador
  //con esta funcion
  setUser(user): void{
     let user_string = JSON.stringify(user);
     localStorage.setItem('currentUser', user_string);
     console.log("Current-creado: " + user_string);
  }

  setToken(token):void{
    localStorage.setItem('accesToken',token);
  }

  getToken(){
    localStorage.getItem('accesToken');
  }

  //recuperar el usuario que esta logueado
  getCurrentUser(){
    let user_logeado= localStorage.getItem('currentUser');
     if(!isNullOrUndefined(user_logeado)){
        let user = JSON.parse(user_logeado);
        return user;
      }else{
        return null;
      }
  }

  logoutUser(){
    let accessToken = localStorage.getItem('accesToken');
    localStorage.removeItem('accesToken');
    localStorage.removeItem('currentUser');
  }

  //listar usuarios administrados
  getUsuarios():Observable<UserInterface[]>{
     return this.http.get<UserInterface[]>(this.url + "getUsuarios.php");
  }
  //get usuario por identidad
  getUsuarioPorIdentidad(identidad:string):Observable<UserInterface[]>{
     return this.http.get<UserInterface[]>(this.url + "getUsuarioPorIdentidad.php?idenUsuario=" + identidad);
 }
}