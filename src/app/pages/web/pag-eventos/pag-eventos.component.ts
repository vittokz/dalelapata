import { environment } from "src/environments/environment.prod";
import { Component, OnInit } from "@angular/core";
import { EventosService } from "../../../servicios/eventos/eventos.service";
import { Router } from "@angular/router";
import { Eventos } from "../../../modelos/modulo-eventos/evento-modelo";
import { MascotasService } from "src/app/servicios/mascotas/mascotas.service";
import { Ciudad } from "src/app/modelos/modulo-ciudades/ciudades-modelo";
import { UserPlataformaService } from "src/app/servicios/userPlataforma/user-plataforma.service";
import { UserPagina } from "src/app/modelos/modulo-usuario/usuarioPagina-modelo";
import { Fundacion } from "src/app/modelos/modulo-fundacion/fundacion-modelo";
import { FundacionService } from "src/app/servicios/fundacion/fundacion.service";

@Component({
  selector: "app-pag-eventos",
  templateUrl: "./pag-eventos.component.html",
  styleUrls: ["./pag-eventos.component.css"],
})
export class PagEventosComponent implements OnInit {
  evento: Eventos;
  url: string = environment.url;
  ciudades: Ciudad[];
  public isCollapsed = true;
  municipio: string;
  listaNoticias: Eventos[];
  cantidad: number;
  showModal2 = false;
  imagen: string;
  razonSocial: string;
  public isLogueado: Boolean = false;
  nomUsuario: string;
  identidadUsuario: string;
  idFundacion: string;
  fundacion: Fundacion;
  identidadFundacion: string;

  usuario: UserPagina;

  constructor(
    private eventoService: EventosService,
    private ruta: Router,
    private mascotaService: MascotasService,
    private userPlataforma: UserPlataformaService,
    private fundacionService: FundacionService
  ) {}

  ngOnInit(): void {
    this.razonSocial = "";
    this.verificarAccesoUsuario();
    this.ruta.events.subscribe((event) => {
      this.isCollapsed = true;
    });
    this.municipio = "Pasto";
    this.cargarDatos();
    this.cargarCiudades();
  }

  verificarAccesoUsuario(): void {
    if (this.userPlataforma.getCurrentUser() == null) {
      this.isLogueado = false;
    } else {
      this.isLogueado = true;
      this.nomUsuario = this.userPlataforma.getCurrentUser();
      this.cargarDatosUsuario();
    }
  }

  cargarDatosUsuario() {
    this.userPlataforma
      .getUsuarioIdentidad(this.nomUsuario)
      .subscribe((data) => {
        this.usuario = data;
        this.idFundacion = this.usuario[0].idFundacion;
        this.cargarDatosFundacion(this.idFundacion);
      });
  }

  cargarDatosFundacion(idFundacion: string) {
    this.fundacionService.getFundacionId(idFundacion).subscribe((resul) => {
      this.fundacion = resul;
      this.razonSocial = this.fundacion[0].razonSocial;
    });
  }

  salir() {
    this.userPlataforma.logoutUser();
    this.ruta.navigateByUrl("/home");
  }

  inicio() {
    this.ruta.navigateByUrl("/home");
  }

  cargarCiudades() {
    this.mascotaService.getCiudades().subscribe((dataCiudades) => {
      this.ciudades = dataCiudades;
    });
  }

  cerrarModal2() {
    this.showModal2 = false;
  }

  activarMunicipio(evento) {
    this.municipio = evento.target.value;
    this.eventoService
      .getEventosByMunicipio(this.municipio)
      .subscribe((data) => {
        this.listaNoticias = data;
      });
  }

  cargarDatos() {
    this.eventoService.getEventos().subscribe((resul) => {
      this.listaNoticias = resul;
    });
  }

  irDetalleEvento(even: Eventos) {
    this.imagen = even.urlImagen;
    this.showModal2 = true;
  }
}
