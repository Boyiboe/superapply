import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MessageSquare, Bot, ALargeSmall, Paperclip } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import ChatSection from '@/components/ChatSection';
import FileAnalysisSection from '@/components/FileAnalysisSection';
import { analyzeFile, simulateProgressUpdates, AnalysisProgressUpdate } from '@/services/fileAnalysisService';

interface Message {
  id: number;
  content: string;
  type: 'user' | 'assistant';
  visible: boolean;
  file?: File;
}

interface FileAnalysis {
  file: File;
  isAnalyzing: boolean;
  progress: number;
  result?: string;
}

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileAnalysis, setFileAnalysis] = useState<FileAnalysis | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const initialQuestion = location.state?.initialQuestion;
    if (initialQuestion) {
      handleNewMessage(initialQuestion);
    }
  }, [location.state]);

  useEffect(() => {
    // Start analysis when a file is sent in a message
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.file && lastMessage.type === 'user') {
      startFileAnalysis(lastMessage.file);
    }
  }, [messages]);

  const startFileAnalysis = async (file: File) => {
    setFileAnalysis({
      file,
      isAnalyzing: true,
      progress: 0
    });
    
    // Start progress updates simulation
    const analysisTime = Math.min(Math.max(file.size / 1024, 3), 10) * 1000;
    const cancelProgress = simulateProgressUpdates(
      (update: AnalysisProgressUpdate) => {
        setFileAnalysis(prev => prev ? {
          ...prev,
          progress: update.progress
        } : null);
      },
      analysisTime
    );
    
    // Perform actual analysis
    try {
      const result = await analyzeFile(file);
      setFileAnalysis(prev => prev ? {
        ...prev,
        isAnalyzing: false,
        progress: 100,
        result
      } : null);
      
      // Add analysis result as assistant message
      const analysisMessage = `文件 "${file.name}" 解析完成:\n\n${result}`;
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          content: analysisMessage,
          type: 'assistant',
          visible: true
        }
      ]);
    } catch (error) {
      console.error('File analysis error:', error);
      toast({
        variant: "destructive",
        title: "文件解析失败",
        description: "请重新上传或尝试其他文件"
      });
    } finally {
      cancelProgress();
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/zip'
      ];

      if (!allowedTypes.includes(file.type)) {
        toast({
          variant: "destructive",
          title: "文件类型不支持",
          description: "请上传ZIP、PDF、DOCX、TXT、XLSX或XLS文件"
        });
        return;
      }

      setSelectedFile(file);
      toast({
        title: "文件已选择",
        description: file.name
      });
    }
  };

  const handleNewMessage = (content: string, file?: File) => {
    const newMessages: Message[] = [
      ...messages,
      { 
        id: Date.now(), 
        content: file ? `${content} [文件: ${file.name}]` : content, 
        type: 'user', 
        visible: true,
        file 
      },
    ];
    
    if (!file) {
      // Only add automatic response if there's no file (file analysis will add its own response)
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
    }
    
    setMessages(newMessages);
    setInput('');
    setSelectedFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() || selectedFile) {
      handleNewMessage(input.trim() || '已上传文件', selectedFile || undefined);
    }
  };
  
  const renderAssistantResponse = () => {
    if (messages.length === 0) return null;
    
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.type !== 'assistant' || lastMessage.content !== 'analysis') return null;

    return (
      <div className="space-y-6">
        <ChatSection
          title="正在理解用户需求，拆分任务"
          content={
            <div className="space-y-2 flex items-center">
              <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 mr-4">
                <span className="text-white text-xs">AI</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">AI</span>
                  </div>
                  <p className="text-gray-600 font-bold">留学管家</p>
                </div>
                <div className="flex gap-2 items-start mt-4">
                  <div className="flex-1">
                    <p className="text-gray-600">
                      用户问题是：我是浙江大学大四的学生，计算机专业计划明年去英国或者美国留学，可以申请到哪些学校？
                    </p>
                    <p className="text-gray-600 mt-4">
                      接下来会由多个留学助手，从案例分析、院校评估、留学生活：
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-600">
                      <li>需要进一步确认学习成绩（例如均分为80）以便与择校规划</li>
                      <li>查询历年浙江大学的历年英国美国院校申请案例</li>
                      <li>根据浙江大学计算机及相近的专业进行院校推荐</li>
                      <li>查询推荐院校申请详细信息和材料准备需求</li>
                      <li>根据需求推荐材料准备方案</li>
                      <li>最后汇总申请注意事项，生成完整留学申请方案</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          }
          delay={500}
          icon="loader"
        />

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
      <div className="p-4 fixed top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm">
        <div className="max-w-full px-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-1.5 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-[#6E59A5] to-[#9b87f5] bg-clip-text text-transparent">
              <span>Super</span>
              <span>Apply</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="max-w-4xl mx-auto px-4 py-4 mb-20 pt-20">
        <div className="space-y-6">
          {fileAnalysis && (
            <FileAnalysisSection
              file={fileAnalysis.file}
              isAnalyzing={fileAnalysis.isAnalyzing}
              analysisProgress={fileAnalysis.progress}
              analysisResult={fileAnalysis.result}
            />
          )}
          
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
              <div key={message.id} className="text-left flex items-start gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback 
                    className="w-full h-full bg-gradient-to-br from-[#6E59A5] to-[#9b87f5] flex items-center justify-center text-white"
                  >
                    <ALargeSmall className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="inline-block max-w-[80%] px-6 py-4 rounded-2xl bg-white text-gray-800 shadow-sm whitespace-pre-wrap">
                  {message.content}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Input Form */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <form 
          onSubmit={handleSubmit} 
          onDragEnter={handleDrag}
          className="max-w-4xl mx-auto"
        >
          <div 
            className={`relative ${dragActive ? 'ring-2 ring-purple-400' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={selectedFile ? `已选择文件: ${selectedFile.name}` : "继续提问..."}
              className="w-full px-6 py-4 text-lg rounded-2xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 pr-24"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
              <label className="cursor-pointer p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors">
                <input
                  type="file"
                  className="hidden"
                  accept=".zip,.pdf,.docx,.txt,.xlsx,.xls"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedFile(file);
                      toast({
                        title: "文件已选择",
                        description: file.name
                      });
                    }
                  }}
                />
                <Paperclip className="w-5 h-5" />
              </label>
              <button
                type="submit"
                className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                disabled={!input.trim() && !selectedFile}
              >
                <MessageSquare className="w-5 h-5" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
