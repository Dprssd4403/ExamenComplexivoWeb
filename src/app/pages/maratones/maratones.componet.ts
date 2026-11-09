
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../core/auth.service';
import { MaratonesService } from '../../core/maratones.service';

@Component({
  selector: 'app-maratones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './maratones.component.html',
  styleUrl: './maratones.component.css'
})
export class MaratonesComponent implements OnInit {

  private auth = inject(AuthService);
  private maratonesService = inject(MaratonesService);

  nombre = '';
  mensaje = '';

  maratones: any[] = [];

  maratonActual: any = null;

  peliculasMaraton: any[] = [];

  async ngOnInit(): Promise<void> {
    await this.cargarMaratones();
  }

  async cargarMaratones(): Promise<void> {

    const usuario = this.auth.obtenerUsuario();

    if (!usuario) return;

    this.maratones =
      await this.maratonesService.obtenerMaratones(usuario.id);
  }

  async crearMaraton(): Promise<void> {

    const nombreLimpio = this.nombre.trim();

    if (!nombreLimpio) {
      this.mensaje = 'Debes escribir un nombre para la maratón';
      return;
    }

    const usuario = this.auth.obtenerUsuario();

    if (!usuario) return;

    try {

      await this.maratonesService.crearMaraton(
        usuario.id,
        nombreLimpio
      );

      this.nombre = '';
      this.mensaje = 'Maratón creada correctamente';

      await this.cargarMaratones();

    } catch {
      this.mensaje = 'Error al crear la maratón';
    }
  }

  contarPeliculas(maraton: any): number {

    return Object.keys(
      maraton.peliculas || {}
    ).length;
  }

  abrirMaraton(maraton: any): void {

    this.maratonActual = maraton;

    this.actualizarPeliculas();
  }

  actualizarPeliculas(): void {

    if (!this.maratonActual) return;

    const peliculas = this.maratonActual.peliculas || {};

    this.peliculasMaraton =
      Object.keys(peliculas).map(id => ({
        id,
        ...peliculas[id]
      }));
  }

  obtenerTiempoTotal(): string {

    const minutos = this.peliculasMaraton.reduce(
      (total, pelicula) => total + Number(pelicula.duracion),
      0
    );

    const horas = Math.floor(minutos / 60);

    const minutosRestantes = minutos % 60;

    return `${String(horas).padStart(2, '0')}:${String(minutosRestantes).padStart(2, '0')}`;
  }

  async quitarPelicula(peliculaId: string): Promise<void> {

    const usuario = this.auth.obtenerUsuario();

    if (!usuario || !this.maratonActual) return;

    try {

      await this.maratonesService.quitarPelicula(
        usuario.id,
        this.maratonActual.id,
        peliculaId
      );

      await this.cargarMaratones();

      const actualizada = this.maratones.find(
        m => m.id === this.maratonActual.id
      );

      if (actualizada) {
        this.maratonActual = actualizada;
        this.actualizarPeliculas();
      }

    } catch {
      this.mensaje = 'No se pudo quitar la película';
    }
  }

  cerrarModal(): void {

    this.maratonActual = null;
    this.peliculasMaraton = [];

  }

}
