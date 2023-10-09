import { Injectable } from '@angular/core';
import { ModuloService } from './modulo.service';
import { Capitulos } from '../_interfaces/modulo.interface';
import { ReplaySubject } from 'rxjs';
declare var elasticlunr: any;

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  capitulos: Capitulos['data'] = [];
  resultSub = new ReplaySubject<any[]>(1);
  result$ = this.resultSub.asObservable();

  index = elasticlunr(function (this: any) {
    this.addField('title');
    this.addField('body');
    this.addField('description');
    this.setRef('id');
  });

  constructor(private moduloService: ModuloService) {}

  loadContent() {
    this.moduloService.loadModulosAPI().subscribe();
    this.moduloService.getModulos().subscribe({
      next: (res) => {
        this.capitulos = [];
        res.data.forEach((modulo) => {
          modulo.attributes.capitulos.data.forEach((capitulo) => {
            this.capitulos.push(capitulo);
          });
        });
        const searchCapitulos = this.getSearchCapitulos();
        searchCapitulos.forEach((doc) => {
          this.index.addDoc(doc);
        });
      },
    });
  }

  getSearchCapitulos() {
    return this.capitulos.map((item) => ({
      id: item.id,
      title: item.attributes.titulo,
      body: item.attributes.conteudo,
      description: item.attributes.descricao,
    }));
  }

  search(query: string): any[] {
    if (this.index) {
      const results = this.index.search(query, {
        fields: {
          title: { boost: 2 },
          description: { boost: 2 },
          body: { boost: 1 },
        },
        bool: 'OR',
        expand: true,
      });
      this.resultSub.next(results);
      return results;
    }
    return []; // En caso de que el índice no esté inicializado o la búsqueda no devuelva resultados
    this.resultSub.next([]);
  }

  getResult() {
    return this.result$;
  }
}
