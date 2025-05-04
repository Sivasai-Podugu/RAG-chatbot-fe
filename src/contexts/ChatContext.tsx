import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChatContextType, Message, FileItem } from '../types';
import apiService from '../services/api';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

const STORAGE_KEY = 'chatHistory';
const CONVERSATION_ID_KEY = 'currentConversationId';

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  
  const [currentConversationId, setCurrentConversationId] = useState<string>(() => {
    const stored = localStorage.getItem(CONVERSATION_ID_KEY);
    return stored || Date.now().toString();
  });
  
  const [isTyping, setIsTyping] = useState(false);
  const [files, setFiles] = useState<FileItem[]>([]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(CONVERSATION_ID_KEY, currentConversationId);
  }, [currentConversationId]);

  const addMessage = async (content: string, role: 'user' | 'assistant', conversationId?: string) => {
    const msgConversationId = conversationId || currentConversationId;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: Date.now(),
      conversationId: msgConversationId,
    };

    setMessages(prev => [...prev, newMessage]);

    if (role === 'user') {
      setIsTyping(true);
      try {
        const response = await apiService.sendQuestion(content, msgConversationId);
        
        addMessage(response.answer, 'assistant', response.conversation_id);
        setIsTyping(false);
      } catch (error) {
        console.error('Error generating response:', error);
        addMessage('Sorry, I encountered an error while processing your request.', 'assistant', msgConversationId);
        setIsTyping(false);
      }
    }
  };

  const addFile = (file: File) => {
    const newFile: FileItem = {
      id: Date.now().toString(),
      name: file.name,
      size: file.size,
      type: file.type,
    };

    setFiles(prev => [...prev, newFile]);
    addMessage(`File uploaded: ${file.name} (${formatFileSize(file.size)})`, 'assistant');
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const clearHistory = () => {
    setMessages([]);
    setFiles([]);
    localStorage.removeItem(STORAGE_KEY);
    // Generate a new conversation ID
    const newConversationId = Date.now().toString();
    setCurrentConversationId(newConversationId);
  };
  
  const clearConversation = async (conversationId: string) => {
    try {
      await apiService.clearConversations([conversationId]);
      // Remove messages with this conversation ID
      setMessages(prev => prev.filter(msg => msg.conversationId !== conversationId));
      
      // If we cleared the current conversation, create a new one
      if (conversationId === currentConversationId) {
        const newConversationId = Date.now().toString();
        setCurrentConversationId(newConversationId);
      }
    } catch (error) {
      console.error('Error clearing conversation:', error);
    }
  };
  
  const clearAllConversations = async () => {
    try {
      // Get all unique conversation IDs
      const conversationIds = [...new Set(messages.map(msg => msg.conversationId).filter(Boolean))] as string[];
      
      if (conversationIds.length > 0) {
        await apiService.clearConversations(conversationIds);
      }
      
      // Clear all messages
      setMessages([]);
      setFiles([]);
      localStorage.removeItem(STORAGE_KEY);
      
      // Generate a new conversation ID
      const newConversationId = Date.now().toString();
      setCurrentConversationId(newConversationId);
    } catch (error) {
      console.error('Error clearing all conversations:', error);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <ChatContext.Provider value={{ 
      messages, 
      isTyping, 
      files, 
      currentConversationId,
      addMessage, 
      addFile, 
      removeFile, 
      clearHistory,
      clearConversation,
      clearAllConversations
    }}>
      {children}
    </ChatContext.Provider>
  );
};