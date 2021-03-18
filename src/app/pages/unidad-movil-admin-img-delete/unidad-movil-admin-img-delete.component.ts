import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VisitasMovilService } from 'src/app/servicios/visitas-movil/visitas-movil.service';

@Component({
  selector: 'app-unidad-movil-admin-img-delete',
  templateUrl: './unidad-movil-admin-img-delete.component.html',
  styleUrls: ['./unidad-movil-admin-img-delete.component.css']
})
export class UnidadMovilAdminImgDeleteComponent implements OnInit {
  dato: {
    idVisita: string,
    urlFoto: string,
    urlFoto2: string,
    urlFoto3: string,
    municipio: string
};
envioForm :boolean=false;
  constructor(private rutaActiva: ActivatedRoute,private visitaService: VisitasMovilService) { }

  ngOnInit(): void {
    this.dato = {
      idVisita: this.rutaActiva.snapshot.params.parametro,
      urlFoto: this.rutaActiva.snapshot.params.parametro2,
      urlFoto2: this.rutaActiva.snapshot.params.parametro3,
      urlFoto3: this.rutaActiva.snapshot.params.parametro4,
      municipio: this.rutaActiva.snapshot.params.parametro5
    };
   
  }


  eliminarImg(urlFoto: string,numero: string){
    console.log(numero);
     this.visitaService.eliminarImgVisita(this.dato.idVisita,numero).subscribe(
       data=>{
         this.envioForm = true;
         if(numero=="1"){
           this.dato.urlFoto ="no";
         }
         if(numero=="2"){
          this.dato.urlFoto2 ="no";
        }
        if(numero=="3"){
          this.dato.urlFoto3 ="no";
        }
       }
     );
  }

}
