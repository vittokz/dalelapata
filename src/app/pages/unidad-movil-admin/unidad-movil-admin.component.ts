import { Component, OnInit } from '@angular/core';
import { MascotasService } from 'src/app/servicios/mascotas/mascotas.service';
import { Ciudad } from 'src/app/modelos/modulo-ciudades/ciudades-modelo';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UnidadMovil } from 'src/app/modelos/modulo-unidadMovil/unidadMovil-modelo';
import { VisitasMovilService } from 'src/app/servicios/visitas-movil/visitas-movil.service';
import { AuthUsuariosService } from 'src/app/servicios/usuariosAdmin/auth-usuarios.service';
import { ExportarService } from 'src/app/servicios/exportarExcel/exportar.service';

@Component({
  selector: 'app-unidad-movil-admin',
  templateUrl: './unidad-movil-admin.component.html',
  styleUrls: ['./unidad-movil-admin.component.css']
})
export class UnidadMovilAdminComponent implements OnInit {
  ciudades: Ciudad[];
  listaVisitas: UnidadMovil[];
  registro: FormGroup;
  envioForm: Boolean=false;
  botonEditar:Boolean=false;
  esNuevo:Boolean=true;
  visita: UnidadMovil = new UnidadMovil();
  dismissible = true;
  dismissibleSeleccionar = true;
  alerts:any;
  idVisitaModificar:string;
  alertsSeleccionar:any;
  identidadUsuario:string;
  showModal=false;
  defaultAlerts: any[] = [
    {
      type: 'info',
      msg: 'Se registro correctamente la Visita'
    }
  ];

  defaultAlertsSeleccion: any[] = [
    {
      type: 'info',
      msg: 'Se Edito correctamente!!'
    }
  ];
  constructor(private mascotaService: MascotasService,private formBuild: FormBuilder,
    private visitaService: VisitasMovilService,private authService: AuthUsuariosService,
    private exportExcelService: ExportarService) { 
      this.identidadUsuario = this.authService.getCurrentUser();
      this.alerts = this.defaultAlerts;
      this.alertsSeleccionar = this.defaultAlertsSeleccion;
    }
  
  ngOnInit(): void {
    this.crearFormulario();
    this.cargarCiudades();
    this.cargarVisitas();
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  onClosedSeleccionar(dismissedAlert: any): void {
    this.botonEditar=false;
    this.alertsSeleccionar = this.alertsSeleccionar.filter(alert => alert !== dismissedAlert);
  }

  crearFormulario(){
    this.registro = this.formBuild.group({
      municipio: ['',Validators.required],
      proceso: ['',Validators.required],
      fecha1: ['',Validators.required],
      fecha2: ['',Validators.required],
      cantidad: ['',Validators.required],
      latitud: ['',Validators.required],
      longitud: ['',Validators.required],
      estado: ['', Validators.required]
    });
  }

 
  agregarImgVisita(data){
    console.log(data);
  }

  agregarVisita(){
    const frm = this.registro.value;
    this.visita.idMunicipio= frm.municipio;
    this.visita.proceso= frm.proceso;
    this.visita.fechaInicial= frm.fecha1;
    this.visita.fechaFinal= frm.fecha2;
    this.visita.cantidad= frm.cantidad;
    this.visita.latitud= frm.latitud;
    this.visita.longitud= frm.longitud;
    this.visita.estado= frm.estado;
    this.visita.usuarioRegistro = this.identidadUsuario;

    const formData = new FormData();
    formData.append('municipio', this.registro.get('municipio').value);
    formData.append('proceso', this.registro.get('proceso').value);
    formData.append('fecha1', this.registro.get('fecha1').value);
    formData.append('fecha2', this.registro.get('fecha2').value);
    formData.append('cantidad', this.registro.get('cantidad').value);
    formData.append('latitud', this.registro.get('latitud').value);
    formData.append('longitud', this.registro.get('longitud').value);
    formData.append('estado', this.registro.get('estado').value);
    formData.append('avatar', 'no');
    formData.append('usuarioRegistro', this.identidadUsuario);

    this.visitaService.uploadFile(formData).subscribe(
      data=>{
          if(data["resul"] > 0){
              this.envioForm=true;
              this.listaVisitas.unshift(this.visita);
              this.registro.reset();
          }
         else{
            this.envioForm=false;
          }
       }

    );    
}

onFileSelect(event) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.registro.get('avatar').setValue(file);
  }
}

  cargarCiudades(){
    this.mascotaService.getCiudades().subscribe(
      (dataCiudades)=>{
        this.ciudades = dataCiudades;
      }
    )
  }

  cargarVisitas(){
    this.visitaService.getVisitas().subscribe(
      (dataVisitas)=>{
        this.listaVisitas = dataVisitas;
      }
    )
  }

  
  generarExcel(jsonElmentos: any[],nombreArchivo:string):void{
    this.exportExcelService.exportExcel(jsonElmentos,nombreArchivo);
  }


  editarVisita(paramVisita: UnidadMovil){
    //this.botonEditar=true;
    console.log(paramVisita);
    this.esNuevo=false;
    this.idVisitaModificar=paramVisita.idVisita;
    this.registro.get('municipio').setValue(paramVisita.idMunicipio)
    this.registro.get('proceso').setValue(paramVisita.proceso)
    this.registro.get('fecha1').setValue(paramVisita.fechaInicial)
    this.registro.get('fecha2').setValue(paramVisita.fechaFinal)
    this.registro.get('cantidad').setValue(paramVisita.cantidad)
    this.registro.get('estado').setValue(paramVisita.estado)
  }

  editarVisitaSeleccionada(){
    const frm = this.registro.value;
    this.visita.idVisita = this.idVisitaModificar;
    this.visita.idMunicipio= frm.municipio;
    this.visita.latitud= frm.latitud;
    this.visita.longitud= frm.longitud;
    this.visita.proceso= frm.proceso;
    this.visita.fechaInicial= frm.fecha1;
    this.visita.fechaFinal= frm.fecha2;
    this.visita.cantidad= frm.cantidad;
    this.visita.estado= frm.estado;
    this.visitaService.updateVisita(this.visita).subscribe(
      res=>{
        this.cargarVisitas();
    });
    if(this.registro.valid==true){
      
       this.botonEditar=true;
    }
    //this.registro.reset();
}
}
