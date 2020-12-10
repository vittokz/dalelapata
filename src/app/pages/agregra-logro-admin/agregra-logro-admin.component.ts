import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserPlataformaService } from 'src/app/servicios/userPlataforma/user-plataforma.service';
import { LogroService } from 'src/app/servicios/logros/logro.service';
import { Logros } from 'src/app/modelos/modulo-logros/logros-modelo';

@Component({
  selector: 'app-agregra-logro-admin',
  templateUrl: './agregra-logro-admin.component.html',
  styleUrls: ['./agregra-logro-admin.component.css']
})
export class AgregraLogroAdminComponent implements OnInit {
  dato: {
    idMascota: string,
    idUsuario: string
};
alerts:any;
public insertado: Number;
public eliminado: Number;
respuestaEliminado: string;
nuevoLogro: Logros=new Logros();
listaLogro: Logros[];
envioForm: string="";
registro: FormGroup;
defaultAlerts: any[] = [
  {
    type: 'success',
    msg: 'Se registro correctamente el registro de la mascota !!!'
  }
];

constructor(private formBuild: FormBuilder,
  private logroService: LogroService, private ruta :Router,
  private rutaActiva: ActivatedRoute) {
     this.alerts = this.defaultAlerts;
     this.dato = {
      idMascota: this.rutaActiva.snapshot.params.parametro,
      idUsuario: this.rutaActiva.snapshot.params.parametro2
    };
    this.crearFormulario();//formulario logros
    this.cargarLogros();
  }

  cargarLogros(){
    this.logroService.getLogrosIdMascota(this.dato.idMascota).subscribe(
      data=>{
        this.listaLogro = data;
      }
    )
  }
  
  eliminarLogro(idLogro: string){
    const idLo: Number = Number(idLogro);
    this.logroService.eliminarLogro(idLogro).subscribe(
      data=>{
        this.eliminado = data["resul"];
            if(this.eliminado > 0){
             this.respuestaEliminado="ok";
             this.cargarLogros();
            // this.ruta.navigate(['/agregarLogoAdmin',this.dato.idMascota,this.dato.idUsuario]);
          }
          if(this.eliminado != 1){
            this.respuestaEliminado="error";
          }
       }
    );  
  }

  crearFormulario(){
    this.registro = this.formBuild.group({
      nombre: ['',Validators.required],
      fecha: ['',Validators.required],
      estadoMascota: ['',Validators.required],
      descripcion: ['',Validators.required],
      avatar : ['', Validators.required]
    })
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }
  
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registro.get('avatar').setValue(file);
    }
  }

  agregarMomento(){
    const frm = this.registro.value;
    this.nuevoLogro.nombre = frm.nombre;
    this.nuevoLogro.descripcion = frm.descripcion;
    this.nuevoLogro.fecha = frm.fecha;
    this.nuevoLogro.estado = "Activo";
    this.nuevoLogro.estadoMascota = frm.estadoMascota;
    this.nuevoLogro.img = frm.avatar;
    this.nuevoLogro.idMascota = this.dato.idMascota;
    this.nuevoLogro.idUsuario = this.dato.idUsuario;

    const formData = new FormData();
    formData.append('nombre', this.registro.get('nombre').value);
    formData.append('descripcion', this.registro.get('descripcion').value);
    formData.append('fecha', this.registro.get('fecha').value);
    formData.append('avatar', this.registro.get('avatar').value);
    formData.append('estado', 'Activo');
    formData.append('estadoMascota', this.registro.get('estadoMascota').value);
    formData.append('idUsuario', this.dato.idUsuario);
    formData.append('idMascota', this.dato.idMascota);

    this.logroService.uploadFile(formData).subscribe(
      data=>{
        this.insertado = data["resul"];
            if(this.insertado == 1){
              this.envioForm="ok";
              this.listaLogro.unshift(this.nuevoLogro);
              this.registro.reset();
          }
          if(this.insertado != 1){
            this.envioForm="error";
          }
       }
    );  
}

  ngOnInit(): void {

  }

}
