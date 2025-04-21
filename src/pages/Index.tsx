
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Bot, Sparkles, FileUp, ALargeSmall } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import FileUploadZone from '@/components/FileUploadZone';
import FileDropOverlay from '@/components/FileDropOverlay';
import UploadedFileDisplay from '@/components/UploadedFileDisplay';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [question, setQuestion] = useState('');
  const [placeholderText, setPlaceholderText] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const fullText = "快速上传学生材料，无需填写一键生成申请表";
  const navigate = useNavigate();
  const { toast } = useToast();

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
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'image/jpeg',
      'image/png',
      'text/csv',
      'text/plain'
    ];

    const invalidFiles = files.filter(file => !allowedTypes.includes(file.type));
    if (invalidFiles.length > 0) {
      toast({
        variant: "destructive",
        title: "文件类型不支持",
        description: "请上传PDF、Word文档、Excel表格、PPT、图片或CSV文件"
      });
      return;
    }

    // 添加新上传的文件
    setUploadedFiles(prev => [...prev, ...files]);
    toast({
      title: "文件已接收",
      description: `成功接收 ${files.length} 个文件`
    });
  };

  const handleRemoveFile = (fileToRemove: File) => {
    setUploadedFiles(prev => prev.filter(file => file !== fileToRemove));
    toast({
      title: "文件已移除",
      description: fileToRemove.name
    });
  };

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleSendFiles = (files: File[]) => {
    if (files.length > 0) {
      // Navigate to chat page with the files
      navigate('/chat', { state: { uploadedFiles: files } });
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-white to-blue-50"
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
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

      <div className="max-w-4xl mx-auto px-4 py-12 text-center relative">
        <FileDropOverlay isActive={dragActive} />
        
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

        {/* 显示上传的文件 */}
        {uploadedFiles.length > 0 && (
          <div className="mb-8">
            <UploadedFileDisplay 
              files={uploadedFiles}
              onRemove={handleRemoveFile}
            />
          </div>
        )}

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
            <FileUploadZone 
              uploadedFiles={uploadedFiles}
              onFileUpload={handleFileUpload}
              onSendFiles={handleSendFiles}
              isAnalyzing={isAnalyzing}
              analysisProgress={analysisProgress}
            />
          </div>
        </form>

        {/* 保持其他部分不变 */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
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
