import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { useChatContext } from '../contexts/ChatContext';
import clsx from 'clsx';

const FileUpload: React.FC = () => {
  const { addFile, files, removeFile } = useChatContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      Array.from(e.target.files).forEach(file => {
        addFile(file);
      });
      // Reset input value to allow uploading the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      Array.from(e.dataTransfer.files).forEach(file => {
        addFile(file);
      });
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="mb-4 mt-4 w-full">
      <div
        className={clsx(
          "border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200",
          isDragging 
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
            : "border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-2" />
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
          Drag and drop files here or
        </p>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold"
        >
          browse files
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleUpload}
          className="hidden"
          multiple
        />
      </div>
      
      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Uploaded Files ({files.length})
          </h3>
          <ul className="space-y-2">
            {files.map(file => (
              <li 
                key={file.id}
                className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 rounded-md px-3 py-2 text-sm"
              >
                <span className="truncate max-w-[80%]">
                  {file.name} ({formatFileSize(file.size)})
                </span>
                <button
                  onClick={() => removeFile(file.id)}
                  className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                >
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;