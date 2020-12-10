import { Injectable } from '@angular/core';
import { tipoFundacion } from '../../modelos/modulo-fundacion/fundacion-modelo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoFundacionService {
  tiposFundacion: tipoFundacion= new tipoFundacion();
  url: string = environment.url;
  constructor(private http: HttpClient) { }

  getTipoFundaciones():Observable<tipoFundacion[]>{
    return this.http.get<tipoFundacion[]>(this.url + "fundacion/getTiposFundacion.php");
  }
}
