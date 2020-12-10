import { environment } from 'src/environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { FaunaService } from 'src/app/servicios/fauna/fauna.service';
import { Noticias } from '../../../modelos/modulo-fauna/fauna-modelo';
import { Router } from '@angular/router';
import { ExportarService } from 'src/app/servicios/exportarExcel/exportar.service';

@Component({
  selector: 'app-noticias-fauna',
  templateUrl: './noticias-fauna.component.html',
  styleUrls: ['./noticias-fauna.component.css']
})
export class NoticiasFaunaComponent implements OnInit {
  noticia:Noticias[];
  url: string = environment.url;
  eliminado: string;
  constructor(private noticiaService: FaunaService, private ruta:Router,
    private exportExcelService: ExportarService,) {}

  ngOnInit(): void {
   this.cargarNoticias();
  }

  cargarNoticias(){
    this.noticiaService.getNoticias().subscribe(
      (resul)=> {
        this.noticia=resul;
      }
    );
  }

  eliminar(idNoticia: string){
    this.noticiaService.eliminarNoticia(idNoticia).subscribe(
      data=>{ 
         if(data=="ok"){
            this.eliminado = "ok";
            this.cargarNoticias();
         }
         else{
           this.eliminado = "error";
         }
      }
    );
 }
  
  irDetalleNoticia(noti: Noticias){
    this.noticiaService.noticia=noti; //realizo este paso para utilizar variables en detalleNoticia
    this.ruta.navigateByUrl('/detalle-noticia');
  }

  generarExcel(jsonElmentos: any[],nombreArchivo:string):void{
    this.exportExcelService.exportExcel(jsonElmentos,nombreArchivo);
  }

}
