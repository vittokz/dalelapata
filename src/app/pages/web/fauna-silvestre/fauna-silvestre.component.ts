import { Component, OnInit } from '@angular/core';
import { Noticias } from '../../../modelos/modulo-fauna/fauna-modelo';
import { FaunaService } from '../../../servicios/fauna/fauna.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserPlataformaService } from 'src/app/servicios/userPlataforma/user-plataforma.service';
import { FundacionService } from 'src/app/servicios/fundacion/fundacion.service';
import { UserPagina } from 'src/app/modelos/modulo-usuario/usuarioPagina-modelo';
import { Fundacion } from 'src/app/modelos/modulo-fundacion/fundacion-modelo';
@Component({
  selector: 'app-fauna-silvestre',
  templateUrl: './fauna-silvestre.component.html',
  styleUrls: ['./fauna-silvestre.component.css']
})
export class FaunaSilvestreComponent implements OnInit {
  noticia:Noticias[];
  url: string =environment.url;
  showModal2=false;
  public isCollapsed = true;
  imagen: string;
  public isLogueado: Boolean=false;
  nomUsuario: string;
  razonSocial: string;

  identidadUsuario: string;
  idFundacion: string;
  fundacion: Fundacion;
  identidadFundacion: string;
  municipio: string;
  usuario:UserPagina;
  constructor(private noticiaService: FaunaService, private ruta: Router,
    private userPlataforma: UserPlataformaService,
    private fundacionService: FundacionService) { }

  ngOnInit(): void {
    this.razonSocial='';
      this.cargarDatos();
      this.verificarAccesoUsuario();
      this.ruta.events.subscribe((event) => {
        this.isCollapsed = true;
     });
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
    this.ruta.navigateByUrl("/home");
  }
  cargarDatos(){
    this.noticiaService.getNoticias().subscribe(
      (resul)=>{
        this.noticia = resul;
      }
    )
  }

  inicio(){
    this.ruta.navigateByUrl("/home");
  }

  cerrarModal2(){
    this.showModal2=false;
  }

  irDetalleNoticia(noti: Noticias){
    this.imagen = noti.urlImagen;
    this.showModal2=true;
  }
}
