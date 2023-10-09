export default interface ModuloResponse {
  data: Daum[];
  meta: Meta;
}

export interface Daum {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  titulo: string;
  descricao: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  capitulos: Capitulos;
}

export interface Capitulos {
  data: Daum2[];
}

export interface Daum2 {
  id: number;
  attributes: Attributes2;
}

export interface Attributes2 {
  titulo: string;
  conteudo: string;
  descricao: string;
  numero: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
