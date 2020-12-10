export class Mascota{
        idMascota: string;
        numChip: string;
        idUsuario: string;
        idFundacion: string;
        nombre: string;
        edad: string;
        descripcion: string;
        observacion?: string;
        idRaza: string;
        idEspecie: string;
        idGenero: string;
        tamano: string;
        estadoMascota: string;
        urlFoto: string;
        peso: string;
        ciudad: string;
        color: string;
        idCondiCorporal: string;
        fechaRegistro: string;
        fechaAdopcion: string;
        fechaEdicion: string;
        usuarioEdito: string;
        usuarioRegistro: string;
        estado: string;        
}

export class Raza {
        id: string;
        nombre: string;
        idEspecie: string;
        fechaRegistro: string;
        usuarioRegistro: string;
        estado: string;
}

export class Postulados{
        idPostulado: string;
        idUsuario: string;
        idMascota: string;
        idTipoRelacion: string;
        estadoPostulado:string;
        fechaRegistro: string;
}