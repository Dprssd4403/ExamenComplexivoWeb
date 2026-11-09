
import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { PeliculasService } from '../../core/peliculas.service';
import { MaratonesService } from '../../core/maratones.service';
import { AuthService } from '../../core/auth.service';

import { Pelicula } from '../../models/pelicula';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.css'
})

export class PeliculasComponent implements OnInit {

  private peliculasService = inject(PeliculasService);
  private maratonesService = inject(MaratonesService);
  private auth = inject(AuthService);

  peliculas: Pelicula[] = [];
  peliculasFiltradas: Pelicula[] = [];
  generos: string[] = [];

  maratones: any[] = [];

  seleccionada: Pelicula | null = null;

  maratonSeleccionada = '';
  mensaje = '';

  async ngOnInit(): Promise<void> {

    this.peliculasService.obtenerPeliculas().subscribe({
      next: datos => {

        this.peliculas = datos;
        this.peliculasFiltradas = datos;

        this.generos = [
          ...new Set(datos.map(p => p.genero))
        ];

      }
    });

    await this.cargarMaratones();
  }

  async cargarMaratones(): Promise<void> {

    const usuario = this.auth.obtenerUsuario();

    if (!usuario) return;

    this.maratones =
      await this.maratonesService.obtenerMaratones(usuario.id);
  }

  filtrar(event: Event): void {

    const genero =
      (event.target as HTMLSelectElement).value;

    if (genero === 'Todos') {
      this.peliculasFiltradas = this.peliculas;
    } else {
      this.peliculasFiltradas =
        this.peliculas.filter(p => p.genero === genero);
    }
  }

  async seleccionar(pelicula: Pelicula): Promise<void> {

    this.seleccionada = pelicula;
    this.maratonSeleccionada = '';
    this.mensaje = '';

    await this.cargarMaratones();
  }

  cerrarModal(): void {
    this.seleccionada = null;
  }

  async agregar(): Promise<void> {

    if (!this.seleccionada || !this.maratonSeleccionada) {
      this.mensaje = 'Selecciona una maratón';
      return;
    }

    const usuario = this.auth.obtenerUsuario();

    if (!usuario) return;

    try {

      const resultado =
        await this.maratonesService.agregarPelicula(
          usuario.id,
          this.maratonSeleccionada,
          this.seleccionada.id,
          this.seleccionada
        );

      if (!resultado) {
        this.mensaje =
          'Esta película ya existe en esta maratón';
        return;
      }

      this.mensaje = 'Película agregada correctamente';

      this.cerrarModal();

    } catch {
      this.mensaje = 'No se pudo agregar la película';
    }
  }

}
