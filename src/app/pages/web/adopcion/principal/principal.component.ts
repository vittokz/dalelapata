import { Component, OnInit } from '@angular/core';
import { MascotasService } from '../../../../servicios/mascotas/mascotas.service';
import { Mascota } from '../../../../modelos/modulo-mascota/mascota-modulo';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
   
  }

  

}
