import { Component, OnInit } from '@angular/core';
import { Mascota } from '../../../../modelos/modulo-mascota/mascota-modulo';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserPlataformaService } from '../../../../servicios/userPlataforma/user-plataforma.service';
import { Logros } from '../../../../modelos/modulo-logros/logros-modelo';
import { LogroService } from '../../../../servicios/logros/logro.service';

@Component({
  selector: 'app-agregar-logro',
  templateUrl: './agregar-logro.component.html',
  styleUrls: ['./agregar-logro.component.css']
})
export class AgregarLogroComponent implements OnInit {
  dismissible = true;
  identidadUsuario: string;
  mascota: Mascota= new Mascota();
  nuevoLogro: Logros=new Logros();
  listaLogro: Logros[];
  envioForm: string="";
  registro: FormGroup;
  alerts:any;
  public insertado: Number;
  public idUsuario: string;
  public isLogueado: Boolean=false;
  defaultAlerts: any[] = [
  {
    type: 'success',
    msg: 'Se registro correctamente el registro de la mascota !!!'
  }
];

dato: {
    idMascota: string,
    idUsuario: string
};


  constructor(private formBuild: FormBuilder,private ruta: Router,
    private userPlataformaService: UserPlataformaService, private logroService: LogroService,
    private rutaActiva: ActivatedRoute) {
    this.alerts = this.defaultAlerts;
   }

  ngOnInit(): void {
    this.dato = {
      idMascota: this.rutaActiva.snapshot.params.parametro,
      idUsuario: this.rutaActiva.snapshot.params.parametro2
    };
    this.identidadUsuario = this.userPlataformaService.getCurrentUser();
    this.verificarAccesoUsuario();
    this.crearFormulario();//formulario logros
    this.cargarLogros();
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registro.get('avatar').setValue(file);
    }
  }

  cargarLogros(){
    this.logroService.getLogrosIdMascota(this.dato.idMascota).subscribe(
      data=>{
        this.listaLogro = data;
      }
    )
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

  verificarAccesoUsuario(): void{
    if(this.userPlataformaService.getCurrentUser() == null){
      this.isLogueado=false;
      this.ruta.navigateByUrl('/loginUser');
     }
   else{
     this.isLogueado=true;
     
    }
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }


  volverPerfil(){
   this.ruta.navigateByUrl("/perfil-usuario");
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

}
