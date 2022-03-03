import { environment } from "src/environments/environment.prod";
import { Component, OnInit } from "@angular/core";
import { EventosService } from "../../../servicios/eventos/eventos.service";
import { FormBuilder, FormGroup, Validators, NgForm } from "@angular/forms";
import { Eventos } from "../../../modelos/modulo-eventos/evento-modelo";
import { UserInterface } from "src/app/modelos/modulo-usuariosAdmin/usuarioAdmin-modelo";
import { AuthUsuariosService } from "src/app/servicios/usuariosAdmin/auth-usuarios.service";
import { Ciudad } from "src/app/modelos/modulo-ciudades/ciudades-modelo";
import { MascotasService } from "src/app/servicios/mascotas/mascotas.service";

@Component({
  selector: "app-form-evento",
  templateUrl: "./form-evento.component.html",
  styleUrls: ["./form-evento.component.css"],
})
export class FormEventoComponent implements OnInit {
  evento: Eventos = new Eventos();
  formulario: FormGroup;
  ciudades: Ciudad[];
  envioForm: Boolean = false;
  identidadUsuario: string;
  usuarioLogueado: UserInterface[];
  municipioUsuario: string;

  constructor(
    private eventoService: EventosService,
    private formBuilder: FormBuilder,
    private authService: AuthUsuariosService,
    private mascotaService: MascotasService
  ) {}

  ngOnInit(): void {
    this.identidadUsuario = this.authService.getCurrentUser();
    this.crearFormulario();
    this.cargarCiudades();
    this.cargarUsuario(this.identidadUsuario);
  }

  cargarUsuario(identidad: string) {
    this.authService.getUsuarioPorIdentidad(identidad).subscribe((data) => {
      this.usuarioLogueado = data;
      this.municipioUsuario = this.usuarioLogueado[0].municipio;
    });
  }

  cargarCiudades() {
    this.mascotaService.getCiudades().subscribe((dataCiudades) => {
      this.ciudades = dataCiudades;
    });
  }

  crearFormulario() {
    this.formulario = this.formBuilder.group({
      //municipio: ["", Validators.required],
      nombre: ["", Validators.required],
      descripcion: ["", Validators.required],
      fechaEvento: [""],
      avatar: ["", Validators.required],
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formulario.get("avatar").setValue(file);
    }
  }

  agregarEvento() {
    const formData = new FormData();
    //formData.append("municipio", this.formulario.get("municipio").value);
    formData.append("nombre", this.formulario.get("nombre").value);
    formData.append("descripcion", this.formulario.get("descripcion").value);
    formData.append("fechaEvento", this.formulario.get("fechaEvento").value);
    formData.append("avatar", this.formulario.get("avatar").value);
    formData.append("usuarioRegistro", this.identidadUsuario);
    this.eventoService.uploadFile(formData).subscribe(
      (data) => {
        if (data["resul"] > 0) {
          console.log(data);
          this.envioForm = true;
          this.formulario.reset();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
