import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Capsulas } from "src/app/modelos/modulo-capsulas/capsulas-modelo";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class CapsulasService {
  url: string = environment.url + "capsulas/";

  constructor(private http: HttpClient) {}

  public addCapsulas(data) {
    let uploadURL = this.url + "addCapsula.php";
    return this.http.post<any>(uploadURL, data);
  }

  public getAllCapsulas(): Observable<Capsulas[]> {
    return this.http.get<Capsulas[]>(this.url + "getCapsulas.php");
  }

  eliminarCapsulas(id: string) {
    return this.http.get<any>(this.url + "deleteCapsula.php?id=" + id);
  }
}
