import { Component, OnInit } from '@angular/core';
import { MascotasService } from 'src/app/servicios/mascotas/mascotas.service';
import { Mascota } from 'src/app/modelos/modulo-mascota/mascota-modulo';
import { FundacionService } from 'src/app/servicios/fundacion/fundacion.service';
import { Fundacion } from 'src/app/modelos/modulo-fundacion/fundacion-modelo';
import { ExportarService } from 'src/app/servicios/exportarExcel/exportar.service';
import { UserInterface } from 'src/app/modelos/modulo-usuariosAdmin/usuarioAdmin-modelo';
import { AuthUsuariosService } from 'src/app/servicios/usuariosAdmin/auth-usuarios.service';
import { UserPagina } from 'src/app/modelos/modulo-usuario/usuarioPagina-modelo';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css']
})
export class MascotasComponent implements OnInit {
  mascotas: Mascota[];
  fundaciones: Fundacion[];
  cantidad: Number;
  mascotasSel: Mascota[];
  usuarioSelec: UserPagina[];
  idBuscar: string;
  identidadUsuario:string;
  tipoUsuario: string;
  usuarioLogueado: UserInterface[];
  dato: {
    idMascota: string,
    idUsuario: string
};
  constructor(private mascotaService: MascotasService, private userAuth: AuthUsuariosService,
    private fundacionService: FundacionService,private exportExcelService: ExportarService,
    private ruta : Router,private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    this.dato = {
      idMascota: this.rutaActiva.snapshot.params.parametro,
      idUsuario: this.rutaActiva.snapshot.params.parametro2
    };
    this.identidadUsuario = this.userAuth.getCurrentUser();
     this.cargarUsuario(this.identidadUsuario);
     this.cargarMascotasAdoptadas();
     this.cargarFundaciones();
  }

  cargarUsuario(identidad:string){
    this.userAuth.getUsuarioPorIdentidad(identidad).subscribe(
      data=>{
          this.usuarioLogueado = data;
          this.tipoUsuario = this.usuarioLogueado[0].tipoUsuario;        
      }
    );
  }

  generarExcel(jsonElmentos: any[],nombreArchivo:string):void{
    this.exportExcelService.exportExcel(jsonElmentos,nombreArchivo);
 }

  buscarFundacion(event){
     this.idBuscar = event;
     this.mascotasSel= this.mascotas.filter(xUsuario=>{
        return xUsuario.idFundacion.includes(this.idBuscar);
     })
     this.cantidad =this.mascotas.length;

  }

  cargarMascotasAdoptadas(){
    this.mascotaService.getMascotasAdoptadas().subscribe(
      data=>{
        this.mascotas = data;
        this.cantidad =this.mascotas.length;
        this.mascotasSel = this.mascotas;
      }
    )
  }

  agregarLogros(idMascota: string){
     this.mascotaService.getUsuarioPorIdMascota(idMascota).subscribe(
       data=>{
          this.usuarioSelec = data; 
          this.ruta.navigate(['/agregarLogroAdmin',idMascota,this.usuarioSelec[0].idUsuario]);
       }
     );
  }

  cargarFundaciones(){
    this.fundacionService.getFundaciones().subscribe(
      data=>{
        this.fundaciones = data;
      }
    )
  }
}
