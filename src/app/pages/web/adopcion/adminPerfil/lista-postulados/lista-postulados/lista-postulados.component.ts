import { Component, OnInit, Type } from '@angular/core';
import { UserPagina } from '../../../../../../modelos/modulo-usuario/usuarioPagina-modelo';
import { Mascota } from 'src/app/modelos/modulo-mascota/mascota-modulo';
import { Fundacion } from '../../../../../../modelos/modulo-fundacion/fundacion-modelo';
import { MascotasService } from 'src/app/servicios/mascotas/mascotas.service';
import { ExportarService } from '../../../../../../servicios/exportarExcel/exportar.service';
import { UserPlataformaService } from '../../../../../../servicios/userPlataforma/user-plataforma.service';
import { AdopcionService } from '../../../../../../servicios/adopcion/adopcion.service';
import { FundacionService } from '../../../../../../servicios/fundacion/fundacion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-postulados',
  templateUrl: './lista-postulados.component.html',
  styleUrls: ['./lista-postulados.component.css']
})



export class ListaPostuladosComponent implements OnInit {
  public idUsuario: string;
  public idFundacion: string;
  idMascotaSelec: string;
  respuesta: Boolean = false;
  nombreUsuarioSelec: string;
  idenUsuarioSelec:string;
  idUsuarioSelec: string;
  cantidadListaUsuarios : number;
  identidadUsuario: string;
  usuario:UserPagina;
  listaUsuarioS:UserPagina[];
  listaMascotasPostulados: Mascota[];
  mascotasSeleccionada: Mascota[];
  fundacion: Fundacion;
  public razonSocial: string;
  dato: { idMascota: string };
  showModal: Boolean=false;

  constructor(private userPlataformaService: UserPlataformaService,
    private rutaActiva: ActivatedRoute,private fundacionService: FundacionService,
    private mascotaService: MascotasService,
    private exportExcelService: ExportarService, private adopcionService: AdopcionService) {
       
     }

  ngOnInit(): void {
    this.dato = {
      idMascota: this.rutaActiva.snapshot.params.parametro
    };
    this.identidadUsuario = this.userPlataformaService.getCurrentUser();
    this.cargarDatosMascota();
    this.cargarDatosUsuario();
    this.cargarUsuariosPostulados();
  }

  cargarDatosMascota(){
    this.mascotaService.getIdMascota(this.dato.idMascota).subscribe(
      data=>{
        this.mascotasSeleccionada = data;
        this.idMascotaSelec = this.mascotasSeleccionada[0].idMascota;
      }
    )
  }

  cargarDatosUsuario(){
    this.userPlataformaService.getUsuarioIdentidad(this.identidadUsuario).subscribe(
      data=>{
          this.usuario = data;
          this.idFundacion = this.usuario[0].idFundacion;
          this.idUsuario = this.usuario[0].idUsuario;
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
    )
  }

  cargarUsuariosPostulados(){
        this.adopcionService.getUsuariosPostuladosPorIdMascota(this.dato.idMascota).subscribe(
          data=>{
              this.listaUsuarioS = data;
              this.cantidadListaUsuarios = this.listaUsuarioS.length;
            }
        );
  }

  generarExcel(jsonElmentos: any[],nombreArchivo:string):void{
    this.exportExcelService.exportExcel(jsonElmentos,nombreArchivo);
 }

 aceptarPostulado(idUsuarioSelec: string, idMascotaSeleccionada: string){
    this.adopcionService.aceptarPostulacionUsuario(idUsuarioSelec,idMascotaSeleccionada).subscribe(
      data=>{
        if(data["resul"]==1){
          this.respuesta = true;
          this.cargarUsuariosPostulados();
          this.showModal=false;
        }
      }
    );
 }

 habilitarModal(usuarioSelec: UserPagina){
     this.nombreUsuarioSelec = usuarioSelec.nombres + " " + usuarioSelec.apellidos;
     this.idenUsuarioSelec = usuarioSelec.identidad;
     this.idUsuarioSelec = usuarioSelec.idUsuario;
     this.showModal=true;

 }

}
