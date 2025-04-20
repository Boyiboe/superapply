import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Bot, Sparkles, FileUp, ALargeSmall } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import FileUploadZone from '@/components/FileUploadZone';

const Index = () => {
  const [question, setQuestion] = useState('');
  const [placeholderText, setPlaceholderText] = useState('');
  const fullText = "快速上传学生材料，无需填写一键生成申请表";
  const navigate = useNavigate();

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setPlaceholderText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        // Pause at the end before restarting
        setTimeout(() => {
          currentIndex = 0;
        }, 2000);
      }
    }, 100); // 加快打字速度

    return () => clearInterval(typingInterval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      navigate('/chat', { state: { initialQuestion: question } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-1.5 flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div 
            className="text-2xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#93C5FD] bg-clip-text text-transparent"
          >
            <span>Super</span>
            <span className="text-blue-600">Apply</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="mb-12">
          <Avatar className="w-32 h-32 mx-auto mb-4">
            <AvatarFallback 
              className="w-full h-full bg-gradient-to-br from-[#60A5FA] to-[#BFDBFE] flex items-center justify-center text-white text-4xl font-bold"
            >
              小艾
            </AvatarFallback>
          </Avatar>
        </div>

        <h2 className="text-2xl font-bold mb-2 text-blue-800">Hi，我是小艾，您的超级智能网申管家</h2>
        <p className="text-blue-600 mb-8">一站式轻松生成申请表，一键完成网申</p>

        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-2 bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] p-4 rounded-xl text-left shadow-sm relative overflow-hidden">
            <FileUp className="w-5 h-5 text-white flex-shrink-0" />
            <p className="text-white text-sm">
              拖动您的学生材料快速上传，支持ZIP压缩包，PDF，DOCX，txt、xlsx、 xls等文件
            </p>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite] -skew-x-12" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mb-8 group">
          <div className="relative w-[898px] mx-auto">
            <FileUploadZone />
          </div>
        </form>

        <div className="flex flex-wrap justify-center gap-2 mt-8">
        <div className="w-full flex justify-center mb-2">
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-xl text-sm">
            星号文件为必传文件
          </div>
        </div>
        {[
          "*个人陈述（PS）",
          "*在读证明",
          "*学位证书/毕业证书及翻译件",
          "*成绩单及翻译件",
          "*推荐信",
          "*英语水平证书（IELTS/TOEFL或其他证书）"
        ].map((tag, index) => (
          <span 
            key={index} 
            className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Index;
