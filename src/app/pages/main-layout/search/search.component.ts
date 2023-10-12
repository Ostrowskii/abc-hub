import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchService } from 'src/app/shared/services/search.service';
//import * as elasticlunr from 'elasticlunr';
declare var elasticlunr: any;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  results: any[] = [];
  index = elasticlunr(function (this: any) {
    this.addField('title');
    this.addField('body');
    this.setRef('id');
  });

  form: FormGroup = this.fb.group({
    search: [''],
  });
  //mensagem caso não tenha pesquisa
  msgInicial = 'Tente pesquisar em nossa ferramenta de pesquisa offline';
  msgAppear = true;
  constructor(private fb: FormBuilder, private searchService: SearchService) {}

  ngOnInit() {
    //this.searchService.loadContent();
    /*const documents = [
      { id: 1, title: 'Título Vanessa 1', body: 'Cuerpo del documento 1' },
      { id: 2, title: 'Título 2', body: 'Cuerpo Miguel del documento 2' },
    ];*/
    // Agregar os documentos ao índice
    /*documents.forEach((doc) => {
      this.index.addDoc(doc);
    });*/
  }
  noResoultFound() {
    this.searchService.getResult().subscribe({
      next: (res) => {
        if (res.length == 0) {
          this.msgInicial = 'Sem resultados para essa pesquisa';
          this.msgAppear = true;
        } else {
          this.msgAppear = false;
        }
      },
    });
  }

  pesquisar() {
    const results = this.searchService.search(this.form.value.search);
    console.log(results);
    this.noResoultFound();
  }
}
