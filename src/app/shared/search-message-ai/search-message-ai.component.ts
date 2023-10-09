import { Component, Input } from '@angular/core';
import { ModuloService } from '../services/modulo.service';
import { Capitulos } from '../_interfaces/modulo.interface';
import { first } from 'rxjs';
import { AbcService } from '../services/abc.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-message-ai',
  templateUrl: './search-message-ai.component.html',
  styleUrls: ['./search-message-ai.component.scss'],
})
export class SearchMessageAiComponent {
  @Input() cardsData: any = [];
  @Input() nome: string = '';
  @Input() dataEnvio: Date = new Date();
  dataFormatada: string = '';

  constructor(
    private moduloService: ModuloService,
    private abcService: AbcService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.dataFormatada = this.formatarData(this.dataEnvio);
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

  formatarData(data: Date): string {
    const hora = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Adicione 1 porque os meses começam em 0
    const ano = data.getFullYear();

    return `${hora}:${minutos} ${dia}/${mes}/${ano}`;
  }

  goToPesquisa() {
    this.router.navigate(['/pesquisa']);
  }
}
