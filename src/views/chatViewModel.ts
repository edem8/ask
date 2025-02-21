"use client";

import { useState } from "react";
import { ChatMessage } from "@/types/chat";
import { sendMessage } from "@/utils/geminiClient";

export function useChatViewModel() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const sendUserMessage = async (text: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);

    const response = await sendMessage(text);

    if (response) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "ai",
          text: response,
          timestamp: Date.now(),
        },
      ]);
    }
  };

  return { messages, sendUserMessage };
}
