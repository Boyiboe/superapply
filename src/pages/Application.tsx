
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { File, AlertTriangle, Check, Loader, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { analyzeFile, simulateProgressUpdates, AnalysisProgressUpdate, AnalysisResult } from '@/services/fileAnalysisService';
import ApplicationForm from '@/components/ApplicationForm';
import AIChat from '@/components/AIChat';
import { Progress } from '@/components/ui/progress';

const Application = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Start analysis when a file is selected
  useEffect(() => {
    if (currentFile) {
      startFileAnalysis(currentFile);
    }
  }, [currentFile]);

  const startFileAnalysis = async (file: File) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setProgressMessage('正在读取文件内容...');
    
    // Start progress updates simulation
    const analysisTime = Math.min(Math.max(file.size / 1024, 3), 10) * 1000;
    const cancelProgress = simulateProgressUpdates(
      (update: AnalysisProgressUpdate) => {
        setAnalysisProgress(update.progress);
        if (update.message) {
          setProgressMessage(update.message);
        }
      },
      analysisTime
    );
    
    // Perform actual analysis
    try {
      const result = await analyzeFile(file);
      setAnalysisResult(result);
      setIsAnalyzing(false);
      setAnalysisProgress(100);
      
      toast({
        title: "文件解析完成",
        description: `成功解析 ${file.name}`,
      });
    } catch (error) {
      console.error('File analysis error:', error);
      toast({
        variant: "destructive",
        title: "文件解析失败",
        description: "请重新上传或尝试其他文件"
      });
    } finally {
      cancelProgress();
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = (files: File[]) => {
    if (files.length > 0) {
      const newFile = files[0]; // For now, just handle the first file for simplicity
      setCurrentFile(newFile);
      setUploadedFiles(prev => [...prev, newFile]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);
    const allowedTypes = [
      'application/zip',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'image/jpeg',
      'image/png'
    ];

    const invalidFiles = files.filter(file => 
      !allowedTypes.includes(file.type) && 
      !file.name.endsWith('.zip')
    );
    
    if (invalidFiles.length > 0) {
      toast({
        variant: "destructive",
        title: "文件类型不支持",
        description: "请上传ZIP、PDF、Word文档、图片或TXT文件"
      });
      return;
    }

    handleFileUpload(files);
  };

  return (
    <div 
      className="min-h-screen flex"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Left AI chat area (30%) */}
      <div className="w-3/10 border-r border-gray-200 flex flex-col bg-white">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-purple-700">AI 助手</h2>
          
          {/* File upload progress indicator */}
          {uploadedFiles.length > 0 && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">已上传文件</span>
                {isAnalyzing && (
                  <span className="text-xs text-purple-600">{analysisProgress}%</span>
                )}
              </div>
              
              {isAnalyzing && (
                <div className="relative h-2 bg-purple-100 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse"
                    style={{ width: `${analysisProgress}%` }}
                  ></div>
                </div>
              )}
              
              {/* File thumbnails */}
              <div className="flex flex-wrap gap-2 mt-2">
                {uploadedFiles.map((file, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 px-2 py-1 bg-purple-50 rounded-lg"
                  >
                    <File className="w-4 h-4 text-purple-600" />
                    <span className="text-xs text-gray-800 truncate max-w-[100px]">
                      {file.name}
                    </span>
                    {currentFile === file && isAnalyzing && (
                      <Loader className="w-3 h-3 text-purple-600 animate-spin" />
                    )}
                    {currentFile === file && !isAnalyzing && analysisResult && (
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* AI Chat messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <AIChat 
            currentFile={currentFile}
            isAnalyzing={isAnalyzing}
            analysisProgress={analysisProgress}
            progressMessage={progressMessage}
            analysisResult={analysisResult}
          />
        </div>
        
        {/* File upload prompt */}
        {uploadedFiles.length === 0 && (
          <div className="p-4 flex flex-col items-center justify-center h-40 border-t border-dashed border-gray-200 m-4 rounded-lg bg-gray-50">
            <File className="w-10 h-10 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 text-center">
              拖拽文件到此处，或点击上传<br/>
              <span className="text-xs">支持PDF、Word、图片等格式</span>
            </p>
            <label className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm cursor-pointer hover:bg-purple-700 transition-colors">
              上传文件
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleFileUpload(Array.from(e.target.files));
                  }
                }}
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.zip"
              />
            </label>
          </div>
        )}
      </div>
      
      {/* Right application form area (70%) */}
      <div className="w-7/10 bg-gray-50 overflow-y-auto">
        <div className="max-w-3xl mx-auto py-8 px-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">智能申请表单</h2>
          
          {analysisResult && analysisResult.extractedInfo ? (
            <ApplicationForm extractedInfo={analysisResult.extractedInfo} />
          ) : (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center h-64">
              <AlertTriangle className="w-12 h-12 text-gray-300 mb-4" />
              <p className="text-center text-gray-500">
                {isAnalyzing 
                  ? "正在解析文件，申请表将自动填充..." 
                  : "上传您的申请材料，AI将自动解析并填充申请表"}
              </p>
              
              {isAnalyzing && (
                <div className="w-48 mt-6">
                  <Progress value={analysisProgress} className="h-1.5 bg-gray-100" />
                  <p className="text-xs text-center mt-2 text-purple-600">
                    {progressMessage}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Application;
