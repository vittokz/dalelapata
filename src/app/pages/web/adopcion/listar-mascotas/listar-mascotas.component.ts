import { environment } from './../../../../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { MascotasService } from '../../../../servicios/mascotas/mascotas.service';
import { Mascota } from '../../../../modelos/modulo-mascota/mascota-modulo';
import { EventosService } from 'src/app/servicios/eventos/eventos.service';
import { Ciudad } from 'src/app/modelos/modulo-ciudades/ciudades-modelo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-listar-mascotas',
  templateUrl: './listar-mascotas.component.html',
  styleUrls: ['./listar-mascotas.component.css']
})
export class ListarMascotasComponent implements OnInit {
  mascotas: Mascota[];
  buscarMascotas: FormGroup;
  url: string = environment.url;
  mascotaMinimo:Mascota [];
  tiposMascota:string="Caninos";
  municipio: string;
  ciudades: Ciudad[];
  tipoMascota: string = "Canino";
  ciudadSelec: string="PASTO";
  public cantidadMascotas: number;
  constructor(private mascotaService: MascotasService,
    private formBuild: FormBuilder) { }

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

  asignarFormulario(tipo:string, ciudad:string){
    this.buscarMascotas.get('tipo').setValue(tipo)
    this.buscarMascotas.get('municipio').setValue(ciudad)
  }

  crearFormulario(){
    this.buscarMascotas = this.formBuild.group({
      municipio: ['',Validators.required],
      tipo: ['',Validators.required]
    });
  }

  
 realizarBusqueda(){
    const frm = this.buscarMascotas.value;
    this.tiposMascota = frm.tipo;
    this.cargarMascotas(frm.tipo,frm.municipio);
}

  cargarMascotas(tipo: string, ciudadSelec: string){
    this.mascotas = [];
    this.mascotaService.getMascotasPorAdoptarTipo(tipo,ciudadSelec).subscribe(
      (data)=>{
        this.mascotas = data;
       this.cantidadMascotas = this.mascotas.length;
      }
    );
  }
 
}
