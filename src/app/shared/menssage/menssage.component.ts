import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../services/chat.service';
import MessageChat from '../_interfaces/messsagechat.interface';

@Component({
  selector: 'app-menssage',
  templateUrl: './menssage.component.html',
  styleUrls: ['./menssage.component.scss'],
})
export class MenssageComponent {
  constructor(private router: Router, private chatService: ChatService) {}
  @Input() content: string = '';
  @Input() classe: string = '';
  @Input() menssage: boolean = false;
  @Input() nome: string = '';
  @Input() dataMensagem: Date = new Date();
  @Input() mensagem!: MessageChat;
  @Input() qtdComentario: number = 0;

  dataFormatada: string = '';

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.dataFormatada = this.formatarData(this.dataMensagem);
  }

  commentsPage() {
    this.chatService.selectedMensagem = this.mensagem;
    this.router.navigate(['/social-comments']);
  }

  formatarData(data: Date): string {
    const hora = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Adicione 1 porque os meses começam em 0
    const ano = data.getFullYear();

    return `${hora}:${minutos} ${dia}/${mes}/${ano}`;
  }
}
