import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Bot, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Index = () => {
  const [question, setQuestion] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      navigate('/chat', { state: { initialQuestion: question } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">  {/* Changed from gap-4 to gap-2 */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-1.5 flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div 
            className="text-2xl font-bold bg-gradient-to-r from-[#6E59A5] to-[#9b87f5] bg-clip-text text-transparent"
          >
            <span>Ed</span>
            <span>mate</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        {/* Avatar Section */}
        <div className="mb-12">
          <Avatar className="w-32 h-32 mx-auto mb-4">
            <AvatarFallback 
              className="w-full h-full bg-gradient-to-br from-[#7E69AB] to-[#D6BCFA] flex items-center justify-center text-white text-2xl font-bold"
            >
              Eva
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Title Section */}
        <h2 className="text-2xl font-bold mb-2">我是Eva, Edmate AI智能留学管家</h2>
        <p className="text-gray-600 mb-8">一站式轻松规划完美留学</p>

        {/* Example Query Section */}
        <div className="flex justify-center mb-4">
          <div className="relative inline-block">
            <div className="flex items-center gap-2 bg-gradient-to-r from-purple-200 to-purple-300 p-4 rounded-2xl text-left shadow-sm">
              <Sparkles className="w-5 h-5 text-purple-700 flex-shrink-0" />
              <p className="text-purple-900 text-sm">
                我是浙江大学计算机专业，均分85分，想要申请英美大学...求推荐！
              </p>
              <div className="absolute -bottom-2 left-6 w-4 h-4 bg-purple-300 transform rotate-45"></div>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mb-8">
          <div className="relative w-[898px] mx-auto">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="请输入您的问题..."
              className="w-full px-6 py-4 text-[14px] rounded-2xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 pr-12 text-gray-700"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Question Tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm">
            真的免费做申请吗？
          </span>
          <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm">
            靠什么盈利呢？
          </span>
          <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm">
            免费服务可信吗？
          </span>
          <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm">
            你们的文书润色指导收不收费，专业吗？
          </span>
          <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm">
            我是四川大学学化学的学生，均分85份，想要申请英国UCL大学有希望吗
          </span>
          <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm">
            你们还有哪些其他的优势？
          </span>
        </div>
      </div>
    </div>
  );
};

export default Index;
