import React from 'react';
import { Message } from '../types';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import clsx from 'clsx';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div 
      className={clsx(
        "flex w-full mb-6 last:mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div className={clsx(
        "flex gap-3 max-w-[85%]",
        isUser ? "flex-row-reverse" : "flex-row"
      )}>
        {/* Avatar */}
        <div className={clsx(
          "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-inner",
          isUser 
            ? "bg-gradient-to-br from-blue-400 to-blue-600 text-white" 
            : "bg-gradient-to-br from-purple-400 to-purple-600 text-white"
        )}>
          {isUser 
            ? <User size={20} /> 
            : <Bot size={20} />
          }
        </div>
        
        {/* Message content */}
        <div className={clsx(
          "py-3 px-4 rounded-2xl shadow-sm",
          isUser 
            ? "bg-blue-500 text-white dark:bg-blue-600 rounded-tr-none" 
            : "bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-tl-none"
        )}>
          <ReactMarkdown 
            className={clsx(
              "text-sm prose max-w-none",
              isUser 
                ? "prose-invert" 
                : "prose-gray dark:prose-invert"
            )}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;