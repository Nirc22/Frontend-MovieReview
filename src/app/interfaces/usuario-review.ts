export interface UsuarioReview {
  id: string,
  usuario:{
    id: string,
    nombre: string,
    apellidos: string
  },
  pelicula: {
    id: string,
    nombre: string
  },
  calificacion: Number,
}
