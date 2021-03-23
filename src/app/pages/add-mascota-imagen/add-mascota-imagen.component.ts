import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/modelos/modulo-mascota/mascota-modulo';
import { MascotasService } from 'src/app/servicios/mascotas/mascotas.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-add-mascota-imagen',
  templateUrl: './add-mascota-imagen.component.html',
  styleUrls: ['./add-mascota-imagen.component.css']
})
export class AddMascotaImagenComponent implements OnInit {

  registro: FormGroup;
  posicion: string;
  mascota: Mascota [];
  envioForm: Boolean=false;
  url: string =environment.url+ 'mascotas/img/';
  dato: {
    idMascota: string
};
  constructor(private formBuild: FormBuilder,private rutaActiva: ActivatedRoute,
    private mascotaService : MascotasService,private ruta:Router) { }

  ngOnInit(): void {
    this.dato = {
      idMascota: this.rutaActiva.snapshot.params.parametro,
    };
    this.cargarMascota();
    this.crearFormulario();
  }
  cargarMascota() {
    this.mascotaService.getIdMascota(this.dato.idMascota).subscribe(
       (data)=>{
       this.mascota = data;
       }
    );
  }

  crearFormulario(){
    this.registro = this.formBuild.group({
      avatar: ['', Validators.required]
    });
  }

  agregarImg(){
    const formData = new FormData();
    formData.append('idMascota', this.dato.idMascota);
    formData.append('avatar', this.registro.get('avatar').value);
    
     this.mascotaService.subirImagenMascota(formData).subscribe(
      data=>{
          if(data["resul"] > 0){
              this.envioForm=true;  
              this.registro.reset();
              this.cargarMascota();
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


}