
import React from 'react';
import { Folder } from 'lucide-react';

interface FileDropOverlayProps {
  isActive: boolean;
}

const FileDropOverlay: React.FC<FileDropOverlayProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="absolute inset-0 bg-white/95 rounded-xl border-2 border-dashed border-purple-400 flex flex-col items-center justify-center p-8 z-50">
      <div className="mb-6">
        <div className="w-24 h-24 bg-purple-100 rounded-2xl flex items-center justify-center">
          <Folder className="w-12 h-12 text-purple-600" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">文件拖动到此处即可上传</h3>
      <p className="text-gray-600 text-center">
        支持的文件格式：PDF、Word 文档（DOC、DOCX）、Excel 表格（XLSX）、PPT（PPT、PPTX）、图片、CSV、各类纯文本格式等。
      </p>
    </div>
  );
};

export default FileDropOverlay;
