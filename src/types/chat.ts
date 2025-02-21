export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: number;
}

export interface ChatResponse {
  messages: ChatMessage[];
}
