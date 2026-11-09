export interface Maraton {
  id?: string;
  nombre: string;
  peliculas: {
    [id: string]: {
      titulo: string;
      duracion: number;
    };
  };
}