import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { FaunaService } from '../../../servicios/fauna/fauna.service';
import { Noticias, Archivo } from '../../../modelos/modulo-fauna/fauna-modelo';

@Component({
  selector: 'app-form-fauna',
  templateUrl: './form-fauna.component.html',
  styleUrls: ['./form-fauna.component.css']
})
export class FormFaunaComponent implements OnInit {
  formulario: FormGroup;
  noticia:Noticias= new Noticias();
  envioForm:boolean=false;
  uploadResponse;
 
  constructor(private formBuilder: FormBuilder, public noticiaService: FaunaService) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

 crearFormulario(){
    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      avatar: ['']
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formulario.get('avatar').setValue(file);
    }
  }

  agregarNoticia() {
    const formData = new FormData();
    formData.append('nombre', this.formulario.get('nombre').value);
    formData.append('descripcion', this.formulario.get('descripcion').value);
    formData.append('avatar', this.formulario.get('avatar').value);

    this.noticiaService.uploadFile(formData).subscribe(
      (res) => {
        this.uploadResponse = res;
        this.envioForm=true;
        this.formulario.reset();
      },
      (err) => {  
        console.log(err);
      }
    );
  }
/*
  agregarNoticia(){
    const frm = this.formulario.value;
    this.noticia.nombre= frm.nombre;
    this.noticia.descripcion = frm.descripcion;
    this.noticiaService.addNoticia(this.noticia);
    //this.noticiaService.agregarNoti(this.noticia);
   
    if(this.formulario.controls['nombre'].valid && this.formulario.controls['descripcion'].valid){
      this.envioForm=true;
    }
    this.formulario.reset();
  }*/

}
