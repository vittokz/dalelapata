import { Component, OnInit } from '@angular/core';
import { MapaService } from '../../../servicios/mapa/mapa.service';
import * as mapboxgl from 'mapbox-gl';
import { UbicacionMapa } from 'src/app/modelos/modulo-ubicacionMapa/ubicacionMapa-modulo';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { Item } from 'pdfmake-wrapper';
import { UserPlataformaService } from 'src/app/servicios/userPlataforma/user-plataforma.service';
import { UserPagina } from 'src/app/modelos/modulo-usuario/usuarioPagina-modelo';
import { Fundacion } from 'src/app/modelos/modulo-fundacion/fundacion-modelo';
import { FundacionService } from 'src/app/servicios/fundacion/fundacion.service';

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
  public listaLatitudes: UbicacionMapa[];
  public ubicacionSelec: UbicacionMapa[];
  url: string =environment.url+ 'unidadMovil/img/';
  municipio: string;
  idVisita : string;
  activar:boolean;
  totalEsterilizadas: number;
  public isLogueado: Boolean=false;
  nomUsuario: string;

  razonSocial: string;

  identidadUsuario: string;
  idFundacion: string;
  fundacion: Fundacion;
  identidadFundacion: string;

  usuario:UserPagina;
  tipoArchivo:string;

  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 1.2;
  lng = -77.267;
  zoom = 7;
  constructor(private mapService: MapaService,
    private router: Router,
    private userPlataforma: UserPlataformaService,
    private fundacionService: FundacionService) {
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
   this.totalEsterilizadas=0;
    /* this.mapbox.accessToken = environment.mapBoxToken; */
    this.municipio="PASTO";
   }

  ngOnInit(): void {
    this.razonSocial='';
    //this.buildMapa();
    this.cargarUbicaciones();  
    //this.getAllUbicaciones(); 
    this.verificarAccesoUsuario();
  }
  verificarAccesoUsuario(): void{
    if(this.userPlataforma.getCurrentUser() == null){
      this.isLogueado=false;
     }
   else{
    this.isLogueado=true;
    this.nomUsuario=this.userPlataforma.getCurrentUser();
    this.cargarDatosUsuario();
    }
  }

  cargarDatosUsuario(){
    this.userPlataforma.getUsuarioIdentidad( this.nomUsuario).subscribe(
      data=>{
          this.usuario = data;
          this.idFundacion = this.usuario[0].idFundacion;
          this.cargarDatosFundacion(this.idFundacion);
      }
    );
  }

  cargarDatosFundacion(idFundacion: string){
    this.fundacionService.getFundacionId(idFundacion).subscribe(
      resul=>{
        this.fundacion = resul;
        this.razonSocial = this.fundacion[0].razonSocial;   
       }
    );
  }

  salir(){
    this.userPlataforma.logoutUser();
    this.router.navigateByUrl("/home");
  }
  getAllUbicaciones() {
    this.mapService.getAllUbicaciones().subscribe(
      data=>{
        this.listaLatitudes = data;
        console.log(this.listaLatitudes);
        this.listaLatitudes.map((item)=>{
         
            this.totalEsterilizadas = this.totalEsterilizadas + Number(item.cantidad);
           if(item.estado=='Visitado'){
            this.crearMarcador(item.longitud,item.latitud, '#008F39',item.idMunicipio, item.cantidad,item.estado, item.urlFoto);
           }
           if(item.estado=='Pendiente'){
            this.crearMarcador(item.longitud,item.latitud, '#F5EB08',item.idMunicipio, item.cantidad,item.estado,item.urlFoto);
           }
           if(item.estado=='Revision'){
            this.crearMarcador(item.longitud,item.latitud, '#F5AA08',item.idMunicipio, item.cantidad,item.estado,item.urlFoto);
           } 
         
         });
       });
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
       });
}

  cargarUbicaciones(){
     this.mapService.getUbicaciones().subscribe(
      data=>{
        this.ubicaciones = data;  
       }); 
       this.mapService.getAllUbicaciones().subscribe(
        data=>{
          this.listaLatitudes = data;
          console.log(this.listaLatitudes);
          this.listaLatitudes.map((item)=>{
         
            this.totalEsterilizadas = this.totalEsterilizadas + Number(item.cantidad);
          });
        }
       );
  }

  crearMarcador(lng: string, lat:string, color: string,municipio: string, cantidad: string, estado:string, urlFoto : string){
     let popup = new mapboxgl.Popup({
       closeButton: false,
       offset:[0,-15]
     })
     .setLngLat({lng: lng, lat: lat})
     .setHTML('<h3>' + municipio + '</h3><p> Mascotas esterilizadas: ' + cantidad+  '<br> Estado: '+estado+'</p><img width="90%" src="'+ this.url +'/'+ urlFoto+'">')
     .setLngLat({lng: lng, lat: lat})

     const marker = new mapboxgl.Marker({
       draggable:true,
       "color": color
     })
     .setLngLat({lng: lng, lat: lat})
     .setPopup(popup)
     .addTo(this.map);

     marker.on('drag', ()=>{

     })
  }

  buildMapa(){
    mapboxgl.accessToken = environment.makboxKey;
    this.map = new mapboxgl.Map({
    container: 'mapa', // container id
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [this.lng,this.lat], // starting position
    zoom: 7 // starting zoom
    });
    this.map.addControl(new mapboxgl.NavigationControl()); 
    }

}