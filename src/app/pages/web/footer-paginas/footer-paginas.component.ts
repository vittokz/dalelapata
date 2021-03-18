import { Component, OnInit } from '@angular/core';
import { Banner } from 'src/app/modelos/modulo-banner/banner-modelo';
import { AdminBannerService } from 'src/app/servicios/adminBanner/admin-banner.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-footer-paginas',
  templateUrl: './footer-paginas.component.html',
  styleUrls: ['./footer-paginas.component.css']
})
export class FooterPaginasComponent implements OnInit {

  listaAliados : Banner[];
  url: string = environment.url;
  constructor(private bannerService: AdminBannerService) { }

  ngOnInit(): void {
    this.cargarAliados();
  }

  cargarAliados(){
    this.bannerService.getAliadosActivos().subscribe(
      (resul)=> {
        this.listaAliados=resul;
      }
    );
  }

}
