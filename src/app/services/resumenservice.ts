import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResumenAdmin } from '../models/resumenmodel';

/** Service del resumen del panel de administración. */
@Injectable({
  providedIn: 'root',
})
export class Resumenservice {
  private cliente: HttpClient = inject(HttpClient);
  private readonly URL_BASE: string = `${environment.urlApi}/resumen`;

  /** Pide los totales del panel de administración. */
  obtenerResumenAdmin(): Observable<ResumenAdmin> {
    return this.cliente.get<ResumenAdmin>(`${this.URL_BASE}/getadmin`);
  }
}
