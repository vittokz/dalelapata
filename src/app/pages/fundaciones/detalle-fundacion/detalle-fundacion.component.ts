import { Component, OnInit, Injectable } from '@angular/core';
import { FundacionService } from '../../../servicios/fundacion/fundacion.service';
import { Fundacion, tipoFundacion } from '../../../modelos/modulo-fundacion/fundacion-modelo';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TipoFundacionService } from '../../../servicios/fundacion/tipo-fundacion.service';

@Component({
  selector: 'app-detalle-fundacion',
  templateUrl: './detalle-fundacion.component.html',
  styleUrls: ['./detalle-fundacion.component.css']
})
export class DetalleFundacionComponent implements OnInit {
  fundacionDetalle: Fundacion= new Fundacion();
  tipFundacion: tipoFundacion[];
  resul:any;
  nomFundacion: string;
  constructor(private fundacionService: FundacionService, private ruta: Router,
    private tipoFundaService: TipoFundacionService) { 
    this.fundacionDetalle = fundacionService.fundacion;
  }
 
  ngOnInit(): void {
    this.tipoFundaService.getTipoFundaciones().subscribe(
      (resul)=>{
        this.tipFundacion = resul;
        for(let itemFunda of this.tipFundacion){
           if(itemFunda.idTipo==this.fundacionDetalle.idTipoFundacion){
               this.nomFundacion=itemFunda.nombre;
           }
       }
       // console.log(this.tipFundacion);
      }
    );
     
    // this.buscarNombreFund(this.fundacionDetalle.idTipoFundacion);
  }
}
