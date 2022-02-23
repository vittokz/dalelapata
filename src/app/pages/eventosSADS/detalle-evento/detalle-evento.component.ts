import { Component, OnInit } from "@angular/core";
import { EventosService } from "../../../servicios/eventos/eventos.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Eventos } from "../../../modelos/modulo-eventos/evento-modelo";
import { environment } from "src/environments/environment.prod";

@Component({
  selector: "app-detalle-evento",
  templateUrl: "./detalle-evento.component.html",
  styleUrls: ["./detalle-evento.component.css"],
})
export class DetalleEventoComponent implements OnInit {
  eventoDetalle: Eventos[];
  eliminado: boolean = false;
  url: string = environment.url;
  dato: { idEvento: string };
  constructor(
    public eventoService: EventosService,
    private ruta: Router,
    private rutaActiva: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dato = {
      idEvento: this.rutaActiva.snapshot.params.parametro,
    };
    this.cargarEvento(this.dato.idEvento);
  }

  cargarEvento(idEvento: string) {
    this.eventoService.getEventoById(idEvento).subscribe((data) => {
      this.eventoDetalle = data;
      console.log(data);
    });
  }

  //funcion eliminar evento
  eliminarEvento(idenEvento: string) {
    this.eventoService.eliminarEvento(idenEvento);
    this.eliminado = true;
  }
  volver() {
    this.ruta.navigateByUrl("/eventos");
  }
}
