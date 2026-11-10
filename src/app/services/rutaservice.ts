import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Resultado } from '../models/resultadomodel';
import { Coordenadas, Ruta } from '../models/rutamodel';
import { armarError, armarResultado } from './resultados';

@Injectable({ providedIn: 'root' })
export class Rutaservice {
  private cliente: HttpClient = inject(HttpClient);
  private readonly URL_BASE: string = 'http://localhost:8080/rutas';

  enviarRuta(origen: Coordenadas, destino: Coordenadas, modo: string): Observable<HttpResponse<Ruta>> {
    return this.cliente.post<Ruta>(
      this.URL_BASE,
      {
        origenLatitud: origen.latitud,
        origenLongitud: origen.longitud,
        destinoLatitud: destino.latitud,
        destinoLongitud: destino.longitud,
        modo,
      },
      { observe: 'response' },
    );
  }

  calcularRuta(origen: Coordenadas, destino: Coordenadas, modo: string): Observable<Resultado<Ruta>> {
    return this.enviarRuta(origen, destino, modo).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) =>
        of(armarError(error, 'No pudimos calcular la ruta en este momento. Intenta de nuevo en unos minutos.')),
      ),
    );
  }
}
