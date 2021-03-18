import { Banner } from './../../modelos/modulo-banner/banner-modelo';
import { AdminBannerService } from './../../servicios/adminBanner/admin-banner.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-banner',
  templateUrl: './admin-banner.component.html',
  styleUrls: ['./admin-banner.component.css']
})
export class AdminBannerComponent implements OnInit {
  listaBanner : Banner[];
  listaAliados : Banner[];
  formulario: FormGroup;
  envioForm:boolean=false;
  uploadResponse;
 
  constructor(private formBuilder: FormBuilder, private bannerService: AdminBannerService) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarBanner();
    this.cargarAliados();
  }

 crearFormulario(){
    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipo: ['', Validators.required],
      avatar: ['']
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formulario.get('avatar').setValue(file);
    }
  }

  cambiarEstado(data){
     this.bannerService.updateEstadoBanner(data.id,data.estado).subscribe(
         (res)=>{
          this.cargarBanner();
          this.cargarAliados();
         }
     );
  }

  cargarBanner(){
    this.bannerService.getBanner().subscribe(
      (resul)=> {
        this.listaBanner=resul;
      }
    );
  }

  cargarAliados(){
    this.bannerService.getAliados().subscribe(
      (resul)=> {
        this.listaAliados=resul;
      }
    );
  }

  agregarBanner() {
    console.log('ingreso');
    const formData = new FormData();
    formData.append('nombre', this.formulario.get('nombre').value);
    formData.append('tipo', this.formulario.get('tipo').value);
    formData.append('descripcion', this.formulario.get('descripcion').value);
    formData.append('avatar', this.formulario.get('avatar').value);
    
     this.bannerService.addBanner(formData).subscribe(
      (res) => {
        this.uploadResponse = res;
        this.envioForm=true;
        this.formulario.reset();
        this.cargarBanner();
        this.cargarAliados();
      },
      (err) => {  
        console.log(err);
      }
    ); 
  }

}


