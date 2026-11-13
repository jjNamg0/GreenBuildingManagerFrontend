import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Conjunto, textoTipoConjunto } from '../../models/conjuntomodel';
import { Errorservice } from '../../services/errorservice';
import { Conjuntoservice } from '../../services/conjuntoservice';

@Component({
  selector: 'app-adminconjuntodetallecomponent',
  standalone: false,
  styleUrl: './adminconjuntodetallecomponent.css',
  templateUrl: './adminconjuntodetallecomponent.html',
})
export class Adminconjuntodetallecomponent implements OnInit {
  readonly textoTipoConjunto = textoTipoConjunto;

  pestana = signal<'unidades' | 'espacios'>('unidades');
  conjunto = signal<Conjunto | null>(null);
  cargando = signal(true);
  error = signal('');

  constructor(
    private conjuntoService: Conjuntoservice,
    private errorService: Errorservice,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.conjuntoService.obtenerPorId(id).subscribe({
      next: (conjunto) => {
        this.conjunto.set(conjunto);
        this.cargando.set(false);
      },
      error: (error: unknown) => {
        this.cargando.set(false);
        this.error.set(this.errorService.obtenerMensaje(error, 'No encontramos este conjunto.'));
      },
    });
  }
}
