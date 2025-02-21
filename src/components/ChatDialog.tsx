"use client";

import { useState, useEffect, useRef } from "react";
import { useChatViewModel } from "@/views/chatViewModel";
import { Message } from "./Message";
import { Button } from "@/components/ui/button";
import { CircleX, SendHorizonal } from "lucide-react";
import { ChatMessage } from "@/types/chat";
import { Textarea } from "./ui/textarea";

interface ChatDialogProps {
  onClose: () => void;
}

export function ChatDialog({ onClose }: ChatDialogProps) {
  const { messages, sendUserMessage } = useChatViewModel();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      sendUserMessage(input);
      setInput("");
    }
  };

  return (
    <div className="fixed bottom-16 right-5 w-80 bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center p-1 shadow-md from-gray-200/50 to-transparent border-b">
        <h2 className="font-bold tracking-wide text-base text-gray-700">Ask</h2>
        <button onClick={onClose} className="text-gray-700">
          <CircleX size={22} />
        </button>
      </div>

      <div className="relative h-60 overflow-y-auto scrollbar-hidden space-y-2   ">
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-gray-200/50 to-transparent pointer-events-none z-10"></div>

        {messages.map((msg: ChatMessage) => (
          <Message key={msg.id} sender={msg.sender} text={msg.text} />
        ))}

        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-start justify-between mt-2 gap-1">
        <Textarea
          value={input}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setInput(e.target.value)
          }
          placeholder="Type a message..."
        />
        <Button onClick={handleSend} variant={"default"}>
          <SendHorizonal size={20} />
        </Button>
      </div>
    </div>
  );
}
