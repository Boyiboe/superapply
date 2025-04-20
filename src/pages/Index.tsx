
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

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
        <h1 className="text-2xl font-bold text-blue-600">Edmate</h1>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        {/* Avatar Section */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto rounded-full border-4 border-purple-200 overflow-hidden bg-purple-100">
            <img
              src="/placeholder.svg"
              alt="AI Assistant"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Title Section */}
        <h2 className="text-2xl font-bold mb-2">我是Eva, Edmate AI智能留学管家</h2>
        <p className="text-gray-600 mb-8">一站式轻松规划完美留学</p>

        {/* Question Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm">
            真的免费做申请吗?
          </span>
          <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm">
            需要什么条件呢?
          </span>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="请输入您的问题..."
              className="w-full px-6 py-4 text-lg rounded-2xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 pr-12"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
