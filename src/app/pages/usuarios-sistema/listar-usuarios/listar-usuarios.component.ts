import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUsuariosService } from '../../../servicios/usuariosAdmin/auth-usuarios.service';
import { UserInterface } from '../../../modelos/modulo-usuariosAdmin/usuarioAdmin-modelo';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {
  usuario: UserInterface[];
  constructor(private ruta: Router, private usuarioAdminService: AuthUsuariosService ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.usuarioAdminService.getUsuarios().subscribe(
      (data)=>{
          this.usuario = data;
          console.log(this.usuario); 
      } 
    );
  }

  buscarUsuario(event){
     let nomBuscar = event;
     if(nomBuscar==""){
        this.cargarUsuarios();
     }
     this.usuario = this.usuario.filter(xUsuario=>{
        return xUsuario.nombre.toLocaleUpperCase().includes(nomBuscar.toLocaleUpperCase());
     })
  }

}
