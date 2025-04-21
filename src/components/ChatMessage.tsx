
import React from "react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  sender: "user" | "ai";
  content: React.ReactNode;
}
const ChatMessage: React.FC<ChatMessageProps> = ({ sender, content }) => (
  <div className={cn(
    "flex mb-2 items-end",
    sender === "user" ? "justify-end" : "justify-start"
  )}>
    {sender === "ai" && (
      <div className="flex items-end gap-1">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
          小艾
        </div>
        <div className="p-3 rounded-2xl bg-blue-100 text-blue-900 max-w-[70vw] text-left shadow whitespace-pre-wrap">
          {content}
        </div>
      </div>
    )}
    {sender === "user" && (
      <div className="flex items-end gap-1">
        <div className="p-3 rounded-2xl bg-blue-600 text-white max-w-[70vw] text-right shadow whitespace-pre-wrap">
          {content}
        </div>
        <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-900 font-bold text-lg">
          我
        </div>
      </div>
    )}
  </div>
);
export default ChatMessage;
