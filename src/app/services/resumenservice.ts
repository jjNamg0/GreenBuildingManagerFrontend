import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResumenAdmin } from '../models/resumenmodel';

@Injectable({
  providedIn: 'root',
})
export class Resumenservice {
  private cliente: HttpClient = inject(HttpClient);
  private readonly URL_BASE: string = `${environment.urlApi}/resumen`;

  obtenerResumenAdmin(): Observable<ResumenAdmin> {
    return this.cliente.get<ResumenAdmin>(`${this.URL_BASE}/getadmin`);
  }
}
