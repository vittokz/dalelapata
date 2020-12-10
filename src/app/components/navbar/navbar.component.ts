import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthUsuariosService } from '../../servicios/usuariosAdmin/auth-usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  isLogueado :Boolean=false;
  constructor(location: Location,  private element: ElementRef, private router: Router,
    private authService: AuthUsuariosService, private ruta: Router) {
    this.location = location;
  }

  ngOnInit() {
    this.verificarAccesoUsuario();
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }

  verificarAccesoUsuario(): void{
    if(this.authService.getCurrentUser() == null){
      this.isLogueado=false;
      this.ruta.navigateByUrl('/login-Admin');
    }
   else{
     this.isLogueado=true;
    }
}

  logout(){
     this.authService.logoutUser();
     this.ruta.navigateByUrl('/home');
  }

  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

}
