
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
        <div 
          className="text-2xl font-bold bg-gradient-to-r from-[#6E59A5] to-[#9b87f5] bg-clip-text text-transparent"
        >
          <span>Ed</span>
          <span>mate</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        {/* Avatar Section */}
        <div className="mb-12">
          <Avatar className="w-48 h-48 mx-auto mb-4">
            <AvatarFallback 
              className="w-full h-full bg-gradient-to-br from-[#7E69AB] to-[#D6BCFA] flex items-center justify-center text-white text-2xl font-bold"
            >
              Eva
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Title Section */}
        <h2 className="text-2xl font-bold mb-2">我是Eva, Edmate AI智能留学管家</h2>
        <p className="text-gray-600 mb-12">一站式轻松规划完美留学</p>

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
            真的免费做申请吗?
          </span>
          <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm">
            需要什么条件呢?
          </span>
        </div>
      </div>
    </div>
  );
};

export default Index;
