import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fundacion } from 'src/app/modelos/modulo-fundacion/fundacion-modelo';
import { UserPagina } from 'src/app/modelos/modulo-usuario/usuarioPagina-modelo';
import { FundacionService } from 'src/app/servicios/fundacion/fundacion.service';
import { UserPlataformaService } from '../../../../servicios/userPlataforma/user-plataforma.service';


declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/home', title: 'Mascotas',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/home', title: 'Registrarse',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/home', title: 'Perfil',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/home', title: 'Login',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/home', title: 'Cerrar',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/home', title: 'Contactenos',  icon: 'ni-tv-2 text-primary', class: '' }
];

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;
  public isLogueado: Boolean=false;
  identidadUsuario: string;
  idFundacion: string;
  fundacion: Fundacion;
  razonSocial: string;
  identidadFundacion: string;
  municipio: string;
  usuario:UserPagina;
  tipoArchivo:string;
  nomUsuario: string;
  constructor(private router: Router, 
    private userPlataforma: UserPlataformaService,
    private fundacionService: FundacionService) { }

  ngOnInit(): void {
    this.razonSocial='';
    this.verificarAccesoUsuario();
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  inicio(){
    this.router.navigateByUrl("/home");
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

}
