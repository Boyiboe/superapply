
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import ChatSection from '@/components/ChatSection';

interface Message {
  id: number;
  content: string;
  type: 'user' | 'assistant';
  visible: boolean;
}

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  
  useEffect(() => {
    const initialQuestion = location.state?.initialQuestion;
    if (initialQuestion) {
      handleNewMessage(initialQuestion);
    }
  }, []);

  const handleNewMessage = (content: string) => {
    const newMessages: Message[] = [
      ...messages,
      { id: Date.now(), content, type: 'user', visible: true },
    ];
    
    if (content.includes('浙江大学') && content.includes('留学')) {
      newMessages.push({
        id: Date.now() + 1,
        content: 'analysis',
        type: 'assistant',
        visible: true
      });
    } else {
      newMessages.push({
        id: Date.now() + 1,
        content: '感谢您的提问！我是Eva，您的AI留学顾问。我会根据您的具体情况为您提供专业的建议。',
        type: 'assistant',
        visible: true
      });
    }
    
    setMessages(newMessages);
    setInput('');
  };

  const renderAssistantResponse = () => {
    if (messages.length === 0) return null;
    
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.type !== 'assistant' || lastMessage.content !== 'analysis') return null;

    return (
      <div className="space-y-6">
        <ChatSection
          title="基本情况分析"
          content={
            <div className="space-y-2">
              <p>您作为浙江大学计算机专业的大四学生，具有很强的竞争优势：</p>
              <p>1. 浙江大学是中国顶尖高校，在国际上有很高认可度</p>
              <p>2. 计算机专业是热门专业，就业前景好</p>
              <p>3. 作为应届生申请，时间点比较合适</p>
            </div>
          }
          delay={500}
        />

        <ChatSection
          title="英国院校推荐"
          content={
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <h4 className="font-medium">剑桥大学 (University of Cambridge)</h4>
                  <p className="text-sm text-gray-600">计算机科学硕士</p>
                </div>
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  TOP 1
                </div>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <h4 className="font-medium">帝国理工学院 (Imperial College London)</h4>
                  <p className="text-sm text-gray-600">计算机科学硕士</p>
                </div>
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  TOP 3
                </div>
              </div>
            </div>
          }
          delay={1000}
        />

        <ChatSection
          title="美国院校推荐"
          content={
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <h4 className="font-medium">斯坦福大学 (Stanford University)</h4>
                  <p className="text-sm text-gray-600">计算机科学硕士</p>
                </div>
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  TOP 1
                </div>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <h4 className="font-medium">麻省理工学院 (MIT)</h4>
                  <p className="text-sm text-gray-600">计算机科学与工程硕士</p>
                </div>
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  TOP 2
                </div>
              </div>
            </div>
          }
          delay={1500}
        />

        <ChatSection
          title="申请建议"
          content={
            <div className="space-y-2">
              <p>1. 准备雅思/托福考试，英国学校普遍要求雅思7.0以上</p>
              <p>2. 收集本科期间的科研项目、实习经历等材料</p>
              <p>3. 建议同时申请5-8所学校，包括冲刺、匹配和保底选择</p>
              <p>4. 开始准备个人陈述和推荐信</p>
            </div>
          }
          delay={2000}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="text-2xl font-bold text-blue-600"
          >
            Edmate
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="max-w-4xl mx-auto px-4 py-8 mb-20">
        <div className="space-y-6">
          {messages.map(message => 
            message.type === 'user' ? (
              <div key={message.id} className="text-right">
                <div className="inline-block max-w-[80%] px-6 py-4 rounded-2xl bg-purple-600 text-white">
                  {message.content}
                </div>
              </div>
            ) : message.content === 'analysis' ? (
              <div key={message.id}>{renderAssistantResponse()}</div>
            ) : (
              <div key={message.id} className="text-left">
                <div className="inline-block max-w-[80%] px-6 py-4 rounded-2xl bg-white text-gray-800 shadow-sm">
                  {message.content}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Input Form */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <form onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) {
            handleNewMessage(input);
          }
        }} className="max-w-4xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="继续提问..."
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

export default Chat;
