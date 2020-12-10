import { Component, OnInit } from '@angular/core';
import { FaunaService } from '../../../servicios/fauna/fauna.service';
import { Router } from '@angular/router';
import { Noticias } from '../../../modelos/modulo-fauna/fauna-modelo';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-pag-detalle-fauna',
  templateUrl: './pag-detalle-fauna.component.html',
  styleUrls: ['./pag-detalle-fauna.component.css']
})
export class PagDetalleFaunaComponent implements OnInit {
  noticiaDetalle:Noticias= new Noticias();
  url: string =environment.url;
  constructor(private noticiaService: FaunaService, private ruta: Router) {
    this.noticiaDetalle = noticiaService.noticia;
   }

  ngOnInit(): void {
  }

}
