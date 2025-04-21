
import React, { useState, useEffect } from 'react';
import { Loader, CheckCircle, File } from 'lucide-react';
import { AnalysisResult } from '@/services/fileAnalysisService';

interface AIChatProps {
  currentFile: File | null;
  isAnalyzing: boolean;
  analysisProgress: number;
  progressMessage: string;
  analysisResult: AnalysisResult | null;
}

interface ChatMessage {
  id: number;
  type: 'ai' | 'system';
  content: string;
  status?: 'processing' | 'done' | 'error';
  steps?: Array<{
    text: string;
    status: 'done' | 'active' | 'pending';
  }>;
}

const AIChat: React.FC<AIChatProps> = ({
  currentFile,
  isAnalyzing,
  analysisProgress,
  progressMessage,
  analysisResult
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'ai',
      content: '您好，请上传材料以开始智能解析填表',
      status: 'done'
    }
  ]);

  // Add welcome message when component mounts
  useEffect(() => {
    if (currentFile && messages.length === 1) {
      addMessage({
        type: 'ai',
        content: `已收到您的文件：${currentFile.name}`,
        status: 'done'
      });
    }
  }, [currentFile]);

  // Update messages when analysis progress changes
  useEffect(() => {
    if (isAnalyzing && currentFile) {
      // Find if we already have a processing message
      const processingMessageIndex = messages.findIndex(msg => msg.status === 'processing');
      
      if (processingMessageIndex === -1) {
        // Add a new processing message
        addMessage({
          type: 'system',
          content: '文件解析中',
          status: 'processing',
          steps: [
            { text: '文件类型验证', status: 'done' },
            { text: '提取文档结构', status: 'active' },
            { text: '识别关键信息', status: 'pending' },
            { text: '生成结构化数据', status: 'pending' }
          ]
        });
      } else {
        // Update the existing processing message
        const updatedMessages = [...messages];
        const steps = [...(updatedMessages[processingMessageIndex].steps || [])];
        
        if (analysisProgress < 33) {
          steps[0].status = 'done';
          steps[1].status = 'active';
          steps[2].status = 'pending';
          steps[3].status = 'pending';
        } else if (analysisProgress < 66) {
          steps[0].status = 'done';
          steps[1].status = 'done';
          steps[2].status = 'active';
          steps[3].status = 'pending';
        } else if (analysisProgress < 100) {
          steps[0].status = 'done';
          steps[1].status = 'done';
          steps[2].status = 'done';
          steps[3].status = 'active';
        }
        
        updatedMessages[processingMessageIndex].steps = steps;
        setMessages(updatedMessages);
      }
    }
  }, [isAnalyzing, analysisProgress, currentFile]);

  // Update messages when analysis is complete
  useEffect(() => {
    if (!isAnalyzing && analysisResult && currentFile) {
      // Find and update processing message to done
      const updatedMessages = messages.map(msg => {
        if (msg.status === 'processing') {
          return {
            ...msg,
            status: 'done',
            steps: msg.steps?.map(step => ({ ...step, status: 'done' as const }))
          };
        }
        return msg;
      });
      
      setMessages(updatedMessages);
      
      // Add result message
      addMessage({
        type: 'ai',
        content: `文件 "${currentFile.name}" 解析完成！已发现 ${analysisResult.documentTypes.length} 个文档，正在填充申请表...`,
        status: 'done'
      });
      
      // Add specific messages based on document types
      if (analysisResult.documentTypes.length > 0) {
        setTimeout(() => {
          analysisResult.documentTypes.forEach((docType, index) => {
            setTimeout(() => {
              addMessage({
                type: 'ai',
                content: `检测到${docType.type}，已提取相关信息并填充到申请表中。`,
                status: 'done'
              });
            }, index * 800);
          });
        }, 1000);
      }
    }
  }, [isAnalyzing, analysisResult]);

  const addMessage = (message: Omit<ChatMessage, 'id'>) => {
    const newMessage = {
      id: Date.now(),
      ...message
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className="space-y-4">
      {messages.map(message => (
        <div 
          key={message.id} 
          className={`message ${message.type === 'ai' ? 'ai-message' : 'system-message'}`}
        >
          <div className="flex items-start gap-2">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                ${message.type === 'ai' 
                  ? 'bg-purple-100 text-purple-600' 
                  : 'bg-blue-100 text-blue-600'}`}
            >
              {message.status === 'processing' ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : message.type === 'ai' ? (
                <span className="text-sm font-bold">AI</span>
              ) : (
                <File className="w-4 h-4" />
              )}
            </div>
            
            <div className="flex-1 bg-white p-3 rounded-lg rounded-tl-none shadow-sm border border-gray-100">
              {message.content && !message.steps && (
                <p className="text-gray-800">{message.content}</p>
              )}
              
              {message.status === 'processing' && (
                <div className="w-full bg-purple-50 rounded-md p-2 mt-2">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-purple-700">解析进度</h4>
                    <span className="text-xs text-purple-600">{analysisProgress}%</span>
                  </div>
                  
                  <div className="relative h-1.5 bg-purple-100 rounded-full overflow-hidden mb-3">
                    <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-blue-500"
                      style={{ width: `${analysisProgress}%` }}
                    ></div>
                  </div>
                  
                  {message.steps && (
                    <ul className="space-y-2 text-sm">
                      {message.steps.map((step, index) => (
                        <li 
                          key={index}
                          className={`flex items-center gap-2 ${
                            step.status === 'active' ? 'text-purple-700 font-medium' : 
                            step.status === 'done' ? 'text-green-600' : 'text-gray-400'
                          }`}
                        >
                          {step.status === 'done' && <CheckCircle className="w-3 h-3" />}
                          {step.status === 'active' && <Loader className="w-3 h-3 animate-spin" />}
                          {step.status === 'pending' && <div className="w-3 h-3 rounded-full border border-gray-300"></div>}
                          <span>{step.text}{step.status === 'active' && '...'}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AIChat;
