import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { UserPlataformaService } from '../../../../servicios/userPlataforma/user-plataforma.service';
import { UserPagina } from 'src/app/modelos/modulo-usuario/usuarioPagina-modelo';
import { Fundacion } from '../../../../modelos/modulo-fundacion/fundacion-modelo';
import { FundacionService } from '../../../../servicios/fundacion/fundacion.service';

@Component({
  selector: 'app-detalle-usuario-pag',
  templateUrl: './detalle-usuario-pag.component.html',
  styleUrls: ['./detalle-usuario-pag.component.css']
})
export class DetalleUsuarioPagComponent implements OnInit {
  datoUsuario: { idUsuario: string, idFundacion:string };
  usuarioEncontrado : UserPagina;
  fundacionEncontrada: Fundacion;
  constructor(private rutaActiva: ActivatedRoute, private userServicio: UserPlataformaService,
    private fundacionService:FundacionService) { }

  ngOnInit(): void {
    this.datoUsuario = {
      idUsuario: this.rutaActiva.snapshot.params.parametro,
      idFundacion: this.rutaActiva.snapshot.params.parametro2
    }
    this.cargarUsuario(this.datoUsuario.idUsuario);
    this.cargarFundacion(this.datoUsuario.idFundacion);
  }

  cargarUsuario(idUsuario: string){
     this.userServicio.getUsuarioId(idUsuario).subscribe(
       (data)=>{
         this.usuarioEncontrado = data;
       }
     )
  }

  cargarFundacion(idFundacion: string){
    this.fundacionService.getFundacionId(idFundacion).subscribe(
      (data)=>{
        this.fundacionEncontrada = data;
      }
    )
 }

}
