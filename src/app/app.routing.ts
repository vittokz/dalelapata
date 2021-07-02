import { UnidadMovilSolicitudesComponent } from "./pages/unidad-movil-solicitudes/unidad-movil-solicitudes.component";
import { UnidadMovilMunicipiosComponent } from "./pages/web/adopcion/adminPerfil/unidad-movil-municipios/unidad-movil-municipios.component";
import { UnidadMovilAdminImgDeleteComponent } from "./pages/unidad-movil-admin-img-delete/unidad-movil-admin-img-delete.component";
import { AdminBannerComponent } from "./pages/admin-banner/admin-banner.component";
import { UnidadMovilAdminImgComponent } from "./pages/unidad-movil-admin-img/unidad-movil-admin-img.component";
import { MascotasEsterilizadasComponent } from "./pages/mascotas-esterilizadas/mascotas-esterilizadas.component";
import { ListaEsterilizadasComponent } from "./pages/web/adopcion/lista-esterilizadas/lista-esterilizadas.component";
import { NotificacionesComponent } from "./pages/web/adopcion/adminPerfil/notificaciones/notificaciones.component";
import { MascotasListAlcaldiaComponent } from "./pages/mascotas-list-alcaldia/mascotas-list-alcaldia.component";
import { MascotasRegistroAlcaldiaComponent } from "./pages/mascotas-registro-alcaldia/mascotas-registro-alcaldia.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { FormFaunaComponent } from "./pages/fauna/form-fauna/form-fauna.component";
import { NoticiasFaunaComponent } from "./pages/fauna/noticias-fauna/noticias-fauna.component";
import { DetalleNoticiaComponent } from "./pages/fauna/detalle-noticia/detalle-noticia.component";
import { FormEventoComponent } from "./pages/eventosSADS/form-evento/form-evento.component";
import { EventosComponent } from "./pages/eventosSADS/eventos/eventos.component";
import { DetalleEventoComponent } from "./pages/eventosSADS/detalle-evento/detalle-evento.component";
import { FaunaSilvestreComponent } from "./pages/web/fauna-silvestre/fauna-silvestre.component";
import { PagEventosComponent } from "./pages/web/pag-eventos/pag-eventos.component";
import { PagDetalleFaunaComponent } from "./pages/web/pag-detalle-fauna/pag-detalle-fauna.component";
import { PagDetalleEventoComponent } from "./pages/web/pag-detalle-evento/pag-detalle-evento.component";
import { UsuariosSistemaComponent } from "./pages/usuarios-sistema/usuarios-sistema.component";
import { HomeComponent } from "./pages/web/home/home.component";
import { ListarFundacionesComponent } from "./pages/fundaciones/listar-fundaciones/listar-fundaciones.component";
import { DetalleFundacionComponent } from "./pages/fundaciones/detalle-fundacion/detalle-fundacion.component";
import { LoginAdminComponent } from "./pages/login-admin/login-admin.component";
import { FundacionUsuariosComponent } from "./pages/fundaciones/fundacion-usuarios/fundacion-usuarios.component";
import { ListarUsuariosComponent } from "./pages/usuarios-sistema/listar-usuarios/listar-usuarios.component";
import { ListarComponent } from "./pages/usuarios-pagina/listar/listar.component";
import { PaginaDetalleChipComponent } from "./pages/web/pagina-detalle-chip/pagina-detalle-chip.component";
import { MenuComponent } from "./pages/web/adopcion/menu/menu.component";
import { PaginaMicrochipComponent } from "./pages/web/pagina-microchip/pagina-microchip.component";
import { PrincipalComponent } from "./pages/web/adopcion/principal/principal.component";
import { UnidadMovilComponent } from "./pages/web/unidad-movil/unidad-movil.component";
import { DetalleMascotaWebComponent } from "./pages/web/adopcion/detalle-mascota-web/detalle-mascota-web.component";
import { ListarMascotasComponent } from "./pages/web/adopcion/listar-mascotas/listar-mascotas.component";
import { LoginUserComponent } from "./pages/web/adopcion/login-user/login-user.component";
import { RegistrarseComponent } from "./pages/web/adopcion/registrarse/registrarse.component";
import { RegistrarFundacionComponent } from "./pages/web/adopcion/registrar-fundacion/registrar-fundacion.component";
import { DetalleUsuarioPagComponent } from "./pages/web/adopcion/detalle-usuario-pag/detalle-usuario-pag.component";
import { PerfilPagComponent } from "./pages/web/adopcion/perfil-pag/perfil-pag.component";
import { ListaAdoptadasComponent } from "./pages/web/adopcion/lista-adoptadas/lista-adoptadas.component";
import { AdminComponent } from "./pages/web/adopcion/adminPerfil/admin/admin.component";
import { RegistrarMascotaComponent } from "./pages/web/adopcion/adminPerfil/registrar-mascota/registrar-mascota.component";
import { UsuariosAdminComponent } from "./pages/web/adopcion/adminPerfil/usuarios-admin/usuarios-admin.component";
import { PostulacionesComponent } from "./pages/web/adopcion/adminPerfil/postulaciones/postulaciones.component";
import { ListaExtraviadasComponent } from "./pages/web/adopcion/lista-extraviadas/lista-extraviadas.component";
import { DetalleMascotaAdoptadaComponent } from "./pages/web/adopcion/detalle-mascota-adoptada/detalle-mascota-adoptada.component";
import { ListaEncontradasComponent } from "./pages/web/adopcion/lista-encontradas/lista-encontradas.component";
import { PerfilMascotaComponent } from "./pages/web/adopcion/perfil-mascota/perfil-mascota.component";
import { MascotasPorAdoptarPerfilComponent } from "./pages/web/adopcion/adminPerfil/mascotas-por-adoptar-perfil/mascotas-por-adoptar-perfil.component";
import { MascotasComponent } from "./pages/mascotas/mascotas.component";
import { MascotasPorAdoptarAdminComponent } from "./pages/mascotas-por-adoptar-admin/mascotas-por-adoptar-admin.component";
import { MascotasExtraviadasAdminComponent } from "./pages/mascotas-extraviadas-admin/mascotas-extraviadas-admin.component";
import { MascotasEncontradasAdminComponent } from "./pages/mascotas-encontradas-admin/mascotas-encontradas-admin.component";
import { UnidadMovilAdminComponent } from "./pages/unidad-movil-admin/unidad-movil-admin.component";
import { AgregarLogroComponent } from "./pages/web/adopcion/agregar-logro/agregar-logro.component";
import { MascotasEncontradasPerfilComponent } from "./pages/web/adopcion/adminPerfil/mascotas-encontradas-perfil/mascotas-encontradas-perfil/mascotas-encontradas-perfil.component";
import { MascotasExtraviadasPerfilComponent } from "./pages/web/adopcion/adminPerfil/mascotas-extraviadas-perfil/mascotas-extraviadas-perfil/mascotas-extraviadas-perfil.component";
import { PopupAgregarLogroComponent } from "./pages/web/adopcion/adminPerfil/popupAgregarLogro/popup-agregar-logro/popup-agregar-logro.component";
import { ContratosComponent } from "./pages/web/adopcion/adminPerfil/contratos/contratos.component";
import { ListaPostuladosComponent } from "./pages/web/adopcion/adminPerfil/lista-postulados/lista-postulados/lista-postulados.component";
import { CambiarClaveComponent } from "./pages/web/adopcion/cambiar-clave/cambiar-clave.component";
import { AddMascotaComponent } from "./pages/add-mascota/add-mascota.component";
import { BuscarMascotaComponent } from "./pages/buscar-mascota/buscar-mascota.component";
import { ReporteCompletoComponent } from "./pages/reporte-completo/reporte-completo.component";
import { AgregraLogroAdminComponent } from "./pages/agregra-logro-admin/agregra-logro-admin.component";
import { MascotasMicrochipComponent } from "./pages/web/adopcion/adminPerfil/mascotas-microchip/mascotas-microchip.component";
import { EditarUserPaginaComponent } from "./pages/usuarios-pagina/editar-user-pagina/editar-user-pagina.component";
import { MascotasMicroChipComponent } from "./pages/mascotas-micro-chip/mascotas-micro-chip.component";
import { AddMascotaImagenComponent } from "./pages/add-mascota-imagen/add-mascota-imagen.component";
import { UnidadMovilSolicitudesDetalleComponent } from "./pages/unidad-movil-solicitudes-detalle/unidad-movil-solicitudes-detalle.component";
import { AdminPodCastComponent } from "./pages/admin-pod-cast/admin-pod-cast.component";
import { CapsulasComponent } from "./pages/capsulas/capsulas.component";
import { ListaCapsulasComponent } from "./pages/web/lista-capsulas/lista-capsulas.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "formFauna",
    component: FormFaunaComponent,
  },
  {
    path: "adminBanner",
    component: AdminBannerComponent,
  },
  {
    path: "noticias-Fauna",
    component: NoticiasFaunaComponent,
  },
  {
    path: "detalle-noticia",
    component: DetalleNoticiaComponent,
  },
  {
    path: "form-evento",
    component: FormEventoComponent,
  },
  {
    path: "eventos",
    component: EventosComponent,
  },
  {
    path: "detalle-evento/:parametro",
    component: DetalleEventoComponent,
  },
  {
    path: "fauna-silvestre",
    component: FaunaSilvestreComponent,
  },
  {
    path: "pagEventos",
    component: PagEventosComponent,
  },
  {
    path: "pagDetalleNoticias",
    component: PagDetalleFaunaComponent,
  },
  {
    path: "pagDetalleEventos/:idEvento",
    component: PagDetalleEventoComponent,
  },
  {
    path: "usuarios-sistema",
    component: UsuariosSistemaComponent,
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "lista-fundaciones",
    component: ListarFundacionesComponent,
  },
  {
    path: "detalle-fundacion",
    component: DetalleFundacionComponent,
  },
  {
    path: "login-Admin",
    component: LoginAdminComponent,
  },
  {
    path: "fundacionPorUsuario",
    component: FundacionUsuariosComponent,
  },
  {
    path: "listar-Usuarios",
    component: ListarUsuariosComponent,
  },
  {
    path: "listar-UsuariosPlataforma",
    component: ListarComponent,
  },
  {
    path: "buscarChip",
    component: PaginaMicrochipComponent,
  },
  {
    path: "pagAdopcion",
    component: PrincipalComponent,
  },
  {
    path: "lista-adoptadas",
    component: ListaAdoptadasComponent,
  },
  {
    path: "lista-esterilizadas",
    component: ListaEsterilizadasComponent,
  },
  {
    path: "unidadMovil",
    component: UnidadMovilComponent,
  },
  {
    path: "unidadMovilMunicipios",
    component: UnidadMovilMunicipiosComponent,
  },
  {
    path: "unidadMovilSolicitudes",
    component: UnidadMovilSolicitudesComponent,
  },
  {
    path: "unidadMovilSolicitudesDetalle/:parametro/:parametro2",
    component: UnidadMovilSolicitudesDetalleComponent,
  },
  {
    path: "unidadMovilImg/:parametro/:parametro2/:parametro3/:parametro4",
    component: UnidadMovilAdminImgComponent,
  },
  {
    path: "unidadMovilImg-eliminar/:parametro/:parametro2/:parametro3/:parametro4/:parametro5",
    component: UnidadMovilAdminImgDeleteComponent,
  },
  {
    path: "detalleChip/:parametro",
    component: PaginaDetalleChipComponent,
  },
  {
    path: "detalleMascotaWeb/:parametro",
    component: DetalleMascotaWebComponent,
  },
  {
    path: "mascotas",
    component: ListarMascotasComponent,
  },
  {
    path: "loginUser",
    component: LoginUserComponent,
  },
  {
    path: "registrarUsuarios",
    component: RegistrarseComponent,
  },
  {
    path: "registrarFundacion",
    component: RegistrarFundacionComponent,
  },
  {
    path: "detalleUsuarioPag/:parametro/:parametro2",
    component: DetalleUsuarioPagComponent,
  },
  {
    path: "detalleMascotaAdoptada/:parametro",
    component: DetalleMascotaAdoptadaComponent,
  },
  {
    path: "perfil-usuario",
    component: PerfilPagComponent,
  },
  {
    path: "registrar-mascota",
    component: RegistrarMascotaComponent,
  },
  {
    path: "administrar-perfil",
    component: AdminComponent,
  },
  {
    path: "usuarios-perfil",
    component: UsuariosAdminComponent,
  },
  {
    path: "postulaciones",
    component: PostulacionesComponent,
  },
  {
    path: "lista-extraviadas",
    component: ListaExtraviadasComponent,
  },
  {
    path: "lista-encontradas",
    component: ListaEncontradasComponent,
  },
  {
    path: "mascotas-PorAdoptadarPerfil",
    component: MascotasPorAdoptarPerfilComponent,
  },
  {
    path: "mascotas-EncontradasPerfil",
    component: MascotasEncontradasPerfilComponent,
  },
  {
    path: "mascotas-ExtraviadasPerfil",
    component: MascotasExtraviadasPerfilComponent,
  },
  {
    path: "mascotas-admin",
    component: MascotasComponent,
  },
  {
    path: "mascotasPorAdoptar-admin",
    component: MascotasPorAdoptarAdminComponent,
  },
  {
    path: "mascotasEsterilizadas-admin",
    component: MascotasEsterilizadasComponent,
  },
  {
    path: "mascotasExtraviadas-admin",
    component: MascotasExtraviadasAdminComponent,
  },
  {
    path: "unidadMovil-admin",
    component: UnidadMovilAdminComponent,
  },
  {
    path: "perfil-mascota/:parametro",
    component: PerfilMascotaComponent,
  },
  {
    path: "lista-postulados/:parametro",
    component: ListaPostuladosComponent,
  },
  {
    path: "mascotasEncontradas-admin",
    component: MascotasEncontradasAdminComponent,
  },
  {
    path: "contratos-admin",
    component: ContratosComponent,
  },
  {
    path: "cambiar-clave",
    component: CambiarClaveComponent,
  },
  {
    path: "add-mascota",
    component: AddMascotaComponent,
  },
  {
    path: "add-mascota-images/:parametro",
    component: AddMascotaImagenComponent,
  },
  {
    path: "buscar-mascota",
    component: BuscarMascotaComponent,
  },
  {
    path: "popupAgregarLogro/:parametro/:parametro2",
    component: PopupAgregarLogroComponent,
  },
  {
    path: "agregarLogro/:parametro/:parametro2",
    component: AgregarLogroComponent,
  },
  {
    path: "mascota-registro-alcaldia",
    component: MascotasRegistroAlcaldiaComponent,
  },
  {
    path: "reporte-completo",
    component: ReporteCompletoComponent,
  },
  {
    path: "mascota-list-alcaldia",
    component: MascotasListAlcaldiaComponent,
  },
  {
    path: "mascota-microChipPerfil",
    component: MascotasMicrochipComponent,
  },
  {
    path: "agregarLogroAdmin/:parametro/:parametro2",
    component: AgregraLogroAdminComponent,
  },
  {
    path: "editarUserPagina/:parametro/",
    component: EditarUserPaginaComponent,
  },
  {
    path: "mascotasMicroChip-Admin",
    component: MascotasMicroChipComponent,
  },
  {
    path: "AdminPodCast",
    component: AdminPodCastComponent,
  },
  {
    path: "capsulas",
    component: CapsulasComponent,
  },
  {
    path: "listaCapsulas",
    component: ListaCapsulasComponent,
  },
  {
    path: "notificaciones",
    component: NotificacionesComponent,
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/admin-layout/admin-layout.module#AdminLayoutModule",
      },
    ],
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/auth-layout/auth-layout.module#AuthLayoutModule",
      },
    ],
  },
  {
    path: "**",
    redirectTo: "home",
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
