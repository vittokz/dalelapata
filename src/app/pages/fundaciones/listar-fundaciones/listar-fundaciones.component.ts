import { Component, OnInit } from '@angular/core';
import { Fundacion } from '../../../modelos/modulo-fundacion/fundacion-modelo';
import { FundacionService } from '../../../servicios/fundacion/fundacion.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { PdfMakeWrapper, Txt,Img } from 'pdfmake-wrapper';
import { environment } from 'src/environments/environment.prod';
import { ExportarService } from 'src/app/servicios/exportarExcel/exportar.service';

@Component({
  selector: 'app-listar-fundaciones',
  templateUrl: './listar-fundaciones.component.html',
  styleUrls: ['./listar-fundaciones.component.css']
})
export class ListarFundacionesComponent implements OnInit {
  fundaciones: Fundacion[];
  fundaBuscada: Array<Fundacion> = new Array<Fundacion>();
  url: string = environment.url;
  eliminado: string;
  constructor(private fundacionService: FundacionService, private ruta: Router,
    private exportExcelService: ExportarService) { }

  ngOnInit(): void {
     this.cargaFundaciones();
  }

  cargaFundaciones(){
    return this.fundacionService.getFundaciones().subscribe(
      (resul)=>{
       this.fundaciones = resul;
      }
    );
     
  }

  generarExcel(jsonElmentos: any[],nombreArchivo:string):void{
    this.exportExcelService.exportExcel(jsonElmentos,nombreArchivo);
  }

  irDetalleFundacion(itemFundacion){
     this.fundacionService.fundacion = itemFundacion;
     this.ruta.navigateByUrl('/detalle-fundacion');
  }

  irDetalleUsuarios(itemFundacion){
    this.fundacionService.fundacion = itemFundacion;
    this.ruta.navigateByUrl('/fundacionPorUsuario');
  }

   eliminar(idFundacion: string){
       this.fundacionService.eliminarFundacion(idFundacion).subscribe(
         data =>{
           this.eliminado = 'ok';
           this.cargaFundaciones();
         },
         (err) => {  
          this.eliminado = 'error';
        }
       );
   }

  async generarPdf(){
     const pdf = new PdfMakeWrapper();
     pdf.images({
      picture1: await new Img('assets/img/eventosSADS/eventosBanner.jpg').build()
    });
     pdf.add(
       new Txt('Hola Mundo').alignment('center').italics().end
     );
     pdf.create().open();
  }

  
}
