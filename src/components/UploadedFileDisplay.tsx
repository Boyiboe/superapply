
import React from 'react';
import { File, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadedFileDisplayProps {
  files: File[];
  onRemove?: (file: File) => void;
}

const UploadedFileDisplay: React.FC<UploadedFileDisplayProps> = ({
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

  return (
    <div className="w-full space-y-2 rounded-lg bg-white p-4">
      <div className="flex flex-wrap gap-2">
        {files.map((file, index) => (
          <div
            key={`${file.name}-${index}`}
            className="group relative flex items-center gap-2 rounded-lg bg-gray-50 p-3 pr-8"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
              <File className="h-5 w-5 text-red-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">{file.name}</span>
              <span className="text-xs text-gray-500">{formatFileSize(file.size)}</span>
            </div>
            {onRemove && (
              <button
                onClick={() => onRemove(file)}
                className="absolute right-2 top-2 rounded-full p-1 text-gray-400 opacity-0 hover:bg-gray-200 hover:text-gray-500 group-hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadedFileDisplay;
