import { Component, Input } from '@angular/core';
import { SearchService } from '../services/search.service';
import { AbcService } from '../services/abc.service';
import { ModuloService } from '../services/modulo.service';
import { first, last, lastValueFrom } from 'rxjs';
import { Capitulos } from '../_interfaces/modulo.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-message',
  templateUrl: './search-message.component.html',
  styleUrls: ['./search-message.component.scss'],
})
export class SearchMessageComponent {
  @Input() content: string = '';
  @Input() classe: string = '';
  @Input() limitSearch: boolean = false;
  @Input() menssage: boolean = false;
  @Input() seeMore: boolean = true;
  cardsData: { id: number; title: string; content: string }[] = [];

  constructor(
    private searchService: SearchService,
    private abcService: AbcService,
    private moduloService: ModuloService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchService.getResult().subscribe({
      next: (res) => {
        console.log('res search');
        console.log(res);
        this.cardsData = [];
        if (this.limitSearch) {
          this.cardsData = [];
          for (let i = 0; i < res.length; i++) {
            const item = res[i];
            if (i < 3) {
              this.cardsData.push({
                id: item.doc.id,
                content: item.doc.description,
                title: item.doc.title,
              });
            }
          }
        } else {
          this.cardsData = res.map((item) => ({
            id: item.doc.id,
            content: item.doc.description,
            title: item.doc.title,
          }));
        }
      },
    });
  }

  async ler(id: number) {
    this.moduloService
      .getModulos()
      .pipe(first())
      .subscribe({
        next: (res) => {
          let capitulos: Capitulos['data'] = [];
          for (const item of res.data) {
            item.attributes.capitulos.data.map((item) => {
              capitulos.push(item);
            });
          }
          const selectedCapitulo = capitulos.find(
            (item) => item.id === id
          ) as Capitulos['data'][0];
          this.abcService.setSelectedCapitulo(selectedCapitulo);
          this.router.navigate(['/course']);
        },
      });
  }
}
