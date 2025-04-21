
import React, { useCallback } from 'react';
import { FileUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileUploadZoneProps {
  className?: string;
  onFileUpload?: (files: File[]) => void;
}

const FileUploadZone: React.FC<FileUploadZoneProps> = ({ className, onFileUpload }) => {
  const { toast } = useToast();
  
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

  return (
    <div 
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`relative w-full ${className}`}
    >
      <input
        type="text"
        placeholder="快速上传学生材料，无需填写一键生成申请表"
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
          type="submit"
          className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-1"
        >
          发送
        </button>
      </div>
    </div>
  );
};

export default FileUploadZone;
