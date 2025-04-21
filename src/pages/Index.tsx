
import { useNavigate } from 'react-router-dom';
import { Bot } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import AIChat from "@/components/AIChat";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-1.5 flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#93C5FD] bg-clip-text text-transparent">
            <span>Super</span>
            <span className="text-blue-600">Apply</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 text-center relative">
        <div className="mb-12">
          <Avatar className="w-32 h-32 mx-auto mb-4">
            <AvatarFallback
              className="w-full h-full bg-gradient-to-br from-[#60A5FA] to-[#BFDBFE] flex items-center justify-center text-white text-4xl font-bold"
            >
              小艾
            </AvatarFallback>
          </Avatar>
        </div>

        <h2 className="text-2xl font-bold mb-2 text-blue-800">
          Hi，我是小艾，您的超级智能网申管家
        </h2>
        <p className="text-blue-600 mb-8">
          一站式轻松生成申请表，一键完成网申
        </p>
        {/* 新的交互式AI聊天框 */}
        <div className="max-w-xl mx-auto">
          <AIChat />
        </div>
        {/* 其他提示标签/说明保持不变 */}
        <div className="flex flex-wrap justify-center gap-2 mt-12">
          <div className="w-full flex justify-center mb-2">
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-xl text-sm">
              星号文件为必传文件
            </div>
          </div>
          {[
            "*个人陈述（PS）",
            "*在读证明或学位证书/毕业证书及翻译件",
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
