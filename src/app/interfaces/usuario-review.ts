export interface UsuarioReview {
  _id: string,
  usuario:{
    _id: string,
    nombre: string,
    apellidos: string
  },
  pelicula: {
    _id: string,
    nombre: string,
    imagenPelicula: string
  },
  calificacion: Number,
}
