
import { Injectable, inject } from '@angular/core';

import {
  Database,
  ref,
  get,
  set,
  push,
  remove
} from '@angular/fire/database';

import { Maraton } from '../models/maraton';

@Injectable({
  providedIn: 'root'
})
export class MaratonesService {

  private database = inject(Database);

  private ruta(usuarioId: string): string {
    return `maratones/${usuarioId}`;
  }

  async obtenerMaratones(usuarioId: string): Promise<any[]> {

    const referencia = ref(
      this.database,
      this.ruta(usuarioId)
    );

    const resultado = await get(referencia);

    if (!resultado.exists()) {
      return [];
    }

    const datos = resultado.val();

    return Object.keys(datos).map(id => ({
      id,
      ...datos[id]
    }));
  }

  async crearMaraton(
    usuarioId: string,
    nombre: string
  ): Promise<void> {

    const referencia = ref(
      this.database,
      this.ruta(usuarioId)
    );

    const nuevaReferencia = push(referencia);

    await set(nuevaReferencia, {
      nombre,
      peliculas: {}
    });
  }

  async agregarPelicula(
    usuarioId: string,
    maratonId: string,
    peliculaId: string,
    pelicula: any
  ): Promise<boolean> {

    const referencia = ref(
      this.database,
      `${this.ruta(usuarioId)}/${maratonId}/peliculas/${peliculaId}`
    );

    const resultado = await get(referencia);

    if (resultado.exists()) {
      return false;
    }

    await set(referencia, {
      titulo: pelicula.titulo,
      duracion: pelicula.duracion
    });

    return true;
  }

  async quitarPelicula(
    usuarioId: string,
    maratonId: string,
    peliculaId: string
  ): Promise<void> {

    const referencia = ref(
      this.database,
      `${this.ruta(usuarioId)}/${maratonId}/peliculas/${peliculaId}`
    );

    await remove(referencia);
  }

  async eliminarMaraton(
    usuarioId: string,
    maratonId: string
  ): Promise<void> {

    const referencia = ref(
      this.database,
      `${this.ruta(usuarioId)}/${maratonId}`
    );

    await remove(referencia);
  }
}
