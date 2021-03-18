import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Banner } from 'src/app/modelos/modulo-banner/banner-modelo';
import { AdminBannerService } from 'src/app/servicios/adminBanner/admin-banner.service';
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
  constructor(private router: Router,private bannerService: AdminBannerService) { }

  ngOnInit(): void {
    this.cargarBanner();
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

}
