export default interface Register {
  username: string;
  email: string;
  password: string;
  nome: string;
}

export interface RegisterResponse {
  jwt: string;
  user: any;
}
