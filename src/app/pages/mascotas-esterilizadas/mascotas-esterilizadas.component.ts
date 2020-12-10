import { Component, OnInit } from '@angular/core';
import { Fundacion } from 'src/app/modelos/modulo-fundacion/fundacion-modelo';
import { Mascota } from 'src/app/modelos/modulo-mascota/mascota-modulo';
import { ExportarService } from 'src/app/servicios/exportarExcel/exportar.service';
import { FundacionService } from 'src/app/servicios/fundacion/fundacion.service';
import { MascotasService } from 'src/app/servicios/mascotas/mascotas.service';

@Component({
  selector: 'app-mascotas-esterilizadas',
  templateUrl: './mascotas-esterilizadas.component.html',
  styleUrls: ['./mascotas-esterilizadas.component.css']
})
export class MascotasEsterilizadasComponent implements OnInit {

  mascotas: Mascota[];
  cantidad: Number;
  fundaciones: Fundacion[];
  mascotasSel: Mascota[];
  idBuscar: string;
  constructor(private mascotaService: MascotasService,private fundacionService: FundacionService,
    private exportExcelService: ExportarService) { }

  ngOnInit(): void {
    this.cargarMascotasEncontradas();
     this.cargarFundaciones();
  }
  generarExcel(jsonElmentos: any[],nombreArchivo:string):void{
    this.exportExcelService.exportExcel(jsonElmentos,nombreArchivo);
  }


  cargarMascotasEncontradas(){
    this.mascotaService.getMascotasEsterilizadas().subscribe(
      data=>{
        this.mascotas = data;
        this.cantidad =this.mascotas.length;
      }
    )
  }

  cargarFundaciones(){
    this.fundacionService.getFundaciones().subscribe(
      data=>{
        this.fundaciones = data;
      }
    )
  }

}
