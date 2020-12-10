import { Component, OnInit } from '@angular/core';
import { Ciudad } from '../../../../../modelos/modulo-ciudades/ciudades-modelo';
import { Raza, Mascota } from '../../../../../modelos/modulo-mascota/mascota-modulo';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserPlataformaService } from '../../../../../servicios/userPlataforma/user-plataforma.service';
import { MascotasService } from '../../../../../servicios/mascotas/mascotas.service';
import { Fundacion } from '../../../../../modelos/modulo-fundacion/fundacion-modelo';
import { FundacionService } from '../../../../../servicios/fundacion/fundacion.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  [x: string]: any;
  ciudades: Ciudad;
  ciudadesFormulario: Ciudad[];
  razas: Raza;
  mascota: Mascota= new Mascota();
  dismissible = true;
  fundacion: Fundacion;
  envioForm: string="";
  registro: FormGroup;
  public razonSocial: string;
  public insertado: Number;
  alerts:any;
  defaultAlerts: any[] = [
  {
    type: 'success',
    msg: 'Se registro correctamente la mascota !!!'
  }
];

constructor(private formBuild: FormBuilder,private userPlataformaService: UserPlataformaService,
  private fundacionService: FundacionService, private mascotaService: MascotasService) {
    this.alerts = this.defaultAlerts;
   }

  ngOnInit(): void {
    this.identidadUsuario = this.userPlataformaService.getCurrentUser();
    this.cargarDatosUsuario();
    this.crearFormulario();
    this.cargarRazas();
    this.cargarCiudades();
  
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

  crearFormulario(){
    this.registro = this.formBuild.group({
      microChip: [''],
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

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registro.get('avatar').setValue(file);
    }
  }

  agregarMascota(){
    const formData = new FormData();
    formData.append('idUsuario', this.idUsuario);
    formData.append('idFundacion', this.idFundacion);
    formData.append('microChip', this.registro.get('microChip').value);
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

}
