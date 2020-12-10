export class UserPagina{
     idUsuario:  string;
     nomUsuario: string;
     idFundacion: string;
     tipoDoc: string;
     identidad: string;
     idCiudad: string;
     nombres: string;
     apellidos: string;
     direccion: string;
     telefono: string;
     movil: string;
     clave: string;
     email: string;
     facebook: string;
     twitter: string;
     fechaRegistro: string;
     estado: string;

     constructor(){
          this.idUsuario= this.idUsuario;
          this.nomUsuario= this.nomUsuario;
          this.idFundacion= this.idFundacion
          this.tipoDoc= this.tipoDoc;
          this.identidad = this.identidad;
          this.idCiudad = this.idCiudad;
          this.nombres = this.nombres;
          this.apellidos = this.apellidos;
          this.direccion= this.direccion;
          this.telefono= this.telefono;
          this.movil= this.movil;
          this.clave = this.clave;
          this.email= this.email;
          this.facebook= this.facebook;
          this.twitter= this.twitter;
          this.fechaRegistro= this.fechaRegistro;
          this.estado= this.estado;
     }
}

export class UserPagAuth{
     identidad: string;
     nomUsuario: string;
     clave: string;
}