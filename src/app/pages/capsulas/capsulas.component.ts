import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Capsulas } from "src/app/modelos/modulo-capsulas/capsulas-modelo";
import { CapsulasService } from "src/app/servicios/capsulas/capsulas.service";
import { AuthUsuariosService } from "src/app/servicios/usuariosAdmin/auth-usuarios.service";

@Component({
  selector: "app-capsulas",
  templateUrl: "./capsulas.component.html",
  styleUrls: ["./capsulas.component.css"],
})
export class CapsulasComponent implements OnInit {
  formulario: FormGroup;
  loading: string;
  identidadUsuario: string;
  listaCapsulas: Capsulas[];
  envioForm: boolean = false;
  uploadResponse;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthUsuariosService,
    private capsulasService: CapsulasService
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.identidadUsuario = this.authService.getCurrentUser();
    this.cargarCapsulas();
  }
  cargarCapsulas() {
    this.capsulasService.getAllCapsulas().subscribe((dataCapsulas) => {
      this.listaCapsulas = dataCapsulas;
    });
  }

  crearFormulario() {
    this.formulario = this.formBuilder.group({
      descripcion: ["", Validators.required],
      link: ["", Validators.required],
    });
  }

  agregarCapsula() {
    const formData = new FormData();
    formData.append("descripcion", this.formulario.get("descripcion").value);
    formData.append("link", this.formulario.get("link").value);
    formData.append("identidadRegistra", this.identidadUsuario);

    this.capsulasService.addCapsulas(formData).subscribe(
      (res) => {
        if (res == "ok") {
          this.envioForm = true;

          this.formulario.reset();
          setTimeout(() => {
            this.envioForm = false;
          }, 2000);
          this.cargarCapsulas();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  eliminarLink(capsula: Capsulas) {
    this.capsulasService.eliminarCapsulas(capsula.id).subscribe((res) => {
      console.log(res);
      this.cargarCapsulas();
    });
  }
}
