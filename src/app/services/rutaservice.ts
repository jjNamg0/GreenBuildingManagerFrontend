import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ConsultaRuta, Ruta } from '../models/rutamodel';

@Injectable({
  providedIn: 'root',
})
export class Rutaservice {
  private cliente: HttpClient = inject(HttpClient);
  private readonly URL_BASE: string = `${environment.urlApi}/ruta`;

  calcular(consulta: ConsultaRuta): Observable<Ruta> {
    return this.cliente.get<Ruta>(`${this.URL_BASE}/calcular`, {
      params: {
        origenLatitud: consulta.origenLatitud,
        origenLongitud: consulta.origenLongitud,
        destinoLatitud: consulta.destinoLatitud,
        destinoLongitud: consulta.destinoLongitud,
        modo: consulta.modo,
      },
    });
  }
}
