import { Component, OnInit } from '@angular/core';
import { MascotasService } from 'src/app/servicios/mascotas/mascotas.service';
import { Mascota } from 'src/app/modelos/modulo-mascota/mascota-modulo';
import { ExportarService } from 'src/app/servicios/exportarExcel/exportar.service';

@Component({
  selector: 'app-mascotas-por-adoptar-admin',
  templateUrl: './mascotas-por-adoptar-admin.component.html',
  styleUrls: ['./mascotas-por-adoptar-admin.component.css']
})
export class MascotasPorAdoptarAdminComponent implements OnInit {
  mascotas: Mascota[];
  cantidad: Number;
  constructor(private mascotaService: MascotasService,private exportExcelService: ExportarService) { }

  ngOnInit(): void {
    this.cargarMascotasPorAdoptadas();
  }

  generarExcel(jsonElmentos: any[],nombreArchivo:string):void{
    this.exportExcelService.exportExcel(jsonElmentos,nombreArchivo);
  }

  cargarMascotasPorAdoptadas(){
    this.mascotaService.getMascotasPorAdoptar().subscribe(
      data=>{
        this.mascotas = data;
        this.cantidad =this.mascotas.length;
      }
    )
  }

}
