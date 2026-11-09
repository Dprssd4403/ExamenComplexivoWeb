
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private url = 'http://localhost:3001/usuarios';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Usuario[]> {

  return this.http.get<Usuario[]>(
    `${this.url}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
  ).pipe(
    tap(usuarios => {
      if (usuarios.length > 0) {
        sessionStorage.setItem(
          'usuario',
          JSON.stringify(usuarios[0])
        );
      }
    })
  );
}
  obtenerUsuario(): Usuario | null {
    const usuario = sessionStorage.getItem('usuario');

    return usuario ? JSON.parse(usuario) : null;
  }

  cerrarSesion(): void {
    sessionStorage.removeItem('usuario');
  }

  estaAutenticado(): boolean {
    return this.obtenerUsuario() !== null;
  }
}
