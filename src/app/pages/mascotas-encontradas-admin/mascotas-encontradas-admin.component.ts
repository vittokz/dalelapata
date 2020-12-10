import { Component, OnInit } from '@angular/core';
import { Mascota } from 'src/app/modelos/modulo-mascota/mascota-modulo';
import { MascotasService } from 'src/app/servicios/mascotas/mascotas.service';
import { Fundacion } from 'src/app/modelos/modulo-fundacion/fundacion-modelo';
import { FundacionService } from 'src/app/servicios/fundacion/fundacion.service';
import { ExportarService } from 'src/app/servicios/exportarExcel/exportar.service';

@Component({
  selector: 'app-mascotas-encontradas-admin',
  templateUrl: './mascotas-encontradas-admin.component.html',
  styleUrls: ['./mascotas-encontradas-admin.component.css']
})
export class MascotasEncontradasAdminComponent implements OnInit {

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
    this.mascotaService.getMascotasEncontradas().subscribe(
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
