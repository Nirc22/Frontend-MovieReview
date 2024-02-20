export interface Pelicula {
  id: string,
  nombre: string,
  director: {
    id: string,
    nombre: string,
    apellido: string,
  },
  actores:[{
    actor:{
      id: string,
      nombre: string,
      apellido: string
    }
  }],
  anio:Date,
  generos:[{
    genero:{
      id: string,
      nombre: string,
    }
  }],
  calificacion:{
    id: string,
    pelicula: string,
    numReviews: Number,
    sumReviews: Number,
    calificacion: Number
  }

}
