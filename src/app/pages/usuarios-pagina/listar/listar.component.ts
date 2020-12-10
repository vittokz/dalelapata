import { Component, OnInit } from '@angular/core';
import { UserPlataformaService } from '../../../servicios/userPlataforma/user-plataforma.service';
import { UserPagina } from '../../../modelos/modulo-usuario/usuarioPagina-modelo';
import { AdopcionService } from 'src/app/servicios/adopcion/adopcion.service';
import { Mascota } from 'src/app/modelos/modulo-mascota/mascota-modulo';
import * as htmlDocx from 'html-docx-js/dist/html-docx';
import { saveAs } from 'file-saver';
import { AuthUsuariosService } from 'src/app/servicios/usuariosAdmin/auth-usuarios.service';
import { UserInterface } from 'src/app/modelos/modulo-usuariosAdmin/usuarioAdmin-modelo';
import { environment } from 'src/environments/environment.prod';
import { ExportarService } from 'src/app/servicios/exportarExcel/exportar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  formEditar: FormGroup;
  usuario:UserPagina[];
  identidadUsuario:string;
  mascotasUsuario: Mascota[];
  usuarioLogueado: UserInterface[];
  usuarioEditado: UserPagina = new UserPagina();
  nombreCompleto: string;
  nombreSel: string;
  editarForm: string;
  cedulaSel: string;
  telefonoSel: string;
  celularSel: string;
  direccionSel: string;
  emailSel: string;
  url: string = environment.url + 'mascotas/img/';
  showModal=false;
  constructor(private userPlataformaService: UserPlataformaService,
    private adopcionService: AdopcionService,private authService: AuthUsuariosService,
    private exportExcelService: ExportarService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.identidadUsuario = this.authService.getCurrentUser();
    this.cargarUsuario(this.identidadUsuario);
    this.cargarUsuarios();
   
  }

  crearFormulario(){
    this.formEditar = this.formBuilder.group(
      {
        identificacion: ['', Validators.required],
        nombres: ['', Validators.required],
        apellidos: ['', Validators.required],
        telefono: ['', Validators.required],
        movil: ['', Validators.required],
        direccion: ['', Validators.required],
        email: ['', Validators.required]
      });
  }

  cerrarModal(){
    this.showModal=false;
    this.editarForm="";
    this.cargarUsuarios();
  }
  
  editarUsuario(data){
    this.showModal=true;
    this.formEditar.get('identificacion').setValue(data.identidad)
    this.formEditar.get('nombres').setValue(data.nombres)
    this.formEditar.get('apellidos').setValue(data.apellidos)
    this.formEditar.get('telefono').setValue(data.telefono)
    this.formEditar.get('movil').setValue(data.movil)
    this.formEditar.get('direccion').setValue(data.direccion)
    this.formEditar.get('email').setValue(data.email)
 }

 editar(){
  const frm = this.formEditar.value;
  this.usuarioEditado.identidad = frm.identificacion;
  this.usuarioEditado.nombres = frm.nombres;
  this.usuarioEditado.apellidos= frm.apellidos;
  this.usuarioEditado.direccion = frm.direccion;
  this.usuarioEditado.telefono = frm.telefono;
  this.usuarioEditado.movil = frm.movil;
  this.usuarioEditado.email = frm.email;
  this.userPlataformaService.actualizarUsuario(this.usuarioEditado).subscribe(
    data=>{
      if(data["resul"]==1){
          this.editarForm = "ok";
      }
      else{
        this.editarForm = "error";
      }
    }
  )
 }
  

  cargarUsuario(identidad:string){
    this.authService.getUsuarioPorIdentidad(identidad).subscribe(
      data=>{
          this.usuarioLogueado = data;
          this.nombreCompleto = this.usuarioLogueado[0].nombre + " " + this.usuarioLogueado[0].apellido;        
      }
    );
  }

  cargarUsuarios(){
    this.userPlataformaService.getUsuarios().subscribe(
      (data)=>{
          this.usuario = data;
       } 
    );
  }

  verMascotasUsuario(data){
     this.adopcionService.generaWordIdUsuarioIdMascota(data.idUsuario).subscribe(
       dataMascota=>{
         if(dataMascota["resul"] == "-1" ){
          this.generarWord2(data);
         }else{
          this.mascotasUsuario = dataMascota;
          this.generarWord(this.mascotasUsuario,data);
         }
         
        }
     );
  }

  generarExcel(jsonElmentos: any[],nombreArchivo:string):void{
    this.exportExcelService.exportExcel(jsonElmentos,nombreArchivo);
  }

  generarWord(mascota: Mascota[],data){
   
    let content ="<h3><center>INFORMACIÓN DE MASCOTA Y USUARIO</center></h3><center>";
    content = content + "<span style='font-size:13px; font-weight:800'> Nombre: "+ data.nombres +" "+ data.apellidos+ "</span><br>";
    content = content + "<span style='font-size:13px; font-weight:800'> Identidad: "+ data.identidad + "</span><br>";
    content = content + "<span style='font-size:13px; font-weight:800'> Dirección: "+ data.direccion + "</span><br>";
    content = content + "<span style='font-size:13px; font-weight:800'> Movil: "+ data.movil + "</span><br>";
    content = content + "<span style='font-size:13px; font-weight:800'> Email: "+ data.email + "</span><br>";
    content = content + "<h3><center>INFORMACIÓN DE LA MASCOTA</center></h3><center>";
    content = content + "<span style='font-size:13px; font-weight:800'> Nombre: "+ mascota[0].nombre + "</span><br>";
    content = content + "<span style='font-size:13px; font-weight:800'> NumChip: "+mascota[0].numChip + "</span><br>";
    content = content + "<span style='font-size:13px; font-weight:800'> Edad: "+ mascota[0].edad + "</span><br>";
    content = content + "<span style='font-size:13px; font-weight:800'> Especie: "+ mascota[0].idEspecie + "</span><br>";
    content = content + "<span style='font-size:13px; font-weight:800'> Genero: "+ mascota[0].idGenero + "</span><br>";
    content = content + "<span style='font-size:13px; font-weight:800'> Tamaño: "+ mascota[0].tamano + "</span><br>";
    content = content + "<span style='font-size:13px; font-weight:800'> Peso: "+ mascota[0].peso + "</span><br>";
    content = content + "<span style='font-size:13px; font-weight:800'> Color: "+ mascota[0].color + "</span><br>";
    content = content + "<span style='font-size:13px; font-weight:800'> Fecha Registro: "+ mascota[0].fechaRegistro + "</span><br>";
    content = content + "<img style='width:40px;height:50px; display:block; margin:auto;' src='"+ this.url +mascota[0].urlFoto +"'><br>";
 
    content = content + "<br><br><br><span style='font-size:13px; font-weight:800'> Generado Por: "+ this.nombreCompleto + "</span><br>";
    
  
   /* content = content + this.contenidoContrado[0].contenido;*/
    let htmlDocumennt = '<!DOCTYPE html><html><head><meta charset="utf-8"><title></title>';
    htmlDocumennt = htmlDocumennt + '</head><body>' + content + '</body></html>';
    const converted = htmlDocx.asBlob(htmlDocumennt);
    saveAs(converted,"infoMascotaUsuario.docx");
 }

 generarWord2(data){
   
  let content ="<h3><center>INFORMACIÓN DE MASCOTA Y USUARIO</center></h3><center>";
  content = content + "<span style='font-size:13px; font-weight:800'> Nombre: "+ data.nombres +" "+ data.apellidos+ "</span><br>";
  content = content + "<span style='font-size:13px; font-weight:800'> Identidad: "+ data.identidad + "</span><br>";
  content = content + "<span style='font-size:13px; font-weight:800'> Dirección: "+ data.direccion + "</span><br>";
  content = content + "<span style='font-size:13px; font-weight:800'> Movil: "+ data.movil + "</span><br>";
  content = content + "<span style='font-size:13px; font-weight:800'> Email: "+ data.email + "</span><br>";
  content = content + "<h3><center>INFORMACIÓN DE LA MASCOTA</center></h3><center>";
  content = content + "<span style='font-size:13px; font-weight:800'> El Usuario no tiene ninguna información relacionada con mascotas!!!</span><br>";
  content = content + "<br><br><br><span style='font-size:13px; font-weight:800'> Generado Por: "+ this.nombreCompleto + "</span><br>";
  

 /* content = content + this.contenidoContrado[0].contenido;*/
  let htmlDocumennt = '<!DOCTYPE html><html><head><meta charset="utf-8"><title></title>';
  htmlDocumennt = htmlDocumennt + '</head><body>' + content + '</body></html>';
  const converted = htmlDocx.asBlob(htmlDocumennt);
  saveAs(converted,"infoMascotaUsuario.docx");
}

}
