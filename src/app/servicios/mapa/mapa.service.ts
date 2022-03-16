import { Injectable } from "@angular/core";
import * as mapboxgl from "mapbox-gl";
import { environment } from "src/environments/environment.prod";
import { HttpClient } from "@angular/common/http";
import { UbicacionMapa } from "../../modelos/modulo-ubicacionMapa/ubicacionMapa-modulo";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MapaService {
  url: string = environment.url + "unidadMovil/";
  constructor(private http: HttpClient) {}

  getUbicaciones(): Observable<UbicacionMapa[]> {
    return this.http.get<UbicacionMapa[]>(this.url + "getVisitas.php");
  }

  //traer cantidad total de cada municpio de exterilizaciones

  getTotalExterilizaciones(): Observable<UbicacionMapa[]> {
    return this.http.get<UbicacionMapa[]>(
      this.url + "getAllTotalExterilizaciones.php"
    );
  }

  getAllUbicaciones(): Observable<UbicacionMapa[]> {
    return this.http.get<UbicacionMapa[]>(this.url + "getAllVisitas.php");
  }

  getUbicacionesByIVisita(idVisita: string): Observable<UbicacionMapa[]> {
    return this.http.get<UbicacionMapa[]>(
      this.url + "getVisitasByIdVisita.php?idVisita=" + idVisita
    );
  }

  getUbicacionesByIMunicipio(idMunicipio: string): Observable<UbicacionMapa[]> {
    return this.http.get<UbicacionMapa[]>(
      this.url + "getVisitasByMunicipio.php?idMunicipio=" + idMunicipio
    );
  }
}
