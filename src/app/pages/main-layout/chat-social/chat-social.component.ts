import { Component } from '@angular/core';
import MessageChat, {
  MessageReq,
} from 'src/app/shared/_interfaces/messsagechat.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChatService } from 'src/app/shared/services/chat.service';

@Component({
  selector: 'app-chat-social',
  templateUrl: './chat-social.component.html',
  styleUrls: ['./chat-social.component.scss'],
})
export class ChatSocialComponent {
  mensagem: string = '';
  historicoMensagens: MessageChat[] = [];
  userInfo: any;
  msg = '';
  isMessage = true;
  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe({
      next: (res) => {
        this.userInfo = res;
      },
    });
    this.chatService.getChatHistory().subscribe({
      next: (res) => {
        this.historicoMensagens = res;
      },
    });
  }

  enviarMensagem() {
    console.log('entrou aqui enviarMensagem');
    if (this.mensagem.trim() !== '') {
      //this.historicoMensagens.push(this.mensagem);
      const msgReq: MessageReq = {
        data: {
          nome: this.userInfo.nome
            ? this.userInfo.nome
            : this.userInfo.username,
          user: this.userInfo.id,
          conteudo: this.mensagem,
          data_envio: new Date(),
          username: this.userInfo.username,
        },
      };
      this.chatService.postMessageAPI(msgReq).subscribe({
        next: (res) => {
          console.log('mensagem enviada: ', res);
        },
        error: (err) => {
          console.log('ERRO AO ENVIAR MENSAGEM: ', err);
        },
      });
      this.mensagem = '';
    }
  }

  formataData(date: Date | string) {
    return new Date(date);
  }
}
