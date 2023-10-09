import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Capitulos } from 'src/app/shared/_interfaces/modulo.interface';
import { AbcService } from 'src/app/shared/services/abc.service';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.scss'],
})
export class CourseContentComponent {
  texto = {
    data: [
      {
        id: 1,
        attributes: {
          titulo: '1.1: O Que é o ABC+?',
          createdAt: '2023-10-01T16:24:41.258Z',
          updatedAt: '2023-10-01T19:50:13.698Z',
          publishedAt: '2023-10-01T19:50:13.695Z',
          conteudo:
            '<h2><strong>Definição do termo "ABC+" (Agricultura de Baixa Emissão de Carbono)</strong></h2><p>O termo "ABC+" se refere à Agricultura de Baixa Emissão de Carbono. É um conjunto de práticas agrícolas que busca fazer a agricultura de forma mais amigável ao meio ambiente, especialmente no que diz respeito à emissão de gases que causam o efeito estufa. Em outras palavras, o ABC+ é um jeito de cultivar a terra e criar animais de maneira sustentável, reduzindo ao máximo o impacto negativo no clima e no ambiente.</p><h2><strong>Contexto global e regional da importância do ABC+ na Amazônia Legal</strong></h2><p>A Amazônia Legal é um lugar muito especial, não apenas para o Brasil, mas para o mundo inteiro. É uma região que possui uma das maiores florestas tropicais do planeta, a Floresta Amazônica. Essa floresta é como os pulmões do nosso planeta, porque ajuda a limpar o ar ao absorver dióxido de carbono (CO2), um dos principais gases responsáveis pelo aquecimento global.</p><p>No entanto, a agricultura e outras atividades humanas têm causado problemas na região. O desmatamento, que é a derrubada de árvores para abrir espaço para a agricultura, por exemplo, libera CO2 na atmosfera e contribui para as mudanças climáticas. É aí que o ABC+ entra em cena.</p><p>O ABC+ é importante tanto globalmente quanto regionalmente na Amazônia Legal porque ajuda a:</p><p><strong>Proteger a Floresta Amazônica:</strong> Ao adotar práticas sustentáveis, os agricultores contribuem para a conservação da floresta, impedindo o desmatamento ilegal e a degradação ambiental.</p><p><strong>Reduzir as Mudanças Climáticas:</strong> As práticas do ABC+ reduzem a emissão de gases de efeito estufa, ajudando a combater o aquecimento global e seus efeitos prejudiciais.</p><p><strong>Preservar a Fertilidade do Solo:</strong> Ao cuidar bem do solo, os agricultores garantem que ele continue sendo produtivo no longo prazo, beneficiando as futuras gerações de agricultores.</p><p>Em resumo, o ABC+ é uma maneira inteligente e sustentável de fazer agricultura na Amazônia Legal, protegendo o ambiente e contribuindo para um mundo mais saudável e equilibrado. É como dar um passo na direção certa para cuidar do nosso lar, o planeta Terra.</p>',
          descricao:
            'Veremos do que se trata o plano ABC+ e o contexto global e regional da importância do ABC+ na Amazônia Legal.',
        },
      },
    ],
    meta: {
      pagination: {
        page: 1,
        pageSize: 25,
        pageCount: 1,
        total: 1,
      },
    },
  };

  capitulo!: Capitulos['data'][0];

  constructor(private abcService: AbcService, private router: Router) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.abcService.getSelectedCapitulo().subscribe({
      next: (res) => {
        this.capitulo = res;
      },
    });
  }

  voltar() {
    console.log('voltar');
    this.router.navigate(['/treinamento']);
  }
}
