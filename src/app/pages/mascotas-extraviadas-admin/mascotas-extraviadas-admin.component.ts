import { Component, OnInit } from '@angular/core';
import { MascotasService } from 'src/app/servicios/mascotas/mascotas.service';
import { Mascota } from 'src/app/modelos/modulo-mascota/mascota-modulo';
import { ExportarService } from 'src/app/servicios/exportarExcel/exportar.service';

@Component({
  selector: 'app-mascotas-extraviadas-admin',
  templateUrl: './mascotas-extraviadas-admin.component.html',
  styleUrls: ['./mascotas-extraviadas-admin.component.css']
})
export class MascotasExtraviadasAdminComponent implements OnInit {

  mascotas: Mascota[];
  cantidad: Number;
  constructor(private mascotaService: MascotasService,private exportExcelService: ExportarService) { }

  ngOnInit(): void {
    this.cargarMascotasExtraviadas();
  }

  generarExcel(jsonElmentos: any[],nombreArchivo:string):void{
    this.exportExcelService.exportExcel(jsonElmentos,nombreArchivo);
  }


  cargarMascotasExtraviadas(){
    this.mascotaService.getMascotasExtraviadas().subscribe(
      data=>{
        this.mascotas = data;
        this.cantidad =this.mascotas.length;
      }
    )
  }

}
