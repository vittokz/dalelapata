import { Component, OnInit } from '@angular/core';
import { UserPlataformaService } from '../../../../../../servicios/userPlataforma/user-plataforma.service';
import { LogroService } from '../../../../../../servicios/logros/logro.service';
import { Logros } from '../../../../../../modelos/modulo-logros/logros-modelo';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-popup-ver-logros',
  templateUrl: './popup-ver-logros.component.html',
  styleUrls: ['./popup-ver-logros.component.css']
})
export class PopupVerLogrosComponent implements OnInit {
  identidadUsuario: string;
  listaLogro: Logros[];
  public isLogueado: Boolean=false;
  modalRef: BsModalRef;
  
  constructor( private userPlataformaService: UserPlataformaService, private logroService: LogroService,
    private ruta: Router,private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    
    this.identidadUsuario = this.userPlataformaService.getCurrentUser();
    this.verificarAccesoUsuario();
    this.cargarLogros();
  }

  verificarAccesoUsuario(): void{
    if(this.userPlataformaService.getCurrentUser() == null){
      this.isLogueado=false;
      this.ruta.navigateByUrl('/loginUser');
     }
   else{
     this.isLogueado=true;
     
    }
  }

  cerrar(){
    this.bsModalRef.hide()
  }
  cargarLogros(){
    this.logroService.getAllLogros().subscribe(
      data=>{
        this.listaLogro = data;
      }
    )
  }

}
