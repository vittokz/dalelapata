import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {
  public show:Boolean=false;
  constructor(private ruta: Router) { }

  ngOnInit(): void {
    this.show = true; 
  }
  inicio(){
    this.ruta.navigateByUrl("/perfil-usuario");
  }

}
