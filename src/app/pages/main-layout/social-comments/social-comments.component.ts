import { Component } from '@angular/core';
import { Router } from '@angular/router';
import ComentarioChat, {
  ComentarioReq,
} from 'src/app/shared/_interfaces/comentario.interface';
import MessageChat from 'src/app/shared/_interfaces/messsagechat.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChatService } from 'src/app/shared/services/chat.service';

@Component({
  selector: 'app-social-comments',
  templateUrl: './social-comments.component.html',
  styleUrls: ['./social-comments.component.scss'],
})
export class SocialCommentsComponent {
  mensagem: string = '';
  historicoComentarios: ComentarioChat[] = [];
  userInfo: any;
  msg = '';
  isMessage = false;
  selectedMensagem!: MessageChat;
  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedMensagem = this.chatService.selectedMensagem;

    if (!this.selectedMensagem) {
      this.router.navigate(['/social']);
      return;
    }
    console.log('Mensagem no comentarios');
    console.log(this.selectedMensagem);
    this.authService.getUserInfo().subscribe({
      next: (res) => {
        this.userInfo = res;
      },
    });
    this.chatService.getChatHistory().subscribe({
      next: (res) => {
        const selectedMessage: MessageChat = res.find(
          (item) => item.id === this.selectedMensagem.id
        ) as MessageChat;
        console.log(selectedMessage);
        this.historicoComentarios = selectedMessage.comentarios;
      },
    });
  }

  enviarMensagem() {
    console.log('entrou aqui enviarMensagem');
    if (this.mensagem.trim() !== '') {
      //this.historicoMensagens.push(this.mensagem);
      const msgReq: ComentarioReq = {
        data: {
          nome: this.userInfo.nome
            ? this.userInfo.nome
            : this.userInfo.username,
          user: this.userInfo.id,
          conteudo: this.mensagem,
          data_envio: new Date(),
          username: this.userInfo.username,
          mensagem: this.selectedMensagem.id,
        },
      };
      this.chatService.postComentarioAPI(msgReq).subscribe({
        next: (res) => {
          console.log('comentario enviado: ', res);
        },
        error: (err) => {
          console.log('ERRO AO ENVIAR COMENTARIO: ', err);
        },
      });
      this.mensagem = '';
    }
  }

  formataData(date: Date | string) {
    return new Date(date);
  }
}
