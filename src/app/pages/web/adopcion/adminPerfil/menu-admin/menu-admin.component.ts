import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserPlataformaService } from "src/app/servicios/userPlataforma/user-plataforma.service";
@Component({
  selector: "app-menu-admin",
  templateUrl: "./menu-admin.component.html",
  styleUrls: ["./menu-admin.component.css"],
})
export class MenuAdminComponent implements OnInit {
  public show: Boolean = false;
  constructor(
    private ruta: Router,
    private userPlataforma: UserPlataformaService
  ) {}

  ngOnInit(): void {
    this.show = true;
  }
  inicio() {
    this.ruta.navigateByUrl("/perfil-usuario");
  }

  salir() {
    this.userPlataforma.logoutUser();
    this.ruta.navigateByUrl("/home");
  }
}
