import ComentarioChat from './comentario.interface';

export default interface MessageChat {
  id: number;
  nome: string;
  username: string;
  content: string;
  dataEnvio: Date | string;
  comentarios: ComentarioChat[];
}

export interface MessageReq {
  data: {
    nome: string;
    conteudo: string;
    data_envio: string | Date;
    user: number;
    username: string;
  };
}

export interface MessageResPost {
  data: {
    id: number;
    attributes: {
      nome: string;
      conteudo: string;
      data_envio: string | Date;
      createdAt?: string;
      updatedAt?: string;
      username: string;
    };
  };
  meta: {};
}

export interface MessageResGet {
  data: Array<{
    id: number;
    attributes: {
      nome: string;
      conteudo: string;
      data_envio: string;
      createdAt: string;
      updatedAt: string;
      username?: string;
      comentarios: {
        data: Array<{
          id: number;
          attributes: {
            nome: string;
            conteudo: string;
            data_envio: string;
            createdAt: string;
            updatedAt: string;
            username: string;
          };
        }>;
      };
    };
  }>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
