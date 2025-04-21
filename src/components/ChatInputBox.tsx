
import React, { useRef } from "react";
import { paperclip, box, arrow-up } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputBoxProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  input: string;
  onInputChange: (input: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

const getFileIcon = (type: string) => {
  // 用lucide-react icon（仅允许：paperclip, box, arrow-up）
  if (type.includes("pdf")) return (
    <span className="bg-red-500 text-white px-2 py-1 rounded mr-2 text-xs">PDF</span>
  );
  return <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded mr-2 text-xs">文件</span>;
};

const ChatInputBox: React.FC<ChatInputBoxProps> = ({
  files,
  onFilesChange,
  input,
  onInputChange,
  onSend,
  disabled
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileRemove = (file: File) => {
    onFilesChange(files.filter(f => f !== file));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = [...files, ...Array.from(e.target.files)];
      onFilesChange(newFiles);
    }
    e.target.value = "";
  };

  return (
    <div className={cn("w-full bg-white rounded-3xl shadow p-4 relative border border-gray-100")}>
      {/* 文件预览区 */}
      {files.length > 0 &&
        <div className="flex items-center gap-4 mb-3">
          {files.map((file, idx) => (
            <div key={file.name + idx} className="flex items-center relative bg-gray-50 rounded-xl pr-8 pl-2 py-2 min-w-[200px] shadow">
              {/* 文件缩略图 */}
              <img
                src="/lovable-uploads/e59cb0e9-29eb-49d4-9673-c3a678939296.png"
                alt="文件预览"
                className="w-12 h-12 rounded-lg object-cover border mr-2"
              />
              {/* 文件信息 */}
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center font-medium text-gray-900 text-base truncate">
                  {getFileIcon(file.type)}
                  <span className="truncate">{file.name}</span>
                </div>
                <span className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</span>
              </div>
              {/* 删除按钮 */}
              <button
                className="absolute top-1.5 right-2 rounded-full bg-white/90 hover:bg-gray-200 transition p-1"
                aria-label="移除文件"
                onClick={() => handleFileRemove(file)}
                type="button"
              >
                <span className="w-4 h-4 text-gray-400 block text-xl font-bold pointer-events-none">×</span>
              </button>
            </div>
          ))}
        </div>
      }
      <hr className="mb-2" />
      {/* 输入区 */}
      <textarea
        className="w-full px-2 py-3 resize-none min-h-[56px] max-h-40 rounded-xl border-none outline-none text-lg text-gray-700 placeholder-gray-400 bg-transparent"
        value={input}
        onChange={e => onInputChange(e.target.value)}
        placeholder="整理核心内容"
        rows={2}
        disabled={disabled}
        onKeyDown={e => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
      />
      {/* 快捷按钮区 */}
      <div className="flex justify-between items-center mt-2">
        <div className="gap-2 flex">
          <button type="button" className="flex items-center px-3 py-1 text-blue-600 bg-blue-50 rounded-full font-medium gap-1 text-base">
            <svg className="w-5 h-5" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="2" /></svg>
            已联网
          </button>
          <button type="button" className="flex items-center px-3 py-1 text-blue-600 bg-blue-50 rounded-full font-medium gap-1 text-base">
            <svg className="w-5 h-5" fill="none" stroke="currentColor"><path d="M12 8v4l3 2" strokeWidth="2"/></svg>
            长思考（k1.5）
          </button>
        </div>
        <div className="flex items-center gap-2">
          <label>
            <input
              type="file"
              className="hidden"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              ref={fileInputRef}
              onChange={handleFileChange}
              disabled={disabled}
            />
            <button
              type="button"
              className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 border hover:bg-gray-100"
              onClick={() => fileInputRef.current?.click()}
              aria-label="上传文件"
              disabled={disabled}
            >
              {/* lucide-react paperclip */}
              <svg className="w-5 h-5" fill="none" stroke="currentColor"><path d="M21.44 11.05l-9.19 9.19a5.003 5.003 0 01-7.08-7.08l9.2-9.19a3.002 3.002 0 014.25 4.25l-9.2 9.19"/></svg>
            </button>
          </label>
          <button
            type="button"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 border hover:bg-gray-100"
            aria-label="更多"
            disabled={disabled}
          >
            {/* lucide-react box */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 6.83 12 12.01 20.71 6.83"/></svg>
          </button>
          <span className="mx-2 w-px h-8 bg-gray-200" />
          <button
            onClick={onSend}
            className="w-10 h-10 rounded-[14px] flex items-center justify-center text-white bg-gray-900 hover:bg-gray-700 transition disabled:bg-gray-200 disabled:text-gray-400"
            aria-label="发送"
            type="button"
            disabled={disabled || input.trim() === ""}
          >
            {/* lucide-react arrow-up */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor"><path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInputBox;
