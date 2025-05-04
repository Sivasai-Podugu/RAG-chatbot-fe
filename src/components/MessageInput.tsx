import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useChatContext } from '../contexts/ChatContext';
import clsx from 'clsx';

const MessageInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const { addMessage, isTyping, currentConversationId } = useChatContext();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || isTyping) return;
    
    // Pass the current conversation ID when adding a message
    addMessage(message.trim(), 'user', currentConversationId);
    setMessage('');
    
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200/80 dark:border-gray-700/80 p-4">
      <form onSubmit={handleSubmit} className="flex items-end gap-3 max-w-4xl mx-auto">
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="w-full resize-none rounded-2xl border-0 bg-gray-100 dark:bg-gray-700/50 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 min-h-[52px] max-h-[120px] transition-all duration-200"
            disabled={isTyping}
            rows={1}
          />
          {isTyping && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400">
              AI is typing...
            </div>
          )}
        </div>
        <button
          type="submit"
          className={clsx(
            "h-[52px] px-6 rounded-xl flex items-center justify-center gap-2 font-medium transition-all duration-200",
            message.trim() && !isTyping
              ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35"
              : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
          )}
          disabled={!message.trim() || isTyping}
        >
          <span>Send</span>
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;