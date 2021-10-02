import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.prod";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Eventos } from "../../modelos/modulo-eventos/evento-modelo";

@Injectable({
  providedIn: "root",
})
export class EventosService {
  urlEvento: string = environment.url + "eventos/";
  resul: any;
  evento: Eventos;
  constructor(private http: HttpClient) {}

  //consumir eventos de la api
  getEventos(): Observable<Eventos> {
    return this.http.get<Eventos>(this.urlEvento + "getEventos.php");
  }

  public uploadFile(data): Observable<any> {
    let uploadURL = this.urlEvento + "addEvento.php";
    return this.http.post<any>(uploadURL, data);
  }

  //consumir eventos de la api
  getEventoById(idEvento: string): Observable<Eventos> {
    return this.http.get<Eventos>(
      this.urlEvento + "getEventoById.php?idEvento=" + idEvento
    );
  }
  getEventosByMunicipio(municipio: string): Observable<Eventos[]> {
    return this.http.get<Eventos[]>(
      this.urlEvento + "getEventoByMunicipio.php?municipio=" + municipio
    );
  }
  //consumir api de adicionar evento
  addEvento(evento: Eventos): void {
    let headers: any = new HttpHeaders({ "Content-Type": "application/json" }),
      options: any = {
        key: "create",
        municipio: evento.municipio,
        nombre: evento.nombre,
        descripcion: evento.descripcion,
        fechaEvento: evento.fechaEvento,
        usuarioRegistro: evento.usuarioRegistro,
      };
    this.http
      .post(this.urlEvento + "addEvento.php", JSON.stringify(options), headers)
      .subscribe(
        (data: any) => {
          if (data.result == "ok") {
            this.resul = data;
          } else {
          }
        },
        (error: any) => {}
      );
  }

  //eliminar evento
  eliminarEvento(idEvento: string): Observable<any> {
    return this.http.get(
      this.urlEvento + "deleteEvento.php?idEvento=" + idEvento
    );
  }

  getEventosVarios(idEvento: string): Observable<any[]> {
    return this.http.get<any[]>(
      this.urlEvento + "getImagesEventoId.php?idEvento=" + idEvento
    );
  }
}
