import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import {
  UserPagina,
  UserPagAuth,
} from "../../modelos/modulo-usuario/usuarioPagina-modelo";
import { environment } from "../../../environments/environment";
import { map } from "rxjs/operators";
import { isNullOrUndefined } from "util";

@Injectable({
  providedIn: "root",
})
export class UserPlataformaService {
  url: string = environment.url + "usuarioPlataformaWeb/";
  headers: any = new HttpHeaders({ "Content-Type": "application/json" });
  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<UserPagina[]> {
    return this.http.get<UserPagina[]>(this.url + "getUsuarios.php");
  }

  actualizarUsuario(usuario: UserPagina): Observable<any> {
    let headers: any = new HttpHeaders({ "Content-Type": "application/json" }),
      options: any = {
        identidad: usuario.identidad,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        direccion: usuario.direccion,
        email: usuario.email,
        telefono: usuario.telefono,
        movil: usuario.movil,
        clave: usuario.clave,
      };
      debugger;
    return this.http.post(
      this.url + "actualizarUsuario.php",
      JSON.stringify(options),
      headers
    );
  }

  agregarUsuario(usuario: UserPagina): Observable<any> {
    let headers: any = new HttpHeaders({ "Content-Type": "application/json" }),
      options: any = {
        idFundacion: usuario.idFundacion,
        tipoDoc: usuario.tipoDoc,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        identidad: usuario.identidad,
        direccion: usuario.direccion,
        email: usuario.email,
        telefono: usuario.telefono,
        movil: usuario.movil,
        clave: usuario.clave,
      };
    return this.http.post(
      this.url + "addUsuario.php",
      JSON.stringify(options),
      headers
    );
  }

  //agregar usuario y postulacion

  agregarUsuarioyPostulacion(
    usuario: UserPagina,
    idMascota: string
  ): Observable<any> {
    let headers: any = new HttpHeaders({ "Content-Type": "application/json" }),
      options: any = {
        idMascota: idMascota,
        idFundacion: usuario.idFundacion,
        tipoDoc: usuario.tipoDoc,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        identidad: usuario.identidad,
        direccion: usuario.direccion,
        email: usuario.email,
        telefono: usuario.telefono,
        movil: usuario.movil,
        clave: usuario.clave,
      };
    console.log(options);
    return this.http.post(
      this.url + "addUsuarioPostulacion.php",
      JSON.stringify(options),
      headers
    );
  }

  //editar la clave del usuario

  editarClaveUsuario(identidad: string, clave: string): Observable<any> {
    let headers: any = new HttpHeaders({ "Content-Type": "application/json" }),
      options: any = {
        identidad: identidad,
        clave: clave,
      };
    return this.http.post(
      this.url + "editarClaveUsuario.php",
      JSON.stringify(options),
      headers
    );
  }

  //editar Usuario

  editarUsuario(usuario: UserPagina): Observable<any> {
    let headers: any = new HttpHeaders({ "Content-Type": "application/json" }),
      options: any = {
        idUsuario: usuario.idUsuario,
        idFundacion: usuario.idFundacion,
        tipoDoc: usuario.tipoDoc,
        identidad: usuario.identidad,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        direccion: usuario.direccion,
        telefono: usuario.telefono,
        movil: usuario.movil,
        email: usuario.email,
        facebook: usuario.facebook,
        twitter: usuario.twitter,
        clave: usuario.clave,
      };
    return this.http.post(
      this.url + "updateUsuario.php",
      JSON.stringify(options),
      headers
    );
  }

  //traer Usuario mediante IdUsuario
  getUsuarioId(idUsuario: string): Observable<UserPagina> {
    return this.http.get<UserPagina>(
      this.url + "getUsuarioId.php?idUsuario=" + idUsuario
    );
  }

  //traer Usuario mediante Identidad
  getUsuarioIdentidad(identidad: string): Observable<UserPagina> {
    return this.http.get<UserPagina>(
      this.url + "getUsuarioIdentidadAdopcion.php?identidad=" + identidad
    );
  }

  //traer Usuario mediante nomUsuario
  getUsuarioNomUsuario(nomUsuario: string): Observable<UserPagina> {
    return this.http.get<UserPagina>(
      this.url + "getUsuarioNomUsuario.php?nomUsuario=" + nomUsuario
    );
  }

  //login Usuarios y fundaciones
  onLoginUser(identidad: string, clave: string): Observable<any> {
    return this.http.post<UserPagAuth>(
      this.url + "loginUsuarioPag.php",
      {
        identidad: identidad,
        clave: clave,
      },
      {
        headers: this.headers,
      }
    );
  }

  //cuando recuperemos nuestro usuario lo guardo en el navegador
  //con esta funcion
  setUser(user): void {
    let nomuser_string = JSON.stringify(user);
    localStorage.setItem("currentNomUsuario", nomuser_string);
  }

  setToken(token): void {
    localStorage.setItem("accesTokenPagina", token);
  }

  getToken() {
    localStorage.getItem("accesTokenPagina");
  }

  //recuperar el usuario que esta logueado
  getCurrentUser() {
    let user_logeado = localStorage.getItem("currentNomUsuario");
    if (!isNullOrUndefined(user_logeado)) {
      let user = JSON.parse(user_logeado);
      return user;
    } else {
      return null;
    }
  }

  logoutUser() {
    let accessToken = localStorage.getItem("accesTokenPagina");
    localStorage.removeItem("accesTokenPagina");
    localStorage.removeItem("currentNomUsuario");
  }
}
