import { environment } from 'src/environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { EventosService } from '../../../servicios/eventos/eventos.service';
import { Router } from '@angular/router';
import { Eventos } from '../../../modelos/modulo-eventos/evento-modelo';
import { MascotasService } from 'src/app/servicios/mascotas/mascotas.service';
import { Ciudad } from 'src/app/modelos/modulo-ciudades/ciudades-modelo';

@Component({
  selector: 'app-pag-eventos',
  templateUrl: './pag-eventos.component.html',
  styleUrls: ['./pag-eventos.component.css']
})
export class PagEventosComponent implements OnInit {
  evento:Eventos;
  url: string =environment.url;
  ciudades: Ciudad[];
  public isCollapsed = true;
  municipio: string;
  listaEventos: Eventos[];
  cantidad: number;
  showModal2=false;
  imagen: string;
  constructor(private eventoService: EventosService, private ruta: Router,private mascotaService: MascotasService) { }

  ngOnInit(): void {
    this.ruta.events.subscribe((event) => {
      this.isCollapsed = true;
   });
    this.municipio="Pasto";
    this.cargarDatos();
    this.cargarCiudades();
  }

  inicio(){
    this.ruta.navigateByUrl("/home");
  }

  cargarCiudades(){
    this.mascotaService.getCiudades().subscribe(
      (dataCiudades)=>{
        this.ciudades = dataCiudades;
      }
    );
  }


  cerrarModal2(){
    this.showModal2=false;
  }

  activarMunicipio(evento){
      this.municipio = evento.target.value;
      this.eventoService.getEventosByMunicipio(this.municipio).subscribe(
        data=>{
           this.listaEventos = data;
        }
      );
  }

  cargarDatos(){
    this.eventoService.getEventosByMunicipio(this.municipio).subscribe(
      (resul)=>{
        this.listaEventos= resul;
      }
    )
  }

  irDetalleEvento(even: Eventos){
    
    this.imagen = even.urlImagen;
    this.showModal2=true;
  }

}
