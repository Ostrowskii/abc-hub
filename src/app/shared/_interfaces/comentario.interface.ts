export default interface ComentarioChat {
  id: number;
  nome: string;
  username: string;
  content: string;
  dataEnvio: Date | string;
}

export interface ComentarioReq {
  data: {
    nome: string;
    conteudo: string;
    data_envio: Date | string;
    user: number;
    username: string;
    mensagem: number;
  };
}

export interface ComentarioRes {
  data: {
    id: number;
    attributes: {
      nome: string;
      conteudo: string;
      data_envio: string;
      createdAt: string;
      updatedAt: string;
      username: string;
    };
  };
  meta: {};
}
