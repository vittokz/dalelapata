import { Component, OnInit } from '@angular/core';
import { MascotasService } from '../../../../servicios/mascotas/mascotas.service';
import { Mascota } from '../../../../modelos/modulo-mascota/mascota-modulo';
import { environment } from 'src/environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ciudad } from 'src/app/modelos/modulo-ciudades/ciudades-modelo';

@Component({
  selector: 'app-lista-extraviadas',
  templateUrl: './lista-extraviadas.component.html',
  styleUrls: ['./lista-extraviadas.component.css']
})
export class ListaExtraviadasComponent implements OnInit {
  mascotas: Mascota[];
  buscarMascotas: FormGroup;
  mascotaMinimo:Mascota [];
  tiposMascota:string="Caninos";
  municipio: string;
  ciudades: Ciudad[];
  tipoMascota: string = "Canino";
  ciudadSelec: string="PASTO";
  url: string = environment.url;
  public cantidadMascotas: number;
  constructor(private mascotaService: MascotasService, private formBuild: FormBuilder) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.asignarFormulario(this.tipoMascota,this.ciudadSelec);
    this.cargarCiudades();
    this.cargarMascotas(this.tipoMascota,this.ciudadSelec);
  }

  cargarCiudades(){
    this.mascotaService.getCiudades().subscribe(
      (dataCiudades)=>{
        this.ciudades = dataCiudades;
       }
    );
  }
  crearFormulario(){
    this.buscarMascotas = this.formBuild.group({
      municipio: ['',Validators.required],
      tipo: ['',Validators.required]
    });
  }

  asignarFormulario(tipo:string, ciudad:string){
    this.buscarMascotas.get('tipo').setValue(tipo)
    this.buscarMascotas.get('municipio').setValue(ciudad)
  }
  
 realizarBusqueda(){
    const frm = this.buscarMascotas.value;
    this.tiposMascota = frm.tipo;
    this.cargarMascotas(frm.tipo,frm.municipio);
}

  cargarMascotas(tipo: string, ciudadSelec: string){
    this.mascotas = [];
    this.mascotaService.getMascotasExtraviadasTipo(tipo,ciudadSelec).subscribe(
      (data)=>{
        this.mascotas = data;
        console.log(this.mascotas);
        this.cantidadMascotas = this.mascotas.length;
      }
    );
  }
}
