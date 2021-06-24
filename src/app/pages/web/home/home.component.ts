import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Banner } from 'src/app/modelos/modulo-banner/banner-modelo';
import { Fundacion } from 'src/app/modelos/modulo-fundacion/fundacion-modelo';
import { PodCats } from 'src/app/modelos/modulo-podcats/podcats-modelo';
import { UserPagina } from 'src/app/modelos/modulo-usuario/usuarioPagina-modelo';
import { AdminBannerService } from 'src/app/servicios/adminBanner/admin-banner.service';
import { FundacionService } from 'src/app/servicios/fundacion/fundacion.service';
import { PodcatsService } from 'src/app/servicios/podcats/podcats.service';
import { UserPlataformaService } from 'src/app/servicios/userPlataforma/user-plataforma.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isCollapsed = true;
  listaBanner: Banner[];
  showModal2=false;
  url: string = environment.url;
  lista : any[];
  razonSocial: string;
  public isLogueado: Boolean=false;
  nomUsuario: string;
  identidadUsuario: string;
  idFundacion: string;
  fundacion: Fundacion;
  identidadFundacion: string;
  municipio: string;
  usuario:UserPagina;
  listaPodcats : PodCats[];
  tipoArchivo:string;

  constructor(private router: Router,private bannerService: AdminBannerService,
    private userPlataforma: UserPlataformaService,private podCatsService: PodcatsService,
    private fundacionService: FundacionService) { }

  ngOnInit(): void {
    this.razonSocial='';
    this.cargarPodCats();
    this.cargarBanner();
    this.verificarAccesoUsuario();
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  cargarPodCats() {
    this.podCatsService.getAllPodCats().subscribe((dataPodCats) =>{
       this.listaPodcats = dataPodCats;
      
    });
}

  inicio(){
    this.router.navigateByUrl("/home");
   
  }

  cargarBanner(){
    this.bannerService.getBannerActivos().subscribe(
      (resul)=> {
        this.listaBanner=resul;
      }
    );
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

  cerrarModal2(){
    this.showModal2=false;
  }

  irDetalleNoticia(){
    console.log('ingreso');
      this.showModal2=true;
  }

  salir(){
    this.razonSocial='';
    this.userPlataforma.logoutUser();
    this.router.navigateByUrl("/pagAdopcion");
  }

}
