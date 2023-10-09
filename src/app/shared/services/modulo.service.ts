import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, last, tap } from 'rxjs';
import { API_URL } from 'variables';
import ModuloResponse from '../_interfaces/modulo.interface';

@Injectable({
  providedIn: 'root',
})
export class ModuloService {
  rota = '/modulos';

  moduloDataSub = new ReplaySubject<ModuloResponse>(1);
  moduloData$ = this.moduloDataSub.asObservable();

  constructor(private http: HttpClient) {}

  loadModulosAPI() {
    const moduloMemory = window.localStorage.getItem('modulo');
    if (moduloMemory) this.moduloDataSub.next(JSON.parse(moduloMemory));
    return this.http.get(`${API_URL + this.rota}?populate=%2A`).pipe(
      tap((data: any) => {
        console.log('tap', data);
        this.updateModuloStore(data);
      })
    ) as Observable<ModuloResponse>;
  }

  getModulos() {
    return this.moduloData$;
  }

  updateModuloStore(data: ModuloResponse) {
    localStorage.setItem('modulo', JSON.stringify(data));
    this.moduloDataSub.next(data);
  }
}
