
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-publico',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
   
<nav class="cine-navbar">
  <div class="container d-flex justify-content-between align-items-center">

    <a routerLink="/" class="cine-logo">
    </a>

    <div class="d-flex align-items-center gap-2">
      <a routerLink="/" routerLinkActive="active"
         class="cine-link">
        Inicio
      </a>

      <a routerLink="/login" routerLinkActive="active"
         class="cine-link">
        Iniciar sesión
      </a>

      <a routerLink="/desarrollador" routerLinkActive="active"
         class="cine-link">
        Desarrollador
      </a>
    </div>

  </div>
</nav>

<main>
  <router-outlet></router-outlet>
</main>

  `
})
export class PublicoComponent {}
