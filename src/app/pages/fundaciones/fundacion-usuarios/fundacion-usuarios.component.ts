import { Component, OnInit } from '@angular/core';
import { UserPagina } from '../../../modelos/modulo-usuario/usuarioPagina-modelo';
import { FundacionService } from '../../../servicios/fundacion/fundacion.service';
import { Fundacion } from '../../../modelos/modulo-fundacion/fundacion-modelo';

@Component({
  selector: 'app-fundacion-usuarios',
  templateUrl: './fundacion-usuarios.component.html',
  styleUrls: ['./fundacion-usuarios.component.css']
})
export class FundacionUsuariosComponent implements OnInit {
  usuarioPag: UserPagina[];
  fundacion: Fundacion= new Fundacion();

  constructor(public fundacionService: FundacionService) {
    this.fundacion = fundacionService.fundacion;
   
   }

  ngOnInit(): void {
    this.cargarUsuariosFundacion();    
  }

  cargarUsuariosFundacion(){
      console.log(this.fundacion.idFundacion);
      this.fundacionService.getUsuariosFundacion(this.fundacion.idFundacion).subscribe(
        (data)=>{
          console.log(data);
          this.usuarioPag = data;
         
        }
      );
  }
}
