import { Component, OnInit } from '@angular/core';
import { MapaService } from '../../../servicios/mapa/mapa.service';
import * as mapboxgl from 'mapbox-gl';
import { UbicacionMapa } from 'src/app/modelos/modulo-ubicacionMapa/ubicacionMapa-modulo';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unidad-movil',
  templateUrl: './unidad-movil.component.html',
  styleUrls: ['./unidad-movil.component.css']
})
export class UnidadMovilComponent implements OnInit {
  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map;
  public isCollapsed = true;
  public ubicaciones: UbicacionMapa[];
  public ubicacionSelec: UbicacionMapa[];
  url: string =environment.url+ 'unidadMovil/img/';
  municipio: string;
  idVisita : string;
  activar:boolean;
  

  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 1.2;
  lng = -77.267;
  zoom = 7;
  constructor(private mapService: MapaService,private router: Router) {
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
    this.mapbox.accessToken = environment.mapBoxToken;
    this.municipio="PASTO";
   }

  ngOnInit(): void {
    var a = [1,2,1,3,3,1,2,1,5,1];
    var suma=0;
    for(var i=0;i<a.length;i++){
      for(var j=1;j<=a.length;j++){
        suma = a[i] + a[j];
        console.log(suma);
        if(suma==10){
          console.log('numer:',a[i]);
        }
          }
    }
    
    this.cargarUbicaciones(); 
  }

  inicio(){
    this.router.navigateByUrl("/home");
  }

  

  activarMunicipio(evento){
    this.activar=true;
    this.municipio = evento.target.value;
    this.mapService.getUbicacionesByIMunicipio(this.municipio).subscribe(
      data=>{
        this.ubicacionSelec = data;
       
        console.log(this.ubicacionSelec);
       });
}

  cargarUbicaciones(){
     this.mapService.getUbicaciones().subscribe(
      data=>{
        this.ubicaciones = data;  
       }); 
  }

  buildMapa(){
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: this.zoom,
        center: [this.lng, this.lat]
      });
      this.map.addControl(new mapboxgl.NavigationControl());
      
    }

}