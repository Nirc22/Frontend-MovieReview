export interface Usuario {
  id: string,
  nombre:string,
  apellidos:string,
  email:string,
  password: string,
  rol:{
    id: Number,
    nombre: string,
  };
}
