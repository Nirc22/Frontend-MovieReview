export interface Pelicula {
  _id: string,
  nombre: string,
  director: {
    _id: string,
    nombre: string,
    apellido: string,
  },
  actores:[{
    actor:{
      _id: string,
      nombre: string,
      apellido: string
    }
  }],
  anio:Date,
  generos:[{
    genero:{
      _id: string,
      nombre: string,
    }
  }],
  calificacion:{
    id: string,
    pelicula: string,
    numReviews: Number,
    sumReviews: Number,
    calificacion: Number
  },
  // imagenPelicula:{
  //   type: string,
  //   require: true
  // }

}
