
import React from 'react';
import { FilePdf, X, Circle, CircleCheck, CircleX, LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileStatus {
  type: 'waiting' | 'analyzing' | 'success' | 'error';
  text: string;
}

interface ChatFileCardProps {
  files: File[];
  onRemove?: (file: File) => void;
}

const ChatFileCard: React.FC<ChatFileCardProps> = ({
  files,
  onRemove
}) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const getFileStatus = (file: File): FileStatus => {
    // 这里可以根据实际状态返回不同的状态对象
    return {
      type: 'waiting',
      text: '等待解析'
    };
  };

  const getStatusIcon = (status: FileStatus['type']) => {
    switch (status) {
      case 'analyzing':
        return <LoaderCircle className="h-5 w-5 text-blue-600 animate-spin" />;
      case 'success':
        return <CircleCheck className="h-5 w-5 text-green-600" />;
      case 'error':
        return <CircleX className="h-5 w-5 text-red-600" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusClass = (status: FileStatus['type']) => {
    switch (status) {
      case 'analyzing':
        return 'text-blue-600';
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="w-full rounded-lg bg-gray-50/80 backdrop-blur-sm p-4 shadow-sm border border-gray-100">
      <h3 className="font-medium text-gray-700 mb-3">已上传的文件</h3>
      <div className="space-y-2">
        {files.map((file, index) => {
          const status = getFileStatus(file);
          return (
            <div
              key={`${file.name}-${index}`}
              className="group relative flex items-center justify-between bg-white rounded-lg p-3 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <FilePdf className="h-5 w-5 text-red-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <h4 className="text-sm font-medium text-gray-900 truncate pr-8">
                      {file.name}
                    </h4>
                    {onRemove && (
                      <button
                        onClick={() => onRemove(file)}
                        className="absolute right-3 top-3 p-1 rounded-full hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4 text-gray-400" />
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(status.type)}
                  <span className={cn("text-sm", getStatusClass(status.type))}>
                    {status.text}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatFileCard;
