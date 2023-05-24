import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  RespuestaSolicitud,
  UnidadMovil,
} from "src/app/modelos/modulo-unidadMovil/unidadMovil-modelo";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class ConvocatoriaService {
  url: string = environment.url + "convocatoria/";
  constructor(private http: HttpClient) {}

  getVisitas(): Observable<UnidadMovil[]> {
    return this.http.get<UnidadMovil[]>(this.url + "getVisitasAdmin.php");
  }

  eliminarImgVisita(idVisita: string, posicion: string): Observable<any> {
    return this.http.get<any>(
      this.url +
        "eliminarImgVisita.php?idVisita=" +
        idVisita +
        "&posicion=" +
        posicion
    );
  }

  public uploadFile(data): Observable<any> {
    let uploadURL = this.url + "addVisitaImagen.php";
    return this.http.post<any>(uploadURL, data);
  }

  //agregar imagen a convocatoria

  public uploadFileVisita(data): Observable<any> {
    let uploadURL = this.url + "addImagenVisita.php";
    return this.http.post<any>(uploadURL, data);
  }

  //subir documentos de municipios u organizaciones segun convocatoria
  public cargarDocumentos(data): Observable<any> {
    let uploadURL = this.url + "subirDocumentos.php";
    return this.http.post<any>(uploadURL, data);
  }

  //enviar respuesta a solicitud
  public enviarRespuestaSolicitud(
    respuesta: RespuestaSolicitud
  ): Observable<any> {
    let headers: any = new HttpHeaders({ "Content-Type": "application/json" }),
      options: any = {
        comentarios: respuesta.comentarios,
        estado: respuesta.estado,
        idSolicitud: respuesta.idSolicitud,
        usuarioComento: respuesta.usuarioComento,
      };
    console.log(options);
    return this.http.post(
      this.url + "addRespuestaSolicitud.php",
      JSON.stringify(options),
      headers
    );
  }

  listarDocumentosByIdentidad(identidad: string): Observable<any[]> {
    return this.http.get<any[]>(
      this.url + "getListaDocumentosByIdentidad.php?identidad=" + identidad
    );
  }
  listarDocumentosByIdMunicipio(idMunicipio: string): Observable<any[]> {
    return this.http.get<any[]>(
      this.url +
        "getListaDocumentosByIdMunicipio.php?idMunicipio=" +
        idMunicipio
    );
  }

  cargarSelectIdentidades(idMunicipio: string): Observable<any[]> {
    return this.http.get<any[]>(
      this.url +
        "getListaNitRegistrados.php?idMunicipio=" +
        idMunicipio
    );
  }

  listarDocumentosTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.url + "getAllListaDocumentos.php");
  }
  listarDocumentosTodosByNombreMunicipio(): Observable<any[]> {
    return this.http.get<any[]>(
      this.url + "getAllListaDocumentosByNombreMunicipio.php"
    );
  }
  //adicionar visitas unidad movil
  addVisita(visita: UnidadMovil): Observable<any> {
    let headers: any = new HttpHeaders({ "Content-Type": "application/json" }),
      options: any = {
        idMunicipio: visita.idMunicipio,
        latitud: visita.latitud,
        longitud: visita.longitud,
        proceso: visita.proceso,
        fechaInicial: visita.fechaInicial,
        fechaFinal: visita.fechaFinal,
        cantidad: visita.cantidad,
        estado: visita.estado,
        usuarioRegistro: visita.usuarioRegistro,
      };
    return this.http.post(
      this.url + "addVisita.php",
      JSON.stringify(options),
      headers
    );
  }

  //editar visita
  updateVisita(visita: UnidadMovil): Observable<any> {
    let headers: any = new HttpHeaders({ "Content-Type": "application/json" }),
      options: any = {
        idVisita: visita.idVisita,
        idMunicipio: visita.idMunicipio,
        latitud: visita.latitud,
        longitud: visita.longitud,
        proceso: visita.proceso,
        fechaInicial: visita.fechaInicial,
        fechaFinal: visita.fechaFinal,
        cantidad: visita.cantidad,
        estado: visita.estado,
      };
    return this.http.post(
      this.url + "updateVisita.php",
      JSON.stringify(options),
      headers
    );
  }

  //editar fecha visita
  updateFechaVisita(fechaVisita: string,fechaVisita2: string, idUsuarioRegistro: string, nit: string): Observable<any> {
    let headers: any = new HttpHeaders({ "Content-Type": "application/json" }),
      options: any = {
        fecha: fechaVisita,
        fecha2: fechaVisita2,
        usuarioRegistro: idUsuarioRegistro,
        nit: nit
      };
    return this.http.post(
      this.url + "updateFechaVisita.php",
      JSON.stringify(options),
      headers
    );
  }

  //editar imagen
  updateVisitaImg(
    idVisita: string,
    urlFoto: string,
    numero: string
  ): Observable<any> {
    var urlFotoEnviada: string = "";
    urlFotoEnviada = "urlFoto" + numero;
    console.log(urlFotoEnviada);
    let headers: any = new HttpHeaders({ "Content-Type": "application/json" }),
      options: any = {
        idVisita: idVisita,
        urlFotoEnviada: urlFoto,
      };
    console.log(options);
    return this.http.post(
      this.url + "updateVisitaImg.php",
      JSON.stringify(options),
      headers
    );
  }
}
