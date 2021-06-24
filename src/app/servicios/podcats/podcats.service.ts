import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PodCats } from "src/app/modelos/modulo-podcats/podcats-modelo";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class PodcatsService {
  url: string = environment.url + "podcast/";

  constructor(private http: HttpClient) {}

  public addPodCats(data) {
    let uploadURL = this.url + "addPodCast.php";
    return this.http.post<any>(uploadURL, data);
  }

  public getAllPodCats(): Observable<PodCats[]> {
    return this.http.get<PodCats[]>(this.url + "getPodCast.php");
  }

  eliminarPodCats(id: string) {
    return this.http.get<any>(this.url + "deletePodCast.php?id=" + id);
  }
}
