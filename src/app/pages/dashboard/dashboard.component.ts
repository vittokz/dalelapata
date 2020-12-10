import { Component, OnInit } from '@angular/core';
import { AuthUsuariosService } from '../../servicios/usuariosAdmin/auth-usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isLogueado :Boolean=false;
  constructor(private authService: AuthUsuariosService, private ruta: Router) { }

  ngOnInit() {
    this.verificarAccesoUsuario();
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
}
