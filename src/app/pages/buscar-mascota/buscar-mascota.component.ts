import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MascotasService } from '../../servicios/mascotas/mascotas.service';
import { FundacionService } from '../../servicios/fundacion/fundacion.service';
import { Fundacion } from '../../modelos/modulo-fundacion/fundacion-modelo';
import { Mascota, Raza } from '../../modelos/modulo-mascota/mascota-modulo';
import { Ciudad } from '../../modelos/modulo-ciudades/ciudades-modelo';
import { AuthUsuariosService } from '../../servicios/usuariosAdmin/auth-usuarios.service';
import { ExportarService } from 'src/app/servicios/exportarExcel/exportar.service';
import * as htmlDocx from 'html-docx-js/dist/html-docx';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment.prod';
import { UserInterface } from 'src/app/modelos/modulo-usuariosAdmin/usuarioAdmin-modelo';


@Component({
  selector: 'app-buscar-mascota',
  templateUrl: './buscar-mascota.component.html',
  styleUrls: ['./buscar-mascota.component.css']
})
export class BuscarMascotaComponent implements OnInit {
    dismissible = true;
    url: string = environment.url + 'mascotas/img/';
    nombreCompleto: string;
    ciudadesFormulario: Ciudad[];
    razas: Raza;
    identidadUsuario:string;
    fundaciones: Fundacion[];
    mascota:Mascota [];
    mascotaEncontrada:Mascota [];
    mascotaModificar:Mascota = new Mascota();
    linkVer: Boolean;
    editado: string;
    eliminado: string;
    registro: FormGroup;
    alerts:any;
    usuarioLogueado: UserInterface[];
    defaultAlerts: any[] = [
    {
      type: 'info',
      msg: 'Se actualizó correctamente la mascota !!!'
    }
   ];
    constructor(private userAuth: AuthUsuariosService,
      private formBuild: FormBuilder,private fundacionService: FundacionService, 
      private mascotaService: MascotasService, private exportExcelService: ExportarService,
      private authService: AuthUsuariosService) {
        this.alerts = this.defaultAlerts;
       }
  
    ngOnInit(): void {
      this.identidadUsuario = this.userAuth.getCurrentUser();
      this.cargarUsuario(this.identidadUsuario);
      this.cargarMascotas();
      this.crearFormulario();
      this.cargarRazas();
      this.cargarCiudades();
      this.cargarFundaciones();
    }

    cargarUsuario(identidad:string){
      this.authService.getUsuarioPorIdentidad(identidad).subscribe(
        data=>{
            this.usuarioLogueado = data;
            this.nombreCompleto = this.usuarioLogueado[0].nombre + " " + this.usuarioLogueado[0].apellido;        
        }
      );
    }

    crearFormulario(){
      this.registro = this.formBuild.group({
        idMascota: ['',Validators.required],
        fundacion: ['',Validators.required],
        chip: [''],
        nombre: ['',Validators.required],
        edad: ['',Validators.required],
        raza: ['',Validators.required],
        especie: ['',Validators.required],
        genero: ['',Validators.required],
        tamano: ['',Validators.required],
        peso: ['',Validators.required],
        ciudad: ['', Validators.required],
        estadoMascota: ['',Validators.required],
        color: ['',Validators.required],
        descripcion: ['', Validators.required],
        observacion: ['']
      });
    }

    cargarMascotas(){
      this.mascotaService.getMascotas().subscribe(
        (data)=>{
          this.mascota = data;
       
        }
      );
    }

    generarInfoMascota(dataMascota){
     
          this.generarWord(dataMascota);
   }

    generarWord(mascota){
      let content ="<h3><center>INFORMACIÓN DE MASCOTA Y USUARIO</center></h3><center>";
     // content = content + "<span style='font-size:13px; font-weight:800'> Nombre: "+ data.nombres +" "+ data.apellidos+ "</span><br>";
     // content = content + "<span style='font-size:13px; font-weight:800'> Identidad: "+ data.identidad + "</span><br>";
     // content = content + "<span style='font-size:13px; font-weight:800'> Dirección: "+ data.direccion + "</span><br>";
     // content = content + "<span style='font-size:13px; font-weight:800'> Movil: "+ data.movil + "</span><br>";
     // content = content + "<span style='font-size:13px; font-weight:800'> Email: "+ data.email + "</span><br>";
      content = content + "<h3><center>INFORMACIÓN DE LA MASCOTA</center></h3><center>";
      content = content + "<span style='font-size:13px; font-weight:800'> Nombre: "+ mascota.nombre + "</span><br>";
      content = content + "<span style='font-size:13px; font-weight:800'> NumChip: "+mascota.numChip + "</span><br>";
      content = content + "<span style='font-size:13px; font-weight:800'> Edad: "+ mascota.edad + "</span><br>";
      content = content + "<span style='font-size:13px; font-weight:800'> Especie: "+ mascota.idEspecie + "</span><br>";
      content = content + "<span style='font-size:13px; font-weight:800'> Genero: "+ mascota.idGenero + "</span><br>";
      content = content + "<span style='font-size:13px; font-weight:800'> Tamaño: "+ mascota.tamano + "</span><br>";
      content = content + "<span style='font-size:13px; font-weight:800'> Peso: "+ mascota.peso + "</span><br>";
      content = content + "<span style='font-size:13px; font-weight:800'> Color: "+ mascota.color + "</span><br>";
      content = content + "<span style='font-size:13px; font-weight:800'> Fecha Registro: "+ mascota.fechaRegistro + "</span><br>";
      content = content + "<img style='width:40px;height:50px; display:block; margin:auto;' src='"+ this.url +mascota.urlFoto +"'><br>";
   
      content = content + "<br><br><br><span style='font-size:13px; font-weight:800'> Generado Por: "+ this.nombreCompleto + "</span><br>";
      
    
     /* content = content + this.contenidoContrado[0].contenido;*/
      let htmlDocumennt = '<!DOCTYPE html><html><head><meta charset="utf-8"><title></title>';
      htmlDocumennt = htmlDocumennt + '</head><body>' + content + '</body></html>';
      const converted = htmlDocx.asBlob(htmlDocumennt);
      saveAs(converted,"infoMascotaUsuario.docx");
   }
  

    cargarFundaciones(){
      this.fundacionService.getFundaciones().subscribe(
        data=>{
            this.fundaciones=data;
           
        }
      );
    }

    cargarRazas(){
      this.mascotaService.getRazaAll().subscribe(
        data=>{
            this.razas = data;
        }
      )
    }
    
    cargarCiudades(){
      this.mascotaService.getCiudades().subscribe(
        data=>{
            this.ciudadesFormulario = data;
        }
      )
    }

    generarExcel(jsonElmentos: any[],nombreArchivo:string):void{
      this.exportExcelService.exportExcel(jsonElmentos,nombreArchivo);
    }

    eliminar(mascotaSelec){
      const idMascota = mascotaSelec.idMascota;
      this.mascotaService.eliminarMascota(idMascota).subscribe(
        data=>{
          if(data['resul']>0){
            this.eliminado="ok";
            this.cargarMascotas();
          }
          else{
            this.eliminado="error";
          }
        }
      );
    }

    habilitarVer(mascotaSelec){
       this.linkVer=true;
       this.registro.get('idMascota').setValue(mascotaSelec.idMascota)
       this.registro.get('fundacion').setValue(mascotaSelec.idFundacion)
       this.registro.get('chip').setValue(mascotaSelec.numChip)
       this.registro.get('nombre').setValue(mascotaSelec.nombre)
       this.registro.get('edad').setValue(mascotaSelec.edad)
       this.registro.get('raza').setValue(mascotaSelec.idRaza)
       this.registro.get('especie').setValue(mascotaSelec.idEspecie)
       this.registro.get('genero').setValue(mascotaSelec.idGenero)
       this.registro.get('tamano').setValue(mascotaSelec.tamano)
       this.registro.get('peso').setValue(mascotaSelec.peso)
       this.registro.get('ciudad').setValue(mascotaSelec.ciudad)
       this.registro.get('estadoMascota').setValue(mascotaSelec.estadoMascota)
       this.registro.get('color').setValue(mascotaSelec.color)
       this.registro.get('descripcion').setValue(mascotaSelec.descripcion)
       this.registro.get('observacion').setValue(mascotaSelec.observacion)
    }

    editarMascota(){
    
      const frm = this.registro.value;
      this.mascotaModificar.idMascota = frm.idMascota;
      this.mascotaModificar.idFundacion = frm.fundacion;
      this.mascotaModificar.numChip = frm.chip;
      this.mascotaModificar.nombre = frm.nombre;
      this.mascotaModificar.edad = frm.edad;
      this.mascotaModificar.idRaza = frm.raza;
      this.mascotaModificar.idEspecie = frm.especie;
      this.mascotaModificar.idGenero = frm.genero;
      this.mascotaModificar.tamano = frm.tamano;
      this.mascotaModificar.peso = frm.peso;
      this.mascotaModificar.ciudad = frm.ciudad;
      this.mascotaModificar.estadoMascota = frm.estadoMascota;
      this.mascotaModificar.color= frm.color;
      this.mascotaModificar.descripcion = frm.descripcion;
      this.mascotaModificar.observacion = frm.observacion;
      this.mascotaModificar.usuarioEdito = this.identidadUsuario;
      this.mascotaService.editarMascotaAdmin(this.mascotaModificar).subscribe(
       data=>{
          if(data["resul"] == 1){
               this.editado = "ok";
               //this.registro.reset();
           }
          else{
           this.editado="error";
          }
       });
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
    this.cargarMascotas();
  }

  cancelar(){
    this.linkVer=false;
    this.mascotaEncontrada=null;

  }

}
