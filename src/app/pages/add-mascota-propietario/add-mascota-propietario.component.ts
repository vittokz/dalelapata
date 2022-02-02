import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Mascota } from "src/app/modelos/modulo-mascota/mascota-modulo";
import { MascotasService } from "src/app/servicios/mascotas/mascotas.service";
import { environment } from "src/environments/environment.prod";

@Component({
  selector: "app-add-mascota-propietario",
  templateUrl: "./add-mascota-propietario.component.html",
  styleUrls: ["./add-mascota-propietario.component.css"],
})
export class AddMascotaPropietarioComponent implements OnInit {
  registro: FormGroup;
  posicion: string;
  mascota: Mascota[];
  envioForm: Boolean = false;
  url: string = environment.url + "mascotas/img/";
  dato: {
    idMascota: string;
  };
  constructor(
    private formBuild: FormBuilder,
    private rutaActiva: ActivatedRoute,
    private mascotaService: MascotasService,
    private ruta: Router
  ) {}

  ngOnInit(): void {
    this.dato = {
      idMascota: this.rutaActiva.snapshot.params.parametro,
    };
    this.cargarMascota();
    this.crearFormulario();
  }
  cargarMascota() {
    this.mascotaService.getIdMascota(this.dato.idMascota).subscribe((data) => {
      this.mascota = data;
    });
  }

  crearFormulario() {
    this.registro = this.formBuild.group({
      nombres: ["", Validators.required],
      apellidos: ["", Validators.required],
      email: ["", Validators.required],
      movil: ["", Validators.required],
    });
  }

  agregarPropietario() {
    const formData = new FormData();
    formData.append("idMascota", this.dato.idMascota);
    formData.append("nombres", this.registro.get("nombres").value);
    formData.append("apellidos", this.registro.get("apellidos").value);
    formData.append("email", this.registro.get("email").value);
    formData.append("movil", this.registro.get("movil").value);

    this.mascotaService.subirPropietarioMascota(formData).subscribe((data) => {
      if (data["resul"] > 0) {
        this.envioForm = true;
        this.registro.reset();
      } else {
        this.envioForm = false;
      }
    });
  }
}
