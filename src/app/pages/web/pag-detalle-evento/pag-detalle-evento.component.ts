import { environment } from 'src/environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { EventosService } from '../../../servicios/eventos/eventos.service';
import { Eventos } from '../../../modelos/modulo-eventos/evento-modelo';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pag-detalle-evento',
  templateUrl: './pag-detalle-evento.component.html',
  styleUrls: ['./pag-detalle-evento.component.css']
})
export class PagDetalleEventoComponent implements OnInit {
  eventoDetalle: Eventos=new Eventos();
  url: string = environment.url;
  idEvento: string;
  evento: Eventos = new Eventos();
  public isCollapsed = true;
  constructor(private eventoService: EventosService,private ruta: Router,
    private rutaActiva: ActivatedRoute) {
     this.idEvento = this.rutaActiva.snapshot.params.idEvento;
     this.cargarEvento(this.idEvento);
   }

  ngOnInit(): void {
    this.isCollapsed = true;
  }

  cargarEvento(idEvento: string){
    this.eventoService.getEventoById(idEvento).subscribe(
      event => {
        this.evento = event;
        console.log(this.evento);
      }
    );
  }

  inicio(){
    this.ruta.navigateByUrl('/home');
  }

}
