import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, first, map, tap } from 'rxjs';
import { io } from 'socket.io-client';
import { API_URL, SERVER_URL } from 'variables';
import MessageChat, {
  MessageReq,
  MessageResGet,
  MessageResPost,
} from '../_interfaces/messsagechat.interface';
import { HttpClient } from '@angular/common/http';
import ComentarioChat, {
  ComentarioReq,
} from '../_interfaces/comentario.interface';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  rota = '/mensagens';

  chatHistorySub = new ReplaySubject<MessageChat[]>(1);
  chatHistory$ = this.chatHistorySub.asObservable();
  selectedMensagem!: MessageChat;

  constructor(private http: HttpClient) {}

  startSocket() {
    const token_jwt = localStorage.getItem('token_jwt');
    const socket = io(SERVER_URL, {
      auth: {
        token: token_jwt,
      },
    });
    //  wait until socket connects before adding event listeners
    console.log('conectando');
    socket.on('connect', () => {
      console.log('conectado');
      socket.on('mensagem:create', (data) => {
        console.log('mensagem:create');
        console.log(data);
        this.loadMessagesAPI().subscribe();
      });
      socket.on('comentario:create', (data) => {
        console.log('comentario:create');
        console.log(data);
        this.loadMessagesAPI().subscribe();
      });
    });
  }

  getChatHistory() {
    return this.chatHistory$;
  }

  postMessageAPI(data: MessageReq) {
    const msg: MessageChat = {
      id: 0,
      comentarios: [],
      content: data.data.conteudo,
      dataEnvio: data.data.data_envio,
      nome: data.data.nome,
      username: data.data.username,
    };
    this.addMessage(msg);
    return this.http.post(
      API_URL + this.rota,
      data
    ) as Observable<MessageResPost>;
  }

  addMessage(data: MessageChat) {
    this.chatHistory$.pipe(first()).subscribe({
      next: (res) => {
        res.push(data);
        this.updateChatStore(res);
      },
    });
  }

  postComentarioAPI(data: ComentarioReq) {
    const msg: ComentarioChat = {
      id: 0,
      content: data.data.conteudo,
      dataEnvio: data.data.data_envio,
      nome: data.data.nome,
      username: data.data.username,
    };
    this.addComentario(msg, data.data.mensagem);
    return this.http.post(API_URL + '/comentarios', data) as Observable<any>;
  }

  addComentario(data: ComentarioChat, idMensagem: number) {
    this.chatHistory$.pipe(first()).subscribe({
      next: (res) => {
        const mensagem: MessageChat = res.find(
          (item) => item.id === this.selectedMensagem.id
        ) as MessageChat;
        mensagem.comentarios.push(data);
        //res.push(data);
        this.updateChatStore(res);
      },
    });
  }
  //as Observable<MessageResGet>;
  loadMessagesAPI() {
    const chatMemory = window.localStorage.getItem('chat');
    if (chatMemory) this.chatHistorySub.next(JSON.parse(chatMemory));
    return this.http
      .get<MessageResGet>(`${API_URL + this.rota}?populate=%2A`)
      .pipe(
        map((res) => {
          const chatHistory: MessageChat[] = res.data.map((res) => {
            return {
              id: res.id,
              nome: res.attributes.nome,
              username: res.attributes.username,
              content: res.attributes.conteudo,
              dataEnvio: res.attributes.data_envio,
              comentarios: !res.attributes.comentarios
                ? []
                : res.attributes.comentarios.data.map((comment) => {
                    const com: ComentarioChat = {
                      id: comment.id,
                      content: comment.attributes.conteudo,
                      dataEnvio: comment.attributes.data_envio,
                      nome: comment.attributes.nome,
                      username: comment.attributes.username,
                    };
                    return com;
                  }),
            } as MessageChat;
          });
          return chatHistory;
        }),
        tap((data) => {
          this.updateChatStore(data);
        })
      );
  }

  updateChatStore(data: MessageChat[]) {
    localStorage.setItem('chat', JSON.stringify(data));
    this.chatHistorySub.next(data);
  }
}
