import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Fundacion, tipoFundacion } from '../../../../modelos/modulo-fundacion/fundacion-modelo';
import { FundacionService } from '../../../../servicios/fundacion/fundacion.service';
import { TipoFundacionService } from '../../../../servicios/fundacion/tipo-fundacion.service';
import { MascotasService } from '../../../../servicios/mascotas/mascotas.service';
import { Ciudad } from '../../../../modelos/modulo-ciudades/ciudades-modelo';

@Component({
  selector: 'app-registrar-fundacion',
  templateUrl: './registrar-fundacion.component.html',
  styleUrls: ['./registrar-fundacion.component.css']
})
export class RegistrarFundacionComponent implements OnInit {
  registro: FormGroup;
  fundacion: Fundacion = new Fundacion();
  tiposFunda : tipoFundacion[];
  ciudades: Ciudad[];
  envioForm: string;
  dismissible = true;
  alerts:any;
  defaultAlerts: any[] = [
    {
      type: 'info',
      msg: 'Se registro correctamente la Fundación. El usuario es su número de identidad.!!!'
    }
  ];
  constructor(private formBuild: FormBuilder, private fundacionService: FundacionService,
    private tipoFundacionService: TipoFundacionService,private mascotaService: MascotasService) {
    this.alerts = this.defaultAlerts;
  }
  ngOnInit(): void {
    this.crearFormulario();
    this.cargarTiposFundacion();
    this.cargarCiudades();
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  cargarTiposFundacion(){
    this.tipoFundacionService.getTipoFundaciones().subscribe(
      (dataTipos)=>{
        this.tiposFunda = dataTipos;
      }
    )
  }

  cargarCiudades(){
    this.mascotaService.getCiudades().subscribe(
      (dataCiudades)=>{
        this.ciudades = dataCiudades;
      }
    )
  }


  crearFormulario(){
    this.registro = this.formBuild.group({
      tipoDoc: ['',Validators.required],
      identidad: ['',Validators.required],
      razon: ['',Validators.required],
      municipio: ['',Validators.required],
      idenRespon: ['',Validators.required],
      nomRespon: ['',Validators.required],
      telefono: ['', Validators.required],
      movil: ['',Validators.required],
      email: ['@',Validators.required],
      direccion: ['', Validators.required],
      facebook: ['', Validators.required],
      twitter: ['', Validators.required],
      clave: ['',Validators.required],
      avatar : ['', Validators.required]
    })
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registro.get('avatar').setValue(file);
    }
  }

  agregarFundacion(){
    /*const frm = this.registro.value;
    this.fundacion.idTipoFundacion = frm.tipoFun;
    this.fundacion.tipoDoc = frm.tipoDoc;
    this.fundacion.identidad = frm.identidad;
    this.fundacion.razonSocial = frm.razon;
    this.fundacion.municipio = frm.municipio;
    this.fundacion.ccResponsable = frm.idenRespon;
    this.fundacion.nombreResponsable = frm.nomRespon;
    this.fundacion.telefono = frm.telefono;
    this.fundacion.movil = frm.movil;
    this.fundacion.email = frm.email;
    this.fundacion.direccion = frm.direccion;
    this.fundacion.fechaFundacion = "no";
    this.fundacion.descripcion = "no";
    this.fundacion.facebook = frm.facebook;
    this.fundacion.twitter = frm.twitter;
    this.fundacion.clave = frm.clave;
    this.fundacion.logo = frm.avatar;*/

    const formData = new FormData();
     formData.append('tipoDoc', this.registro.get('tipoDoc').value);
    formData.append('identidad', this.registro.get('identidad').value);
    formData.append('razon', this.registro.get('razon').value);
    formData.append('municipio', this.registro.get('municipio').value);
    formData.append('ccResponsable', this.registro.get('idenRespon').value);
    formData.append('nomResponsable', this.registro.get('nomRespon').value);
    formData.append('telefono', this.registro.get('telefono').value);
    formData.append('movil', this.registro.get('movil').value);
    formData.append('email', this.registro.get('email').value);
    formData.append('direccion', this.registro.get('direccion').value);
    formData.append('facebook', this.registro.get('facebook').value);
    formData.append('twitter', this.registro.get('twitter').value);
    formData.append('clave', this.registro.get('clave').value);
    formData.append('avatar', this.registro.get('avatar').value);
   
    this.fundacionService.uploadFile(formData).subscribe(
      data=>{
        if(data["resul"]>0){
          this.envioForm="ok";
          this.registro.reset();
        }
        if(data["resul"]==0){
          this.envioForm="error";
        }
        if(data["resul"]==-1){
          this.envioForm="errorFundacion";
        }
      }
    );
    
}

}
