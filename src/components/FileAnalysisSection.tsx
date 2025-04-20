
import React, { useEffect, useState } from 'react';
import { File, Loader, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DocumentType } from '@/services/fileAnalysisService';

interface FileAnalysisSectionProps {
  file: File;
  isAnalyzing: boolean;
  analysisProgress: number;
  analysisResult?: {
    summary: string;
    documentTypes: DocumentType[];
  };
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
  
  // Function to get document type icon color
  const getDocTypeColor = (type: string) => {
    switch (type) {
      case '个人陈述': return 'bg-blue-100 text-blue-600';
      case '在读证明/学位证书': return 'bg-green-100 text-green-600';
      case '成绩单': return 'bg-yellow-100 text-yellow-600';
      case '推荐信': return 'bg-purple-100 text-purple-600';
      case '英语水平证书': return 'bg-indigo-100 text-indigo-600';
      case '护照': return 'bg-red-100 text-red-600';
      case '简历': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };
  
  return (
    <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-purple-100">
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
        <div className="flex-shrink-0 p-2.5 bg-purple-100 rounded-xl">
          <File className="w-6 h-6 text-purple-600" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-gray-800">{file.name}</p>
          <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB · {file.type}</p>
        </div>
      </div>
      
      {showProgress && (
        <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4 overflow-hidden">
          <div 
            className="bg-purple-600 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${analysisProgress}%` }}
          ></div>
        </div>
      )}
      
      {analysisResult && !isAnalyzing && (
        <>
          <div className="mt-4 bg-purple-50 p-4 rounded-xl">
            <h4 className="font-medium mb-2 text-purple-900">解析结果：</h4>
            <div className="text-sm text-gray-700">{analysisResult.summary}</div>
            
            {analysisResult.documentTypes && analysisResult.documentTypes.length > 0 && (
              <div className="mt-3">
                <h4 className="font-medium mb-2 text-purple-900">文件分类：</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.documentTypes.map((doc, index) => (
                    <div 
                      key={index}
                      className={cn("px-3 py-1 rounded-full text-xs font-medium", 
                        getDocTypeColor(doc.type))}
                    >
                      {doc.type}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FileAnalysisSection;
