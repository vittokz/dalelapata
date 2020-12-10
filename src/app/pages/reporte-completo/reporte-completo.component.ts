import { Component, OnInit } from '@angular/core';
import { AdopcionService } from 'src/app/servicios/adopcion/adopcion.service';
import { ExportarService } from 'src/app/servicios/exportarExcel/exportar.service';

@Component({
  selector: 'app-reporte-completo',
  templateUrl: './reporte-completo.component.html',
  styleUrls: ['./reporte-completo.component.css']
})
export class ReporteCompletoComponent implements OnInit {
  cargando: string;
  loading: string;
  constructor( private adopcionService: AdopcionService, private exportExcelService: ExportarService) { }

  ngOnInit(): void {
    this.reporteCompleto();
  }

  generarExcel(jsonElmentos: any[],nombreArchivo:string):void{
    this.exportExcelService.exportExcel(jsonElmentos,nombreArchivo);
    this.loading="no";
    this.cargando="ok";
  }

  reporteCompleto(){
     this.loading="ok";
     this.adopcionService.getReporteCompleto().subscribe(
      dataMascota=>{
         this.reporteCompleto = dataMascota;
        // console.log("report:" + JSON.stringify(this.reporteCompleto));
         this.generarExcel(dataMascota,'reporteCompleto'); 
       }
    );
 }


}
