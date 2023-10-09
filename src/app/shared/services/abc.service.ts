import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Capitulos } from '../_interfaces/modulo.interface';

@Injectable({
  providedIn: 'root',
})
export class AbcService {
  selectedCapituloSub = new ReplaySubject<Capitulos['data'][0]>(1);
  selectedCapitulo$ = this.selectedCapituloSub.asObservable();

  constructor() {}

  setSelectedCapitulo(capitulo: Capitulos['data'][0]) {
    this.selectedCapituloSub.next(capitulo);
  }
  getSelectedCapitulo() {
    return this.selectedCapitulo$;
  }
}
