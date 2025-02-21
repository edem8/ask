interface MessageProps {
  sender: "user" | "ai";
  text: string;
}

export function Message({ sender, text }: MessageProps) {
  return (
    <div
      className={`flex ${sender === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`p-3 max-w-xs rounded-lg text-sm ${
          sender === "user"
            ? "bg-gray-600 text-white rounded-tr-none"
            : "bg-gray-200 text-black rounded-tl-none"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
