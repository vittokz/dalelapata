import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserPlataformaService } from '../../../../servicios/userPlataforma/user-plataforma.service';


declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/home', title: 'Mascotas',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/home', title: 'Registrarse',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/home', title: 'Perfil',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/home', title: 'Login',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/home', title: 'Cerrar',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/home', title: 'Contactenos',  icon: 'ni-tv-2 text-primary', class: '' }
];

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;
  public isLogueado: Boolean=false;
  nomUsuario: string;
  constructor(private router: Router, private userPlataforma: UserPlataformaService) { }

  ngOnInit(): void {
    this.verificarAccesoUsuario();
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  inicio(){
    this.router.navigateByUrl("/home");
  }

  verificarAccesoUsuario(): void{
    if(this.userPlataforma.getCurrentUser() == null){
      this.isLogueado=false;
     }
   else{
     this.isLogueado=true;
     this.nomUsuario=this.userPlataforma.getCurrentUser();
    }
  }

  salir(){
    this.userPlataforma.logoutUser();
    this.router.navigateByUrl("/home");
  }

}
