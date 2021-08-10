import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Banner } from "src/app/modelos/modulo-banner/banner-modelo";
import { Capsulas } from "src/app/modelos/modulo-capsulas/capsulas-modelo";
import { Fundacion } from "src/app/modelos/modulo-fundacion/fundacion-modelo";
import { UserPagina } from "src/app/modelos/modulo-usuario/usuarioPagina-modelo";
import { AdminBannerService } from "src/app/servicios/adminBanner/admin-banner.service";
import { CapsulasService } from "src/app/servicios/capsulas/capsulas.service";
import { FundacionService } from "src/app/servicios/fundacion/fundacion.service";
import { UserPlataformaService } from "src/app/servicios/userPlataforma/user-plataforma.service";
import { environment } from "src/environments/environment.prod";
@Component({
  selector: "app-lista-capsulas",
  templateUrl: "./lista-capsulas.component.html",
  styleUrls: ["./lista-capsulas.component.css"],
})
export class ListaCapsulasComponent implements OnInit {
  listaCapsulas: Capsulas[];
  url: string = environment.url;
  showModal2 = false;
  public isCollapsed = true;
  listaBanner: Banner[];
  imagen: string;
  public isLogueado: Boolean = false;
  nomUsuario: string;
  razonSocial: string;

  identidadUsuario: string;
  idFundacion: string;
  fundacion: Fundacion;
  identidadFundacion: string;
  municipio: string;
  usuario: UserPagina;
  constructor(
    private capsulasService: CapsulasService,
    private ruta: Router,
    private bannerService: AdminBannerService,
    private userPlataforma: UserPlataformaService,
    private fundacionService: FundacionService
  ) {}

  ngOnInit(): void {
    this.razonSocial = "";
    this.cargarDatos();
    this.cargarBanner();
    this.verificarAccesoUsuario();
    this.ruta.events.subscribe((event) => {
      this.isCollapsed = true;
    });
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

  cargarBanner() {
    this.bannerService.getBannerActivos().subscribe((resul) => {
      this.listaBanner = resul;
    });
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
  cargarDatos() {
    this.capsulasService.getAllCapsulas().subscribe((resul) => {
      this.listaCapsulas = resul;
    });
  }

  inicio() {
    this.ruta.navigateByUrl("/home");
  }

  cerrarModal2() {
    this.showModal2 = false;
  }

  irDetalleNoticia(capsula: Capsulas) {
    this.imagen = capsula.url;
    this.showModal2 = true;
  }
}
