import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VisitasMovilService } from 'src/app/servicios/visitas-movil/visitas-movil.service';

@Component({
  selector: 'app-unidad-movil-admin-img',
  templateUrl: './unidad-movil-admin-img.component.html',
  styleUrls: ['./unidad-movil-admin-img.component.css']
})
export class UnidadMovilAdminImgComponent implements OnInit {

  registro: FormGroup;
  posicion: string;
  envioForm: Boolean=false;
  dato: {
    idVisita: string,
    urlFoto: string,
    urlFoto2: string,
    urlFoto3: string
};
  constructor(private formBuild: FormBuilder,private rutaActiva: ActivatedRoute,private visitaService: VisitasMovilService) { }

  ngOnInit(): void {
    this.dato = {
      idVisita: this.rutaActiva.snapshot.params.parametro,
      urlFoto: this.rutaActiva.snapshot.params.parametro2,
      urlFoto2: this.rutaActiva.snapshot.params.parametro3,
      urlFoto3: this.rutaActiva.snapshot.params.parametro4
    };
    this.crearFormulario();
  }

  crearFormulario(){
    this.registro = this.formBuild.group({
      avatar: ['', Validators.required]
    });
  }

  agregarImg(){
    if(this.dato.urlFoto=="no"){
      this.posicion = "1";
   }else if(this.dato.urlFoto2=="no"){
       this.posicion = "2";
    }else if(this.dato.urlFoto3=="no"){
      this.posicion = "3";
    }
    const formData = new FormData();
    formData.append('idVisita', this.dato.idVisita);
    formData.append('posicion', this.posicion);
    formData.append('avatar', this.registro.get('avatar').value);
    
    this.visitaService.uploadFileVisita(formData).subscribe(
      data=>{
          if(data["resul"] > 0){
              this.envioForm=true;  
              this.registro.reset();
          }
         else{
            this.envioForm=false;
          }
       }

    );   
  }

  eliminarImg(urlFoto: string,numero: string){
     this.visitaService.updateVisitaImg(this.dato.idVisita,urlFoto,numero);
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registro.get('avatar').setValue(file);
    }
  }


}
