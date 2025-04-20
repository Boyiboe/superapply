
import { cn } from "@/lib/utils";
import React from "react";

interface ChatSectionProps {
  title: string;
  content: React.ReactNode;
  delay: number;
}

const ChatSection = ({ title, content, delay }: ChatSectionProps) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={cn(
        "mb-6 transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <h3 className="text-lg font-semibold text-purple-700 mb-2">{title}</h3>
      <div className="bg-white rounded-lg p-4 shadow-sm">{content}</div>
    </div>
  );
};

export default ChatSection;
