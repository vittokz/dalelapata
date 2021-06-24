import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PodCats } from "src/app/modelos/modulo-podcats/podcats-modelo";
import { PodcatsService } from "src/app/servicios/podcats/podcats.service";
import { UserPlataformaService } from "src/app/servicios/userPlataforma/user-plataforma.service";
import { AuthUsuariosService } from "src/app/servicios/usuariosAdmin/auth-usuarios.service";

@Component({
  selector: "app-admin-pod-cast",
  templateUrl: "./admin-pod-cast.component.html",
  styleUrls: ["./admin-pod-cast.component.css"],
})
export class AdminPodCastComponent implements OnInit {
  formulario: FormGroup;
  loading: string;
  identidadUsuario: string;
  listaPodcats: PodCats[];
  envioForm: boolean = false;
  uploadResponse;

  constructor(
    private formBuilder: FormBuilder,
    private podCatsService: PodcatsService,
    private userPlataformaService: UserPlataformaService,
    private authService: AuthUsuariosService
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.identidadUsuario = this.authService.getCurrentUser();
    this.cargarPodCats();
  }
  cargarPodCats() {
    this.podCatsService.getAllPodCats().subscribe((dataPodCats) => {
      this.listaPodcats = dataPodCats;
    });
  }

  crearFormulario() {
    this.formulario = this.formBuilder.group({
      nombre: ["", Validators.required],
      descripcion: ["", Validators.required],
      link: ["", Validators.required],
      /*  avatar: [''] */
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formulario.get("avatar").setValue(file);
    }
  }

  agregarPodCast() {
    const formData = new FormData();
    formData.append("nombre", this.formulario.get("nombre").value);
    formData.append("descripcion", this.formulario.get("descripcion").value);
    formData.append("link", this.formulario.get("link").value);
    // formData.append('avatar', this.formulario.get('avatar').value);
    formData.append("identidadRegistra", this.identidadUsuario);

    this.podCatsService.addPodCats(formData).subscribe(
      (res) => {
        if (res == "ok") {
          this.envioForm = true;

          this.formulario.reset();
          setTimeout(() => {
            this.envioForm = false;
          }, 2000);
          this.cargarPodCats();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  eliminarLink(podCats: PodCats) {
    this.podCatsService.eliminarPodCats(podCats.id).subscribe((res) => {
      console.log(res);
      this.cargarPodCats();
    });
  }
}
