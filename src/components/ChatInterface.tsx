import React, { useState } from 'react';
import ChatHistory from './ChatHistory';
import MessageInput from './MessageInput';
import { MessageSquare, Maximize2, Minimize2, Trash2 } from 'lucide-react';
import { useChatContext } from '../contexts/ChatContext';

const ChatInterface: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { clearAllConversations } = useChatContext();

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div 
      className={`
        flex flex-col bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 
        rounded-xl overflow-hidden shadow-2xl border border-gray-200/50 dark:border-gray-700/50 
        backdrop-blur-sm transition-all duration-300 ease-in-out
        ${isFullscreen 
          ? 'fixed inset-0 z-50 m-0 rounded-none' 
          : 'h-[600px] w-full max-w-3xl mx-auto my-8'
        }
      `}
    >
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/80 dark:border-gray-700/80 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-500 text-white p-2 rounded-lg">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">AI Assistant</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Ask me anything about your documents</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={clearAllConversations}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-500 dark:text-gray-400 transition-colors duration-200"
            title="Clear chat history"
          >
            <Trash2 size={18} />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-500 dark:text-gray-400 transition-colors duration-200"
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen mode"}
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </div>
      
      <ChatHistory />
      <MessageInput />
    </div>
  );
};

export default ChatInterface;