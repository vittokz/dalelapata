import { UserPagina } from 'src/app/modelos/modulo-usuario/usuarioPagina-modelo';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MascotasService } from '../../servicios/mascotas/mascotas.service';
import { FundacionService } from '../../servicios/fundacion/fundacion.service';
import { Fundacion } from '../../modelos/modulo-fundacion/fundacion-modelo';
import { Mascota, Raza } from '../../modelos/modulo-mascota/mascota-modulo';
import { Ciudad } from '../../modelos/modulo-ciudades/ciudades-modelo';
import { AuthUsuariosService } from '../../servicios/usuariosAdmin/auth-usuarios.service';
import { UserPlataformaService } from 'src/app/servicios/userPlataforma/user-plataforma.service';
import { UserInterface } from 'src/app/modelos/modulo-usuariosAdmin/usuarioAdmin-modelo';

@Component({
  selector: 'app-add-mascota',
  templateUrl: './add-mascota.component.html',
  styleUrls: ['./add-mascota.component.css']
})
export class AddMascotaComponent implements OnInit {
  ciudades: Ciudad;
  ciudadesFormulario: Ciudad[];
  razas: Raza;
  canChip: string;
  numChip: number;
  mascota: Mascota= new Mascota();
  dismissible = true;
  fundaciones: Fundacion[];
  envioForm: string="";
  registro: FormGroup;
  public razonSocial: string;
  public insertado: Number;
  identidadUsuario:string;
  alerts:any;
  usuario: UserPagina=new UserPagina();
  tipoUsuario: string;
  usuarioLogueado: UserInterface[];
  defaultAlerts: any[] = [
  {
    type: 'info',
    msg: 'Se registro correctamente la mascota !!!'
  }
];
  constructor(private formBuild: FormBuilder,private userAuth: AuthUsuariosService,
    private userPlataformaService: UserPlataformaService,
    private fundacionService: FundacionService, private mascotaService: MascotasService) {
      this.alerts = this.defaultAlerts;
     }
  
    ngOnInit(): void {
      this.identidadUsuario = this.userAuth.getCurrentUser();
      this.cargarUsuario(this.identidadUsuario);
      this.crearFormulario();
      this.cargarRazas();
      this.cargarCiudades();
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

    cargarFundaciones(){
      this.fundacionService.getFundaciones().subscribe(
        data=>{
            this.fundaciones=data;
           
        }
      );
    }

    onFileSelect(event) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.registro.get('avatar').setValue(file);
      }
    }


  crearFormulario(){
    this.registro = this.formBuild.group({
      chip: ['', [Validators.required, Validators.minLength(15)]],
      fundacion: ['',Validators.required],
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
      avatar: ['',Validators.required],
      descripcion: ['', Validators.required]
    })
  }

  agregarMascota(){
    
    const formData = new FormData();
    formData.append('idUsuario', this.identidadUsuario);
    formData.append('idFundacion',this.registro.get('fundacion').value);
    formData.append('microChip', this.registro.get('chip').value);
    formData.append('nombre', this.registro.get('nombre').value);
    formData.append('edad', this.registro.get('edad').value);
    formData.append('raza', this.registro.get('raza').value);
    formData.append('especie', this.registro.get('especie').value);
    formData.append('genero', this.registro.get('genero').value);
    formData.append('tamano', this.registro.get('tamano').value);
    formData.append('peso', this.registro.get('peso').value);
    formData.append('ciudad', this.registro.get('ciudad').value);
    formData.append('estadoMascota', this.registro.get('estadoMascota').value);
    formData.append('color', this.registro.get('color').value);
    formData.append('avatar', this.registro.get('avatar').value);
    formData.append('descripcion', this.registro.get('descripcion').value);
    this.mascotaService.uploadFile(formData).subscribe(
      data=>{
       this.insertado = data.resul;
       if(this.insertado == -1){
        this.envioForm="errorMicro";
       }
        if(this.insertado == 1){
           this.envioForm="ok";
          // this.mascotasFundacion.push(this.mascota);
           this.registro.reset();
        }
        if(this.insertado == 0){
          this.envioForm="error";
       }
      });
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

onClosed(dismissedAlert: any): void {
  this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
}

cargandoImagen(even){

}


}
