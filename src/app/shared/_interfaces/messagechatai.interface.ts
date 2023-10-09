export default interface MessageChatAi {
  id: string;
  nome: string;
  me: boolean;
  isSearchMessage: boolean;
  content: string;
  results?: any[];
  dataEnvio: Date;
}
