
import React, { useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import { FileUp, Loader, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

type ChatMsg = {
  id: number;
  sender: "user" | "ai";
  type: "text" | "file" | "system";
  content: React.ReactNode;
};

interface AIChatProps {
  className?: string;
}

const parseFileAsync = (file: File, onProgress: (percent: number) => void): Promise<string> => {
  // 模拟解析过程
  return new Promise((resolve) => {
    let percent = 0;
    const timer = setInterval(() => {
      percent += Math.floor(Math.random() * 20) + 10;
      if (percent > 100) percent = 100;
      onProgress(percent);
      if (percent === 100) {
        clearInterval(timer);
        setTimeout(() => {
          resolve(`已提取关键信息，例如：姓名 李小明，GPA 3.8。\n可继续完善/核验您的信息。`);
        }, 800);
      }
    }, 600);
  });
};

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  // 滚动到底部
  React.useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, uploading]);

  // 发送消息（支持文本或文件）
  const sendMessage = async (text: string, file?: File) => {
    if (!text && !file) return;

    const timestamp = Date.now();
    if (file) {
      // 显示用户file上传气泡
      setMessages((prev) => [
        ...prev,
        {
          id: timestamp,
          sender: "user",
          type: "file",
          content: (
            <>
              <div className="flex items-center gap-2">
                <FileUp className="w-4 h-4" />
                <span>{file.name}</span>
              </div>
            </>
          ),
        },
      ]);
      setUploading(true);
      setProgress(0);
      setLastFileName(file.name);

      // AI：收到文件，开始解析
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

      // 开始模拟解析
      try {
        const aiRespContent = await parseFileAsync(file, setProgress);
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
      setLastFileName(null);
      return;
    }
    // 发送文本消息
    setMessages((prev) => [
      ...prev,
      {
        id: timestamp,
        sender: "user",
        type: "text",
        content: text,
      },
      {
        id: timestamp + 1,
        sender: "ai",
        type: "text",
        content: <>🤖 {getAIResponse(text)}</>,
      },
    ]);
    setInput("");
  };

  // 简易AI对话
  function getAIResponse(question: string): string {
    if (/成绩|GPA/.test(question)) {
      return "请上传您的成绩单PDF，我会帮您自动提取关键信息。";
    }
    if (/推荐信/.test(question)) {
      return "推荐信请上传扫描件或Word文档，我将自动结构化信息并提示缺失项。";
    }
    if (/你好|hi|hello/i.test(question)) {
      return "你好！我是你的智能申请助手，有任何问题随时问我~";
    }
    return "好的，我会尽力为你解答。也可以通过上传材料获得更智能的表单填写体验！";
  }

  // 输入文件
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      sendMessage("", files[0]);
    }
    e.target.value = "";
  };

  // 聊天输入按回车发送
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage(input.trim());
    }
  };

  // 拖拽上传
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files && files.length > 0) {
      sendMessage("", files[0]);
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className="h-[600px] w-full flex flex-col border border-blue-100 rounded-xl shadow bg-white"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* Top: 聊天消息流 */}
      <div ref={scrollRef} className="flex-1 w-full overflow-y-auto px-4 py-4 space-y-1">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} sender={msg.sender} content={msg.content} />
        ))}
        {uploading && lastFileName && (
          <div className="flex items-center gap-2 text-blue-500 text-sm mb-2">
            <Loader className="animate-spin w-4 h-4" />
            文件 <span className="mx-1 font-semibold">{lastFileName}</span> 正在解析中...
            <Progress value={progress} className="h-1 bg-blue-200 ml-3 flex-1" />
          </div>
        )}
      </div>
      {/* Bottom: 输入栏 */}
      <div className="flex items-center gap-2 border-t p-3">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="输入你的问题或上传学生材料"
          className="flex-1 px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={uploading}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200"
          aria-label="上传文件"
          disabled={uploading}
        >
          <FileUp className="w-5 h-5" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={handleFileInput}
          disabled={uploading}
        />
        <button
          onClick={() => sendMessage(input.trim())}
          className="p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition disabled:bg-blue-200"
          disabled={!input.trim() || uploading}
        >
          发送
        </button>
      </div>
    </div>
  );
};

export default AIChat;
