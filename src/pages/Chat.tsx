
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

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
      { 
        id: Date.now() + 1, 
        content: '感谢您的提问！我是Eva，您的AI留学顾问。我会根据您的具体情况为您提供专业的建议。',
        type: 'assistant',
        visible: false
      }
    ];
    setMessages(newMessages);
    setInput('');

    // Animate assistant message
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessages[newMessages.length - 1].id 
            ? { ...msg, visible: true }
            : msg
        )
      );
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleNewMessage(input);
    }
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {messages.map(message => (
            <div
              key={message.id}
              className={`transition-all duration-500 ease-out ${
                message.type === 'user' ? 'text-right' : 'text-left'
              } ${message.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div
                className={`inline-block max-w-[80%] px-6 py-4 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-800 shadow-sm'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
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
