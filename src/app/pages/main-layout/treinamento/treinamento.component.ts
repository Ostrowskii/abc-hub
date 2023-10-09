import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OverlayPanel } from 'primeng/overlaypanel';
import ModuloResponse, {
  Capitulos,
} from 'src/app/shared/_interfaces/modulo.interface';
import { AbcService } from 'src/app/shared/services/abc.service';
import { ModuloService } from 'src/app/shared/services/modulo.service';

@Component({
  selector: 'app-treinamento',
  templateUrl: './treinamento.component.html',
  styleUrls: ['./treinamento.component.scss'],
})
export class TreinamentoComponent {
  moduloData!: ModuloResponse['data'];
  selectedCapitulo!: Capitulos['data'][0];
  @ViewChild('opb1') opb1!: OverlayPanel;

  evenOrOdd(i: any) {
    if (i % 2 === 0) {
      return 2;
    } else {
      return 1;
    }
  }
  greenbuttons(i: any, x: any) {
    let n = this.evenOrOdd(i);
    let classe = '';
    if (n === 2) {
      classe = x;
    } else {
      classe = x + 5;
    }
    return classe;
  }

  constructor(
    private moduloService: ModuloService,
    private abcService: AbcService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.moduloService.loadModulosAPI().subscribe();
    this.moduloService.getModulos().subscribe({
      next: (res) => {
        console.log(res);
        if (res) {
          this.moduloData = res.data;
          console.log('moduloData');
          console.log(this.moduloData);
        }
      },
    });
  }

  openOverlay(event: MouseEvent, capitulo: Capitulos['data'][0]) {
    this.opb1.hide();
    setTimeout(() => {
      this.opb1.show(event);
    }, 200);
    console.log(capitulo);
    this.selectedCapitulo = capitulo;
  }

  comecar() {
    this.abcService.setSelectedCapitulo(this.selectedCapitulo);
    this.router.navigate(['/course']);
  }
}
