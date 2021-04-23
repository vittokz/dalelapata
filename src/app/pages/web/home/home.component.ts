import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Banner } from 'src/app/modelos/modulo-banner/banner-modelo';
import { AdminBannerService } from 'src/app/servicios/adminBanner/admin-banner.service';
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
  url: string = environment.url;

  public isLogueado: Boolean=false;
  nomUsuario: string;

  constructor(private router: Router,private bannerService: AdminBannerService,
    private userPlataforma: UserPlataformaService) { }

  ngOnInit(): void {
    this.cargarBanner();
    this.verificarAccesoUsuario();
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  inicio(){
    this.router.navigateByUrl("/home");
   
  }

  cargarBanner(){
    this.bannerService.getBannerActivos().subscribe(
      (resul)=> {
        this.listaBanner=resul;
        console.log('LISTA:',this.listaBanner);
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
    }
  }

  salir(){
    this.userPlataforma.logoutUser();
    this.router.navigateByUrl("/home");
  }

}
