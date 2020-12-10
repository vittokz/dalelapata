import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ciudad } from 'src/app/modelos/modulo-ciudades/ciudades-modelo';
import { Mascota } from 'src/app/modelos/modulo-mascota/mascota-modulo';
import { MascotasService } from 'src/app/servicios/mascotas/mascotas.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lista-esterilizadas',
  templateUrl: './lista-esterilizadas.component.html',
  styleUrls: ['./lista-esterilizadas.component.css']
})
export class ListaEsterilizadasComponent implements OnInit {
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
    this.mascotaService.getMascotasEsterilizadasTipo(tipo,ciudadSelec).subscribe(
      (data)=>{
        this.mascotas = data;
        console.log(this.mascotas);
        this.cantidadMascotas = this.mascotas.length;
      }
    );
  }
 
}
