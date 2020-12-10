import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { FormFaunaComponent } from './pages/fauna/form-fauna/form-fauna.component';
import { FaunaService } from './servicios/fauna/fauna.service';
import { HttpClientModule, HttpHeaders} from '@angular/common/http';
import { NoticiasFaunaComponent } from './pages/fauna/noticias-fauna/noticias-fauna.component';
import { DetalleNoticiaComponent } from './pages/fauna/detalle-noticia/detalle-noticia.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { FormEventoComponent } from './pages/eventosSADS/form-evento/form-evento.component';
import { EventosService } from './servicios/eventos/eventos.service';
import { EventosComponent } from './pages/eventosSADS/eventos/eventos.component';
import { DetalleEventoComponent } from './pages/eventosSADS/detalle-evento/detalle-evento.component';
import { FaunaSilvestreComponent } from './pages/web/fauna-silvestre/fauna-silvestre.component';
import { PagEventosComponent } from './pages/web/pag-eventos/pag-eventos.component';
import { PagDetalleFaunaComponent } from './pages/web/pag-detalle-fauna/pag-detalle-fauna.component';
import { PagDetalleEventoComponent } from './pages/web/pag-detalle-evento/pag-detalle-evento.component';
import { UsuariosSistemaComponent } from './pages/usuarios-sistema/usuarios-sistema.component';
import { HomeComponent } from './pages/web/home/home.component';
import { MenuFlotanteComponent } from './pages/web/menu-flotante/menu-flotante.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FooterPaginasComponent } from './pages/web/footer-paginas/footer-paginas.component';
import { ListarFundacionesComponent } from './pages/fundaciones/listar-fundaciones/listar-fundaciones.component';
import { FundacionService } from './servicios/fundacion/fundacion.service';
import { DetalleFundacionComponent } from './pages/fundaciones/detalle-fundacion/detalle-fundacion.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { AuthUsuariosService } from './servicios/usuariosAdmin/auth-usuarios.service';
import { FundacionUsuariosComponent } from './pages/fundaciones/fundacion-usuarios/fundacion-usuarios.component';
import { AgmCoreModule} from '@agm/core';
import { FiltroPipe } from './pipes/filtro.pipe';
import { ListarUsuariosComponent } from './pages/usuarios-sistema/listar-usuarios/listar-usuarios.component';
import { ListarComponent } from './pages/usuarios-pagina/listar/listar.component';
import { UserPlataformaService } from './servicios/userPlataforma/user-plataforma.service';
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";
import { PaginaMicrochipComponent } from './pages/web/pagina-microchip/pagina-microchip.component'; 
import { MascotasService } from './servicios/mascotas/mascotas.service';
import { PaginaDetalleChipComponent } from './pages/web/pagina-detalle-chip/pagina-detalle-chip.component';
import { MenuComponent } from './pages/web/adopcion/menu/menu.component';
import { BannerComponent } from './pages/web/adopcion/banner/banner.component';
import { PrincipalComponent } from './pages/web/adopcion/principal/principal.component';
import { ListarMascotasComponent } from './pages/web/adopcion/listar-mascotas/listar-mascotas.component';
import { UnidadMovilComponent } from './pages/web/unidad-movil/unidad-movil.component';
import { MapaService } from './servicios/mapa/mapa.service';
import { DetalleMascotaWebComponent } from './pages/web/adopcion/detalle-mascota-web/detalle-mascota-web.component';
import { LoginUserComponent } from './pages/web/adopcion/login-user/login-user.component';
import { RegistrarseComponent } from './pages/web/adopcion/registrarse/registrarse.component';
import { RegistrarFundacionComponent } from './pages/web/adopcion/registrar-fundacion/registrar-fundacion.component';
import { DetalleUsuarioPagComponent } from './pages/web/adopcion/detalle-usuario-pag/detalle-usuario-pag.component';
import { AdopcionService } from './servicios/adopcion/adopcion.service';
import { ContenidoComponent } from './pages/web/adopcion/contenido/contenido.component';
import { PerfilPagComponent } from './pages/web/adopcion/perfil-pag/perfil-pag.component';
import { ExportarService } from './servicios/exportarExcel/exportar.service';
import { FlxUiDatatableModule,FlxUiDataTable } from 'flx-ui-datatable';
import { ListaAdoptadasComponent } from './pages/web/adopcion/lista-adoptadas/lista-adoptadas.component';
import { BannerAdopcionComponent } from './pages/web/adopcion/banner-adopcion/banner-adopcion.component';
import { AdminComponent } from './pages/web/adopcion/adminPerfil/admin/admin.component';
import { MenuAdminComponent } from './pages/web/adopcion/adminPerfil/menu-admin/menu-admin.component';
import { RegistrarMascotaComponent } from './pages/web/adopcion/adminPerfil/registrar-mascota/registrar-mascota.component';
import { UsuariosAdminComponent } from './pages/web/adopcion/adminPerfil/usuarios-admin/usuarios-admin.component';
import { PostulacionesComponent } from './pages/web/adopcion/adminPerfil/postulaciones/postulaciones.component';
import { ListaExtraviadasComponent } from './pages/web/adopcion/lista-extraviadas/lista-extraviadas.component';
import { DetalleMascotaAdoptadaComponent } from './pages/web/adopcion/detalle-mascota-adoptada/detalle-mascota-adoptada.component';
import { ListaEncontradasComponent } from './pages/web/adopcion/lista-encontradas/lista-encontradas.component';
import { PerfilMascotaComponent } from './pages/web/adopcion/perfil-mascota/perfil-mascota.component';
import { MascotasPorAdoptarPerfilComponent } from './pages/web/adopcion/adminPerfil/mascotas-por-adoptar-perfil/mascotas-por-adoptar-perfil.component';
import { ContratosComponent } from './pages/web/adopcion/adminPerfil/contratos/contratos.component';
import { MascotasComponent } from './pages/mascotas/mascotas.component';
import { MascotasPorAdoptarAdminComponent } from './pages/mascotas-por-adoptar-admin/mascotas-por-adoptar-admin.component';
import { MascotasExtraviadasAdminComponent } from './pages/mascotas-extraviadas-admin/mascotas-extraviadas-admin.component';
import { MascotasEncontradasAdminComponent } from './pages/mascotas-encontradas-admin/mascotas-encontradas-admin.component';
import { UnidadMovilAdminComponent } from './pages/unidad-movil-admin/unidad-movil-admin.component';
import { VisitasMovilService } from './servicios/visitas-movil/visitas-movil.service';
import { EnviarEmailService } from './servicios/enviarEmail/enviar-email.service';
import { AgregarLogroComponent } from './pages/web/adopcion/agregar-logro/agregar-logro.component';
import { LogroService } from './servicios/logros/logro.service';
import { MascotasExtraviadasPerfilComponent } from './pages/web/adopcion/adminPerfil/mascotas-extraviadas-perfil/mascotas-extraviadas-perfil/mascotas-extraviadas-perfil.component';
import { MascotasEncontradasPerfilComponent } from './pages/web/adopcion/adminPerfil/mascotas-encontradas-perfil/mascotas-encontradas-perfil/mascotas-encontradas-perfil.component';
import { PopupAgregarLogroComponent } from './pages/web/adopcion/adminPerfil/popupAgregarLogro/popup-agregar-logro/popup-agregar-logro.component';
import { ModalModule,BsModalRef } from 'ngx-bootstrap/modal';
import { PopupVerLogrosComponent } from './pages/web/adopcion/adminPerfil/popupVerLogros/popup-ver-logros/popup-ver-logros.component';
import { ListaPostuladosComponent } from './pages/web/adopcion/adminPerfil/lista-postulados/lista-postulados/lista-postulados.component';
import { CambiarClaveComponent } from './pages/web/adopcion/cambiar-clave/cambiar-clave.component';
import { AddMascotaComponent } from './pages/add-mascota/add-mascota.component';
import { BuscarMascotaComponent } from './pages/buscar-mascota/buscar-mascota.component';
import { DxDataGridModule, DxTemplateModule } from 'devextreme-angular';
import { MascotasRegistroAlcaldiaComponent } from './pages/mascotas-registro-alcaldia/mascotas-registro-alcaldia.component';
import { MascotasListAlcaldiaComponent } from './pages/mascotas-list-alcaldia/mascotas-list-alcaldia.component';
import { ReporteCompletoComponent } from './pages/reporte-completo/reporte-completo.component';
import { AgregraLogroAdminComponent } from './pages/agregra-logro-admin/agregra-logro-admin.component';
import { MascotasMicrochipComponent } from './pages/web/adopcion/adminPerfil/mascotas-microchip/mascotas-microchip.component';
import { EditarUserPaginaComponent } from './pages/usuarios-pagina/editar-user-pagina/editar-user-pagina.component';
import { MascotasMicroChipComponent } from './pages/mascotas-micro-chip/mascotas-micro-chip.component';
import { NotificacionesComponent } from './pages/web/adopcion/adminPerfil/notificaciones/notificaciones.component';
import { ListaEsterilizadasComponent } from './pages/web/adopcion/lista-esterilizadas/lista-esterilizadas.component';
import { MascotasEsterilizadasComponent } from './pages/mascotas-esterilizadas/mascotas-esterilizadas.component';

PdfMakeWrapper.setFonts(pdfFonts);
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    FlxUiDatatableModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    DxDataGridModule,
    DxTemplateModule,
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    CarouselModule.forRoot(),
    AlertModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey:''
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    FormFaunaComponent,
    NoticiasFaunaComponent,
    DetalleNoticiaComponent,
    FormEventoComponent,
    EventosComponent,
    DetalleEventoComponent,
    FaunaSilvestreComponent,
    PagEventosComponent,
    PagDetalleFaunaComponent,
    PagDetalleEventoComponent,
    UsuariosSistemaComponent,
    HomeComponent,
    MenuFlotanteComponent,
    FooterPaginasComponent,
    ListarFundacionesComponent,
    DetalleFundacionComponent,
    LoginAdminComponent,
    FundacionUsuariosComponent,
    FiltroPipe,
    ListarUsuariosComponent,
    ListarComponent,
    PaginaMicrochipComponent,
    PaginaDetalleChipComponent,
    MenuComponent,
    BannerComponent,
    PrincipalComponent,
    ListarMascotasComponent,
    UnidadMovilComponent,
    DetalleMascotaWebComponent,
    LoginUserComponent,
    RegistrarseComponent,
    RegistrarFundacionComponent,
    DetalleUsuarioPagComponent,
    ContenidoComponent,
    PerfilPagComponent,
    ListaAdoptadasComponent,
    BannerAdopcionComponent,
    AdminComponent,
    MenuAdminComponent,
    RegistrarMascotaComponent,
    UsuariosAdminComponent,
    PostulacionesComponent,
    ListaExtraviadasComponent,
    DetalleMascotaAdoptadaComponent,
    ListaEncontradasComponent,
    PerfilMascotaComponent,
    MascotasPorAdoptarPerfilComponent,
    ContratosComponent,
    MascotasComponent,
    MascotasPorAdoptarAdminComponent,
    MascotasExtraviadasAdminComponent,
    MascotasEncontradasAdminComponent,
    UnidadMovilAdminComponent,
    AgregarLogroComponent,
    MascotasExtraviadasPerfilComponent,
    MascotasEncontradasPerfilComponent,
    PopupAgregarLogroComponent,
    PopupVerLogrosComponent,
    ListaPostuladosComponent,
    CambiarClaveComponent,
    AddMascotaComponent,
    BuscarMascotaComponent,
    MascotasRegistroAlcaldiaComponent,
    MascotasListAlcaldiaComponent,
    ReporteCompletoComponent,
    AgregraLogroAdminComponent,
    MascotasMicrochipComponent,
    EditarUserPaginaComponent,
    MascotasMicroChipComponent,
    NotificacionesComponent,
    ListaEsterilizadasComponent,
    MascotasEsterilizadasComponent
   ],
  providers: [
    FaunaService, EventosService,FundacionService, AuthUsuariosService, UserPlataformaService,LogroService,
    MascotasService, MapaService,AdopcionService,ExportarService,FlxUiDataTable,VisitasMovilService,EnviarEmailService,
    BsModalRef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
