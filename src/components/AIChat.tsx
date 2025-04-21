
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils"; // Add this import to fix the error
import ChatMessage from "./ChatMessage";
import ChatInputBox from "./ChatInputBox";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Loader } from "lucide-react";

type ChatMsg = {
  id: number;
  sender: "user" | "ai";
  type: "text" | "file" | "system";
  content: React.ReactNode;
};

interface AIChatProps {
  className?: string;
}

const AIChat: React.FC<AIChatProps> = ({ className }) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: 1,
      sender: "ai",
      type: "text",
      content: (
        <>
          👋 欢迎！可直接上传学生材料或输入问题，我会自动解析信息并生成申请表。
        </>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lastFileName, setLastFileName] = useState<string | null>(null);

  // 新增：输入区内部文件状态
  const [chatFiles, setChatFiles] = useState<File[]>([]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  // 滚动到底部
  React.useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, uploading]);

  // 发送消息逻辑
  const sendMessage = async () => {
    if (input.trim() === "" && chatFiles.length === 0) return;

    const timestamp = Date.now();

    if (chatFiles.length > 0) {
      const file = chatFiles[0];
      setMessages((prev) => [
        ...prev,
        {
          id: timestamp,
          sender: "user",
          type: "file",
          content: (
            <>
              <div className="flex items-center gap-2">
                <img
                  src="/lovable-uploads/e59cb0e9-29eb-49d4-9673-c3a678939296.png"
                  alt="文件预览"
                  className="w-8 h-8 rounded border object-cover"
                />
                <span className="font-semibold">{file.name}</span>
                <span className="ml-2 text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</span>
              </div>
              {input && <div className="mt-1 text-sm text-gray-700">{input}</div>}
            </>
          ),
        },
      ]);
      setUploading(true);
      setProgress(0);
      setLastFileName(file.name);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: timestamp + 1,
            sender: "ai",
            type: "system",
            content: (
              <div>
                已收到您的文件：<b>{file.name}</b>
                <div className="flex items-center gap-2 mt-2">
                  <Progress value={progress} className="flex-1 bg-blue-200" />
                  <span className="text-xs text-blue-500">{progress}%</span>
                </div>
              </div>
            ),
          },
        ]);
      }, 500);

      try {
        const aiRespContent = await new Promise<string>((resolve) => {
          let percent = 0;
          const timer = setInterval(() => {
            percent += Math.floor(Math.random() * 20) + 10;
            if (percent > 100) percent = 100;
            setProgress(percent);
            if (percent === 100) {
              clearInterval(timer);
              setTimeout(() => {
                resolve(`已提取关键信息，例如：姓名 李小明，GPA 3.8。\n可继续完善/核验您的信息。`);
              }, 800);
            }
          }, 600);
        });
        setUploading(false);
        setProgress(100);
        setMessages((prev) => [
          ...prev,
          {
            id: timestamp + 2,
            sender: "ai",
            type: "text",
            content: (
              <>
                <div className="mb-1">
                  <b>{file.name}</b> 解析完成，已自动提取如下内容：
                </div>
                <div className="bg-blue-50 rounded p-3 whitespace-pre-wrap">{aiRespContent}</div>
                <div className="text-xs text-gray-400 mt-1">* 建议核实关键信息，如有误可手动修正</div>
              </>
            ),
          },
        ]);
      } catch {
        setUploading(false);
        setMessages((prev) => [
          ...prev,
          {
            id: timestamp + 3,
            sender: "ai",
            type: "system",
            content: (
              <span className="text-red-500">⚠️ 文件解析失败，请尝试重新上传其他格式</span>
            ),
          },
        ]);
      }
      setChatFiles([]);
      setInput("");
      setLastFileName(null);
      return;
    }

    // 纯文本消息
    setMessages((prev) => [
      ...prev,
      {
        id: timestamp,
        sender: "user",
        type: "text",
        content: input,
      },
      {
        id: timestamp + 1,
        sender: "ai",
        type: "text",
        content: <>🤖 {(() => {
          if (/成绩|GPA/.test(input)) {
            return "请上传您的成绩单PDF，我会帮您自动提取关键信息。";
          }
          if (/推荐信/.test(input)) {
            return "推荐信请上传扫描件或Word文档，我将自动结构化信息并提示缺失项。";
          }
          if (/你好|hi|hello/i.test(input)) {
            return "你好！我是你的智能申请助手，有任何问题随时问我~";
          }
          return "好的，我会尽力为你解答。也可以通过上传材料获得更智能的表单填写体验！";
        })()}</>,
      },
    ]);
    setInput("");
  };

  // 拖拽上传
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files && files.length > 0) {
      setChatFiles(files);
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className={cn("flex flex-col h-[600px] w-full rounded-xl shadow bg-white p-4", className)}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div ref={scrollRef} className="flex-1 w-full overflow-y-auto space-y-1 pr-2">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} sender={msg.sender} content={msg.content} />
        ))}
        {uploading && lastFileName && (
          <div className="flex items-center gap-2 text-blue-500 text-sm">
            <Loader className="animate-spin w-4 h-4" />
            正在解析 {lastFileName}...
            <Progress value={progress} className="h-1 bg-blue-200 ml-3 flex-1" />
          </div>
        )}
      </div>
      <div className="mt-2">
        <ChatInputBox
          files={chatFiles}
          onFilesChange={setChatFiles}
          input={input}
          onInputChange={setInput}
          onSend={sendMessage}
          disabled={uploading}
        />
      </div>
    </div>
  );
};

export default AIChat;

