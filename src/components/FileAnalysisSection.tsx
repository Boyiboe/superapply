
import React, { useEffect, useState } from 'react';
import { File, Loader, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileAnalysisSectionProps {
  file: File;
  isAnalyzing: boolean;
  analysisProgress: number;
  analysisResult?: string;
}

const FileAnalysisSection: React.FC<FileAnalysisSectionProps> = ({ 
  file, 
  isAnalyzing, 
  analysisProgress,
  analysisResult 
}) => {
  const [showProgress, setShowProgress] = useState(true);
  
  useEffect(() => {
    if (!isAnalyzing && analysisProgress === 100) {
      const timer = setTimeout(() => {
        setShowProgress(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isAnalyzing, analysisProgress]);
  
  return (
    <div className="mb-8 bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center mb-4">
        {isAnalyzing ? (
          <Loader className="w-5 h-5 text-purple-600 animate-spin mr-2" />
        ) : (
          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
        )}
        <h3 className="text-lg font-medium">
          {isAnalyzing ? "正在解析文件" : "文件解析完成"}
        </h3>
      </div>
      
      <div className="flex items-start space-x-3 mb-3">
        <div className="flex-shrink-0 p-2 bg-purple-100 rounded-lg">
          <File className="w-6 h-6 text-purple-600" />
        </div>
        <div className="flex-1">
          <p className="font-medium">{file.name}</p>
          <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB · {file.type}</p>
        </div>
      </div>
      
      {showProgress && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div 
            className="bg-purple-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${analysisProgress}%` }}
          ></div>
        </div>
      )}
      
      {analysisResult && !isAnalyzing && (
        <div className="mt-4 bg-purple-50 p-3 rounded-lg">
          <h4 className="font-medium mb-2">解析结果：</h4>
          <div className="text-sm whitespace-pre-wrap">{analysisResult}</div>
        </div>
      )}
    </div>
  );
};

export default FileAnalysisSection;
