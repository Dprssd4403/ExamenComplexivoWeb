
import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="card shadow mx-auto"
         style="max-width: 450px">

      <div class="card-body p-4">

        <h2 class="text-center mb-4">
          Iniciar sesión
        </h2>

        <form (ngSubmit)="ingresar()">

          <div class="mb-3">
            <label class="form-label">
              Correo electrónico
            </label>

            <input
              type="email"
              class="form-control"
              name="email"
              [(ngModel)]="email"
              required
              email
              placeholder="correo@cinemet.com">
          </div>

          <div class="mb-3">
            <label class="form-label">
              Contraseña
            </label>

            <input
              type="password"
              class="form-control"
              name="password"
              [(ngModel)]="password"
              required
              placeholder="Contraseña">
          </div>

          @if (error) {
            <div class="alert alert-danger">
              {{ error }}
            </div>
          }

          <button
            class="btn btn-primary w-100"
            type="submit">
            Entrar
          </button>

        </form>

      </div>
    </div>
  `
})
export class LoginComponent {

  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  error = '';

  ingresar(): void {

    this.error = '';

    this.auth.login(
      this.email,
      this.password
    ).subscribe({

      next: usuarios => {

        if (usuarios.length > 0) {
          this.router.navigate(['/peliculas']);
        } else {
          this.error = 'Correo o contraseña incorrectos';
        }

      },

      error: () => {
        this.error = 'No se pudo conectar con el servidor';
      }

    });
  }
}
