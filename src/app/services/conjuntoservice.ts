import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { ConjuntoOpcion } from '../models/conjuntomodel';
import { Resultado } from '../models/resultadomodel';
import { armarError, armarLista } from './resultados';

@Injectable({ providedIn: 'root' })
export class Conjuntoservice {
  private cliente: HttpClient = inject(HttpClient);
  private readonly URL_BASE: string = 'http://localhost:8080/conjuntos';

  pedirOpciones(): Observable<HttpResponse<ConjuntoOpcion[]>> {
    return this.cliente.get<ConjuntoOpcion[]>(this.URL_BASE, { observe: 'response' });
  }

  obtenerOpciones(): Observable<Resultado<ConjuntoOpcion[]>> {
    return this.pedirOpciones().pipe(
      map((respuesta) => armarLista(respuesta)),
      catchError((error: HttpErrorResponse) =>
        of(armarError(error, 'No pudimos cargar los conjuntos. Revisa tu conexión e intenta de nuevo.')),
      ),
    );
  }
}
