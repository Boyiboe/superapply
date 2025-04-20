import React, { useCallback, useState } from 'react';
import { FileUp, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

interface FileUploadZoneProps {
  className?: string;
  onFileUpload?: (files: File[]) => void;
  onSendFiles?: (files: File[]) => void;
  uploadedFiles?: File[]; // 使用可选属性
  isAnalyzing?: boolean;
  analysisProgress?: number;
}

const FileUploadZone: React.FC<FileUploadZoneProps> = ({ 
  className, 
  onFileUpload, 
  onSendFiles,
  uploadedFiles = [], // 默认为空数组
  isAnalyzing = false,
  analysisProgress = 0
}) => {
  const { toast } = useToast();
  const [inputText, setInputText] = useState('');
  
  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    const allowedTypes = [
      'application/zip',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    const invalidFiles = files.filter(file => !allowedTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      toast({
        variant: "destructive",
        title: "文件类型不支持",
        description: "请上传ZIP、PDF、DOCX、TXT、XLSX或XLS文件"
      });
      return;
    }

    // Handle valid files
    toast({
      title: "文件上传成功",
      description: `已接收 ${files.length} 个文件`
    });
    
    if (onFileUpload) {
      onFileUpload(files);
    }
  }, [toast, onFileUpload]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      toast({
        title: "文件上传成功",
        description: `已接收 ${files.length} 个文件`
      });
      
      if (onFileUpload) {
        onFileUpload(Array.from(files));
      }
    }
  };

  const handleSendFiles = () => {
    // 添加额外的非空检查
    if (onSendFiles && uploadedFiles && uploadedFiles.length > 0) {
      onSendFiles(uploadedFiles);
    }
  };

  return (
    <div 
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`relative w-full ${className}`}
    >
      {isAnalyzing && (
        <div className="absolute -top-10 left-0 right-0 bg-white p-3 rounded-lg shadow-sm border border-purple-100">
          <div className="flex justify-between mb-2 items-center">
            <p className="text-sm font-medium text-gray-700">正在解析文件...</p>
            <p className="text-sm text-purple-600">{analysisProgress}%</p>
          </div>
          <Progress value={analysisProgress} className="h-2 bg-purple-100" />
        </div>
      )}

      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder={uploadedFiles && uploadedFiles.length > 0 ? "请点击发送按钮开始解析文件..." : "请输入问题..."}
        className="w-full px-6 py-6 text-lg rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-24"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
        <label className="cursor-pointer p-2.5 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors">
          <input
            type="file"
            className="hidden"
            multiple
            accept=".zip,.pdf,.docx,.txt,.xlsx,.xls"
            onChange={handleFileSelect}
          />
          <FileUp className="w-5 h-5" />
        </label>
        <button
          type="button"
          onClick={handleSendFiles}
          disabled={!uploadedFiles || uploadedFiles.length === 0}
          className={`p-2.5 ${uploadedFiles && uploadedFiles.length > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300'} text-white rounded-xl transition-colors flex items-center gap-1`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default FileUploadZone;
