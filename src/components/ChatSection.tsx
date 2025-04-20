
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import React from "react";

interface ChatSectionProps {
  title: string;
  content: React.ReactNode;
  delay: number;
  icon?: "loader" | "avatar";
}

const ChatSection = ({ title, content, delay, icon = "loader" }: ChatSectionProps) => {
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
      <div className="flex items-center gap-2 mb-2">
        {icon === "loader" ? (
          <Loader className="w-5 h-5 text-purple-700 animate-spin" />
        ) : (
          <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
            <span className="text-white text-xs">AI</span>
          </div>
        )}
        <h3 className="text-lg font-semibold text-purple-700">{title}</h3>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-sm">{content}</div>
    </div>
  );
};

export default ChatSection;

