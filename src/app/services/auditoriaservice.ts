import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FiltrosAuditoria, RegistroAuditoria } from '../models/auditoriamodel';
import { Pagina } from '../models/paginamodel';

@Injectable({
  providedIn: 'root',
})
export class Auditoriaservice {
  private cliente: HttpClient = inject(HttpClient);
  private readonly URL_BASE: string = `${environment.urlApi}/auditoria`;

  obtenerRegistros(filtros: FiltrosAuditoria): Observable<Pagina<RegistroAuditoria>> {
    return this.cliente.get<Pagina<RegistroAuditoria>>(`${this.URL_BASE}/getall`, {
      params: {
        usuario: filtros.usuario,
        accion: filtros.accion,
        desde: filtros.desde,
        hasta: filtros.hasta,
        pagina: filtros.pagina,
        tamano: filtros.tamano,
      },
    });
  }
}
