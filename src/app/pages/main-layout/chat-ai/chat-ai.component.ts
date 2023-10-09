import { Component } from '@angular/core';
import AiRequest from 'src/app/shared/_interfaces/airequest.interface';
import MessageChatAi from 'src/app/shared/_interfaces/messagechatai.interface';
import { AiApiService } from 'src/app/shared/services/ai-api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'app-chat-ai',
  templateUrl: './chat-ai.component.html',
  styleUrls: ['./chat-ai.component.scss'],
})
export class ChatAiComponent {
  mensagem: string = ''; //??
  historicoMensagens: MessageChatAi[] = [];

  msg = '';
  isMessage = false;
  userInfo: any;
  constructor(
    private searchService: SearchService,
    private authService: AuthService,
    private aiApiService: AiApiService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.authService.getUserInfo().subscribe({
      next: (res) => {
        this.userInfo = res;
        console.log('userinfo - ai');
        console.log(res);
      },
    });
  }

  enviarMensagem() {
    if (this.mensagem.trim() !== '') {
      const msg = this.mensagem;
      //this.historicoMensagens.push(this.mensagem);
      this.enviarMinhaMensagem(msg);
      this.responder(msg);
      this.mensagem = '';
    }
  }

  enviarMinhaMensagem(msg: string) {
    const message: MessageChatAi = {
      id: this.generateUUID(),
      content: msg,
      dataEnvio: new Date(),
      isSearchMessage: false,
      me: true,
      nome: this.userInfo.nome ? this.userInfo.nome : this.userInfo.username,
    };
    this.historicoMensagens.push(message);
    setTimeout(() => {
      const posicaoAtual = window.scrollY || window.pageYOffset;
      window.scrollTo(0, posicaoAtual + 120);
    }, 100);
  }

  pesquisar(query: string) {
    return this.searchService.search(query);
  }

  responder(msg: string) {
    /// comunicacao com ai
    const req: AiRequest = {
      question: msg,
      overrideConfig: {
        sessionId: this.userInfo.username,
      },
    };
    this.aiApiService.send(req).subscribe({
      next: (res: string) => {
        console.log('RESPOSTA DA INTELIGENCIA ARTIFICIAL');
        console.log(res);
        const message: MessageChatAi = {
          id: this.generateUUID(),
          content: res,
          dataEnvio: new Date(),
          isSearchMessage: false,
          me: false,
          nome: 'ABC+ IA',
        };
        this.historicoMensagens.push(message);
        setTimeout(() => {
          const posicaoAtual = window.scrollY || window.pageYOffset;
          window.scrollTo(0, posicaoAtual + 120);
        }, 100);
      },
      error: (err) => {
        console.log(err);
        this.responderComPesquisa(msg);
      },
    });
  }

  responderComPesquisa(msg: string) {
    const result = this.pesquisar(msg);
    console.log('pesquisando');
    console.log(result);
    const resultSliced = result.slice(0, 5);
    const resultMapped = resultSliced.map((item) => ({
      title: item.doc.title,
      content: item.doc.description,
      id: item.doc.id,
    }));
    console.log('cardData');
    console.log(resultMapped);

    const message: MessageChatAi = {
      id: this.generateUUID(),
      content: '',
      dataEnvio: new Date(),
      isSearchMessage: true,
      me: false,
      nome: 'ABC+ IA',
      results: resultMapped,
    };

    setTimeout(() => {
      this.historicoMensagens.push(message);
      setTimeout(() => {
        const posicaoAtual = window.scrollY || window.pageYOffset;
        window.scrollTo(0, posicaoAtual + 120);
      }, 100);
    }, 1500);
  }

  generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
