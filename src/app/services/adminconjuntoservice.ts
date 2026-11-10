import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Conjunto } from '../models/conjuntomodel';
import { Resultado } from '../models/resultadomodel';
import { Coordenadas } from '../models/rutamodel';
import { Unidad } from '../models/unidadmodel';
import { Espacio } from '../models/espaciomodel';
import { armarError, armarLista, armarResultado } from './resultados';

@Injectable({ providedIn: 'root' })
export class Adminconjuntoservice {
  private cliente: HttpClient = inject(HttpClient);
  private readonly URL_BASE: string = 'http://localhost:8080/admin';

  pedirConjuntos(): Observable<HttpResponse<Conjunto[]>> {
    return this.cliente.get<Conjunto[]>(`${this.URL_BASE}/conjuntos`, { observe: 'response' });
  }

  pedirConjunto(id: number): Observable<HttpResponse<Conjunto>> {
    return this.cliente.get<Conjunto>(`${this.URL_BASE}/conjuntos/${id}`, { observe: 'response' });
  }

  enviarCrearConjunto(conjunto: Conjunto): Observable<HttpResponse<Conjunto>> {
    return this.cliente.post<Conjunto>(`${this.URL_BASE}/conjuntos`, conjunto, { observe: 'response' });
  }

  enviarEditarConjunto(id: number, conjunto: Conjunto): Observable<HttpResponse<Conjunto>> {
    return this.cliente.put<Conjunto>(`${this.URL_BASE}/conjuntos/${id}`, conjunto, { observe: 'response' });
  }

  enviarEstadoConjunto(id: number, activo: boolean): Observable<HttpResponse<Conjunto>> {
    return this.cliente.patch<Conjunto>(`${this.URL_BASE}/conjuntos/${id}/estado`, { activo }, { observe: 'response' });
  }

  pedirDireccion(direccion: string): Observable<HttpResponse<Coordenadas>> {
    const params = new HttpParams().set('direccion', direccion);
    return this.cliente.get<Coordenadas>(`${this.URL_BASE}/conjuntos/geocodificar`, { params, observe: 'response' });
  }

  pedirUbicacionValida(latitud: number, longitud: number): Observable<HttpResponse<Coordenadas>> {
    const params = new HttpParams().set('latitud', latitud).set('longitud', longitud);
    return this.cliente.get<Coordenadas>(`${this.URL_BASE}/conjuntos/ubicacion-valida`, { params, observe: 'response' });
  }

  pedirUnidades(conjuntoId: number): Observable<HttpResponse<Unidad[]>> {
    return this.cliente.get<Unidad[]>(`${this.URL_BASE}/conjuntos/${conjuntoId}/unidades`, { observe: 'response' });
  }

  enviarCrearUnidad(conjuntoId: number, unidad: Unidad): Observable<HttpResponse<Unidad>> {
    return this.cliente.post<Unidad>(`${this.URL_BASE}/conjuntos/${conjuntoId}/unidades`, unidad, {
      observe: 'response',
    });
  }

  enviarEditarUnidad(id: number, unidad: Unidad): Observable<HttpResponse<Unidad>> {
    return this.cliente.put<Unidad>(`${this.URL_BASE}/unidades/${id}`, unidad, { observe: 'response' });
  }

  enviarEstadoUnidad(id: number, activo: boolean): Observable<HttpResponse<Unidad>> {
    return this.cliente.patch<Unidad>(`${this.URL_BASE}/unidades/${id}/estado`, { activo }, { observe: 'response' });
  }

  pedirEspacios(conjuntoId: number): Observable<HttpResponse<Espacio[]>> {
    return this.cliente.get<Espacio[]>(`${this.URL_BASE}/conjuntos/${conjuntoId}/espacios`, { observe: 'response' });
  }

  enviarCrearEspacio(conjuntoId: number, espacio: Espacio): Observable<HttpResponse<Espacio>> {
    return this.cliente.post<Espacio>(`${this.URL_BASE}/conjuntos/${conjuntoId}/espacios`, espacio, {
      observe: 'response',
    });
  }

  enviarEditarEspacio(id: number, espacio: Espacio): Observable<HttpResponse<Espacio>> {
    return this.cliente.put<Espacio>(`${this.URL_BASE}/espacios/${id}`, espacio, { observe: 'response' });
  }

  enviarEstadoEspacio(id: number, activo: boolean): Observable<HttpResponse<Espacio>> {
    return this.cliente.patch<Espacio>(`${this.URL_BASE}/espacios/${id}/estado`, { activo }, { observe: 'response' });
  }

  obtenerConjuntos(): Observable<Resultado<Conjunto[]>> {
    return this.pedirConjuntos().pipe(
      map((respuesta) => armarLista(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos cargar los conjuntos.'))),
    );
  }

  obtenerConjunto(id: number): Observable<Resultado<Conjunto>> {
    return this.pedirConjunto(id).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos cargar el conjunto.'))),
    );
  }

  crearConjunto(conjunto: Conjunto): Observable<Resultado<Conjunto>> {
    return this.enviarCrearConjunto(conjunto).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos guardar el conjunto.'))),
    );
  }

  editarConjunto(id: number, conjunto: Conjunto): Observable<Resultado<Conjunto>> {
    return this.enviarEditarConjunto(id, conjunto).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos guardar el conjunto.'))),
    );
  }

  cambiarEstadoConjunto(id: number, activo: boolean): Observable<Resultado<Conjunto>> {
    return this.enviarEstadoConjunto(id, activo).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) =>
        of(armarError(error, 'No pudimos cambiar el estado del conjunto.')),
      ),
    );
  }

  obtenerCoordenadas(direccion: string): Observable<Resultado<Coordenadas>> {
    return this.pedirDireccion(direccion).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) =>
        of(armarError(error, 'No encontramos esa dirección. Marca el punto haciendo clic en el mapa.')),
      ),
    );
  }

  validarUbicacion(latitud: number, longitud: number): Observable<Resultado<Coordenadas>> {
    return this.pedirUbicacionValida(latitud, longitud).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) =>
        of(armarError(error, 'No pudimos revisar ese punto. Intenta de nuevo.')),
      ),
    );
  }

  obtenerUnidades(conjuntoId: number): Observable<Resultado<Unidad[]>> {
    return this.pedirUnidades(conjuntoId).pipe(
      map((respuesta) => armarLista(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos cargar las unidades.'))),
    );
  }

  crearUnidad(conjuntoId: number, unidad: Unidad): Observable<Resultado<Unidad>> {
    return this.enviarCrearUnidad(conjuntoId, unidad).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos guardar la unidad.'))),
    );
  }

  editarUnidad(id: number, unidad: Unidad): Observable<Resultado<Unidad>> {
    return this.enviarEditarUnidad(id, unidad).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos guardar la unidad.'))),
    );
  }

  cambiarEstadoUnidad(id: number, activo: boolean): Observable<Resultado<Unidad>> {
    return this.enviarEstadoUnidad(id, activo).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) =>
        of(armarError(error, 'No pudimos cambiar el estado de la unidad.')),
      ),
    );
  }

  obtenerEspacios(conjuntoId: number): Observable<Resultado<Espacio[]>> {
    return this.pedirEspacios(conjuntoId).pipe(
      map((respuesta) => armarLista(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos cargar los espacios.'))),
    );
  }

  crearEspacio(conjuntoId: number, espacio: Espacio): Observable<Resultado<Espacio>> {
    return this.enviarCrearEspacio(conjuntoId, espacio).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos guardar el espacio.'))),
    );
  }

  editarEspacio(id: number, espacio: Espacio): Observable<Resultado<Espacio>> {
    return this.enviarEditarEspacio(id, espacio).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) => of(armarError(error, 'No pudimos guardar el espacio.'))),
    );
  }

  cambiarEstadoEspacio(id: number, activo: boolean): Observable<Resultado<Espacio>> {
    return this.enviarEstadoEspacio(id, activo).pipe(
      map((respuesta) => armarResultado(respuesta)),
      catchError((error: HttpErrorResponse) =>
        of(armarError(error, 'No pudimos cambiar el estado del espacio.')),
      ),
    );
  }
}
