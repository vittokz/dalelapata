import { Component, OnInit } from '@angular/core';
import { FaunaService } from '../../../servicios/fauna/fauna.service';
import { Noticias } from '../../../modelos/modulo-fauna/fauna-modelo';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-detalle-noticia',
  templateUrl: './detalle-noticia.component.html',
  styleUrls: ['./detalle-noticia.component.css']
})
export class DetalleNoticiaComponent implements OnInit {
  noticiaDetalle: Noticias=new Noticias(); 
  eliminado:boolean=false;
  url: string = environment.url;
  constructor(public noticiaService: FaunaService, private ruta: Router) {
    this.noticiaDetalle = noticiaService.noticia;
   }

  ngOnInit(): void {
  }

  eliminarNoticia(idNoticia: string){
      this.noticiaService.eliminarNoticia(idNoticia);
      this.eliminado=true;
     
  }
  volver(){
    this.ruta.navigateByUrl('/noticias-Fauna');
  }

}
