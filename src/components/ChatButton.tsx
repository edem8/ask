"use client";

import { useState } from "react";
import { ChatDialog } from "./ChatDialog";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ChatButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        className="fixed bottom-20 right-20 rounded-full p-6 shadow-lg"
        onClick={() => setOpen(true)}
      >
        <MessageSquare size={64} />
      </Button>
      {open && <ChatDialog onClose={() => setOpen(false)} />}
    </>
  );
}
