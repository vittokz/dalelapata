import { Component, OnInit } from "@angular/core";
import { EventosService } from "../../../servicios/eventos/eventos.service";
import { Router } from "@angular/router";
import { Eventos } from "../../../modelos/modulo-eventos/evento-modelo";
import { AuthUsuariosService } from "src/app/servicios/usuariosAdmin/auth-usuarios.service";
import { environment } from "src/environments/environment.prod";
import { UserInterface } from "src/app/modelos/modulo-usuariosAdmin/usuarioAdmin-modelo";
import { ExportarService } from "src/app/servicios/exportarExcel/exportar.service";

@Component({
  selector: "app-eventos",
  templateUrl: "./eventos.component.html",
  styleUrls: ["./eventos.component.css"],
})
export class EventosComponent implements OnInit {
  isLogueado: Boolean = false;
  evento: Eventos[];
  dato: { idEvento: string };
  identidadUsuario: string;
  usuarioLogueado: UserInterface[];
  municipioUsuario: string;
  eliminado: string;

  constructor(
    private authService: AuthUsuariosService,
    private exportExcelService: ExportarService,
    private eventoService: EventosService,
    private ruta: Router
  ) {}

  ngOnInit(): void {
    this.identidadUsuario = this.authService.getCurrentUser();
    this.cargarUsuario(this.identidadUsuario);
    this.verificarAccesoUsuario();
  }

  generarExcel(jsonElmentos: any[], nombreArchivo: string): void {
    this.exportExcelService.exportExcel(jsonElmentos, nombreArchivo);
  }

  cargarUsuario(identidad: string) {
    this.authService.getUsuarioPorIdentidad(identidad).subscribe((data) => {
      this.usuarioLogueado = data;
      this.municipioUsuario = this.usuarioLogueado[0].municipio;
      this.cargarEventos(this.municipioUsuario);
    });
  }

  eliminar(idEvento: string) {
    this.eventoService.eliminarEvento(idEvento).subscribe((data) => {
      if (data == "ok") {
        this.eliminado = "ok";
        this.cargarEventos(this.municipioUsuario);
      } else {
        this.eliminado = "error";
      }
    });
  }

  cargarEventos(municipio: string) {
    this.eventoService.getEventos().subscribe((resul) => {
      this.evento = resul;
      console.log(this.evento);
    });
  }

  verificarAccesoUsuario(): void {
    if (this.authService.getCurrentUser() == null) {
      this.isLogueado = false;
      this.ruta.navigateByUrl("/login-Admin");
    } else {
      this.isLogueado = true;
    }
  }

  irDetalleEvento(paramEvento: any) {
    console.log(paramEvento);
    this.eventoService.evento = paramEvento;
    this.ruta.navigateByUrl("/detalle-evento");
  }
}
