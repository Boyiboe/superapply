
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Bot, Sparkles } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Index = () => {
  const [question, setQuestion] = useState('');
  const [placeholderText, setPlaceholderText] = useState('');
  const fullText = "问一问想要了解的留学规划问题吧...";
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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        {/* Avatar Section */}
        <div className="mb-12">
          <Avatar className="w-32 h-32 mx-auto mb-4">
            <AvatarImage src="/logo.png" alt="SuperApply Logo" />
            <AvatarFallback 
              className="w-full h-full bg-white flex items-center justify-center"
            >
              <img src="/logo.png" alt="SuperApply Logo" className="w-full h-full object-contain" />
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Title Section */}
        <h2 className="text-2xl font-bold mb-2 text-blue-800">Hi，我是小艾，您的超级智能网申管家</h2>
        <p className="text-blue-600 mb-8">一站式轻松生成申请表，一键完成网申</p>

        {/* Example Query Section */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-2 bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] p-4 rounded-xl text-left shadow-sm relative overflow-hidden">
            <Sparkles className="w-5 h-5 text-white flex-shrink-0" />
            <p className="text-white text-sm">
              我是浙江大学计算机专业，均分85分，想要申请英美大学...求推荐！
            </p>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite] -skew-x-12" />
          </div>
        </div>

        {/* Input Form with enhanced animations */}
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mb-8 group">
          <div className="relative w-[898px] mx-auto">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={placeholderText}
              className="w-full px-6 py-4 text-[15px] rounded-2xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-12 text-gray-700 placeholder:after:content-['|'] placeholder:after:ml-0.5 placeholder:after:animate-[blink_1s_infinite]"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all group-hover:translate-x-1"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Question Tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {[
            "真的免费做申请吗？",
            "靠什么盈利呢？",
            "免费服务可信吗？",
            "你们的文书润色指导收不收费，专业吗？",
            "我是四川大学学化学的学生，均分85份，想要申请英国UCL大学有希望吗",
            "你们还有哪些其他的优势？"
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
