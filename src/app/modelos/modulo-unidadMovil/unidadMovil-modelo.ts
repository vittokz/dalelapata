export class UnidadMovil {
  idVisita: string;
  idMunicipio: string;
  nomMunicipio: string;
  latitud: string;
  longitud: string;
  cantidad: string;
  proceso: string;
  fechaInicial: string;
  fechaFinal: string;
  estado: string;
  usuarioRegistro: string;
}
export class RespuestaSolicitud {
  idSolicitud?: string;
  comentarios: string;
  estado: string;
  usuarioComento?: string;
  fechaComentario?: string;
}
