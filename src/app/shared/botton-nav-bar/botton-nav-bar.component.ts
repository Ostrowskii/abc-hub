import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-botton-nav-bar',
  templateUrl: './botton-nav-bar.component.html',
  styleUrls: ['./botton-nav-bar.component.scss'],
})
export class BottonNavBarComponent {
  // Inicializa a variável para o botão clicado como null
  buttonIndex: number = 0;
  constructor(private router: Router) {}
  // Função para lidar com o clique em um botão
  handleButtonClick(index: number): void {
    // Define o índice do botão clicado
    this.buttonIndex = index;
    switch (index) {
      case 0:
        this.router.navigate(['/']);
        break;
      case 1:
        this.router.navigate(['/pesquisa']);
        break;
      case 2:
        this.router.navigate(['/ia']);
        break;
      case 3:
        this.router.navigate(['/social']);
        break;

      default:
        break;
    }
  }
}
