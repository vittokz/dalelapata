import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUsuariosService } from 'src/app/servicios/usuariosAdmin/auth-usuarios.service';
import { UserInterface } from '../../modelos/modulo-usuariosAdmin/usuarioAdmin-modelo';
import { AdopcionService } from 'src/app/servicios/adopcion/adopcion.service';
import { Mascota } from 'src/app/modelos/modulo-mascota/mascota-modulo';
import { ExportarService } from 'src/app/servicios/exportarExcel/exportar.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Bienvenido-Sistema de Administración- Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'Perfil Usuario',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/tables', title: 'Reportes',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/formFauna', title: 'Registrar Noticia',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/noticias-Fauna', title: 'Lista de Noticias',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/detalle-noticia', title: 'Detalle Noticia Seleccionada',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/form-evento', title: 'Registrar Eventos',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/eventos', title: 'Lista de Eventos',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/detalle-evento/:parametro', title: 'Detalle Evento Seleccionado',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/usuarios-sistema', title: 'Registrar Nuevos Usuarios',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/lista-fundaciones', title: 'Fundaciones',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/detalle-fundacion', title: 'Detalle Fundación Seleccionada',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/fundacionPorUsuario', title: 'Usuarios por Fundación',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/listar-Usuarios', title: 'Usuarios del Sistema',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/listar-UsuariosPlataforma', title: 'Usuarios Plataforma Web',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/mascotas-admin', title: 'Lista de Mascotas Adoptadas',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/mascotasPorAdoptar-admin', title: 'Lista de Mascotas Por Adoptar',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/mascotasExtraviadas-admin', title: 'Lista de Mascotas Extraviadas',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/mascotasEncontradas-admin', title: 'Lista de Mascotas Encontradas',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/unidadMovil-admin', title: 'Modulo Unidad Movil',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/add-mascota', title: 'Agregar Mascota',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/buscar-mascota', title: 'Buscar Mascota',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/reporte-completo', title: 'Reporte Completo',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/agregarLogroAdmin', title: 'Agregar logro o vivencia Mascota',  icon:'ni-circle-08 text-pink', class: '' }
  ];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  identidadUsuario:string;
  public menuItems: any[];
  public isCollapsed = true;
  tipoUsuario: string;
  usuarioLogueado: UserInterface[];
  datosReporteCompleto: any[]; 
  

  constructor(private router: Router,private authService: AuthUsuariosService) { }

  ngOnInit() {
    this.identidadUsuario = this.authService.getCurrentUser();
    this.cargarUsuario(this.identidadUsuario);
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  
  cargarUsuario(identidad:string){
    this.authService.getUsuarioPorIdentidad(identidad).subscribe(
      data=>{
          this.usuarioLogueado = data;
          this.tipoUsuario = this.usuarioLogueado[0].tipoUsuario;        
      }
    );
  }
  logout(){
    this.authService.logoutUser();
    this.router.navigateByUrl('/home');
 }
}
