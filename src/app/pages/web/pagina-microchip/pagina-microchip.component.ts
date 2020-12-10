import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MascotasService } from '../../../servicios/mascotas/mascotas.service';
import { Router } from '@angular/router';
import { Mascota } from 'src/app/modelos/modulo-mascota/mascota-modulo';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-pagina-microchip',
  templateUrl: './pagina-microchip.component.html',
  styleUrls: ['./pagina-microchip.component.css']
})
export class PaginaMicrochipComponent implements OnInit {
  mascota:Mascota [];
  mascotaEncontrada:Mascota;
  cantidad: number;
  url:string = environment.url;
  encontrado: string;
  chipBuscado:string;
  formBuscar: FormGroup;showModal=false;
  showModal2=false;
  constructor(private mascotaService: MascotasService,private ruta: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
   this.cargarMascotas();
   this.crearFormulario();
   //this.cargarMascotasMinimo();
  
  }

  listarLectores(){
    this.showModal2=true;
  }

  crearFormulario(){
    this.formBuscar = this.formBuilder.group({
      buscar: ['', Validators.required]
    });
  }


  cerrarModal(){
    this.showModal=false;
  }

  cerrarModal2(){
    this.showModal2=false;
  }
  cargarMascotas(){
    this.mascotaService.getMascotasChip().subscribe(
      (data)=>{
        this.mascota = data;
        this.cantidad = this.mascota.length;
      }
    );
  }


  buscarChip(){
    const frm = this.formBuscar.value;
    this.chipBuscado=frm.buscar;
    this.mascotaService.getMascotasIdChip(frm.buscar).subscribe(
      data=>{
            if(data["resul"] != "0"){
              this.mascotaEncontrada =data;
              this.encontrado="ok";
              this.showModal=true;
            }
            else{
              this.encontrado="error";
              this.showModal=true;
            }
        }
    );
  }

}
