import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInterface } from '../../modelos/modulo-usuariosAdmin/usuarioAdmin-modelo';
import { UserPagAuth } from '../../modelos/modulo-usuario/usuarioPagina-modelo';
import { AuthUsuariosService } from '../../servicios/usuariosAdmin/auth-usuarios.service';
import { Ciudad } from 'src/app/modelos/modulo-ciudades/ciudades-modelo';
import { MascotasService } from 'src/app/servicios/mascotas/mascotas.service';

@Component({
  selector: 'app-usuarios-sistema',
  templateUrl: './usuarios-sistema.component.html',
  styleUrls: ['./usuarios-sistema.component.css']
})
export class UsuariosSistemaComponent implements OnInit {
  formRegistro: FormGroup;
  usuarioNuevo: UserInterface = new UserInterface();
  envioForm: string;
  dismissible = true;
  ciudades: Ciudad[];
  alerts:any;
  defaultAlerts: any[] = [
    {
      type: 'info',
      msg: 'Se registro correctamente el usuario.'
    }
  ];
  constructor(private formBuilder: FormBuilder, private userService: AuthUsuariosService,
    private mascotaService: MascotasService) { 
    this.alerts = this.defaultAlerts;
  }

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarCiudades();
  }

  cargarCiudades(){
    this.mascotaService.getCiudades().subscribe(
      (dataCiudades)=>{
        this.ciudades = dataCiudades;
      }
    );
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  crearFormulario(){
    this.formRegistro = this.formBuilder.group(
      {
        tipoDoc: ['', Validators.required],
        cedula: ['', Validators.required],
        nombre: ['', Validators.required],
        apellido: ['',Validators.required],
        email: ['@',Validators.required],
        telefono: ['',Validators.required],
        direccion: ['',Validators.required],
        municipio: ['',Validators.required],
        tipoUsuario: ['',Validators.required],
        clave: ['',Validators.required]
      }
    );
  }

  agregarUsuario(){
    const form = this.formRegistro.value;
    this.usuarioNuevo.tipoDoc = form.tipoDoc;
    this.usuarioNuevo.tipoUsuario = form.tipoUsuario;
    this.usuarioNuevo.identidad = form.cedula;
    this.usuarioNuevo.nombre = form.nombre;
    this.usuarioNuevo.apellido = form.apellido;
    this.usuarioNuevo.email = form.email;
    this.usuarioNuevo.telefono = form.telefono;
    this.usuarioNuevo.direccion = form.direccion;
    this.usuarioNuevo.municipio = form.municipio;
    this.usuarioNuevo.clave = form.clave;
    this.userService.registrarUsuario(this.usuarioNuevo).subscribe(
      data=>{
        if(data["resul"]==1){
            this.envioForm = "ok";
            this.formRegistro.reset();
        }
        else{
          this.envioForm = "error";
        }
      }
    )
  }
}
