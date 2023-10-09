export default interface AiRequest {
  question: string;
  overrideConfig: {
    sessionId: string;
  };
}
