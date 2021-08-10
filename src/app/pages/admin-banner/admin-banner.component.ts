import { Banner } from "./../../modelos/modulo-banner/banner-modelo";
import { AdminBannerService } from "./../../servicios/adminBanner/admin-banner.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
const urlBanner = "https://dalelapata.narino.gov.co/#/";
const urlArchivo = "https://dalelapata.narino.gov.co/archivos/home/";
@Component({
  selector: "app-admin-banner",
  templateUrl: "./admin-banner.component.html",
  styleUrls: ["./admin-banner.component.css"],
})
export class AdminBannerComponent implements OnInit {
  listaBanner: Banner[];
  listaAliados: Banner[];
  formulario: FormGroup;
  envioForm: boolean = false;
  tipoSeleccion: string;
  uploadResponse;
  names = ["Ttheresa"];

  constructor(
    private formBuilder: FormBuilder,
    private bannerService: AdminBannerService
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarBanner();
    this.cargarAliados();
  }

  crearFormulario() {
    this.formulario = this.formBuilder.group({
      nombre: ["", Validators.required],
      descripcion: ["https://dalelapata.narino.gov.co/", Validators.required],
      tipo: ["", Validators.required],
      avatar: [""],
      avatar2: [""],
    });
  }

  seleccion(evento) {
    this.tipoSeleccion = evento.target.value;
    if (this.tipoSeleccion == "Banner-Archivo") {
      this.formulario
        .get("descripcion")
        .setValue("https://dalelapata.narino.gov.co/archivos/home/");
    }
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formulario.get("avatar").setValue(file);
    }
  }
  onFileSelect2(event) {
    if (event.target.files.length > 0) {
      const file2 = event.target.files[0];
      this.formulario.get("avatar2").setValue(file2);
    }
  }

  cambiarEstado(data) {
    this.bannerService
      .updateEstadoBanner(data.id, data.estado)
      .subscribe((res) => {
        this.cargarBanner();
        this.cargarAliados();
      });
  }

  cargarBanner() {
    this.bannerService.getBanner().subscribe((resul) => {
      this.listaBanner = resul;
    });
  }

  cargarAliados() {
    this.bannerService.getAliados().subscribe((resul) => {
      this.listaAliados = resul;
    });
  }

  agregarBanner() {
    const formData = new FormData();
    formData.append("nombre", this.formulario.get("nombre").value);
    formData.append("tipo", this.formulario.get("tipo").value);
    formData.append("descripcion", this.formulario.get("descripcion").value);
    formData.append("avatar", this.formulario.get("avatar").value);
    formData.append("avatar2", this.formulario.get("avatar2").value);

    this.bannerService.addBanner(formData).subscribe(
      (res) => {
        this.uploadResponse = res;
        this.envioForm = true;
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
