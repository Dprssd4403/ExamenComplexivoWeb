
import { Component, inject } from '@angular/core';

import {
  RouterLink,
  RouterOutlet,
  Router
} from '@angular/router';

import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-privado',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <nav class="navbar navbar-dark bg-primary">
      <div class="container">

        <a class="navbar-brand" routerLink="/peliculas">
          🎬 CineMet
        </a>

        <div class="d-flex align-items-center gap-3">

          <a class="text-white" routerLink="/peliculas">
            Películas
          </a>

          <a class="text-white" routerLink="/maratones">
            Maratones
          </a>

          <span class="text-white">
            {{ nombre }}
          </span>

          <button
            class="btn btn-danger btn-sm"
            (click)="salir()">
            Cerrar sesión
          </button>

        </div>
      </div>
    </nav>

    <main class="container py-4">
      <router-outlet></router-outlet>
    </main>
  `
})
export class PrivadoComponent {

  private auth = inject(AuthService);
  private router = inject(Router);

  nombre = this.auth.obtenerUsuario()?.nombre ?? '';

  salir(): void {
    this.auth.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
