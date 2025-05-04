export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
  conversationId?: string;
}

export interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
}

export interface ChatContextType {
  messages: Message[];
  isTyping: boolean;
  files: FileItem[];
  currentConversationId: string; // Add this field
  addMessage: (content: string, role: 'user' | 'assistant', conversationId?: string) => void;
  addFile: (file: File) => void;
  removeFile: (id: string) => void;
  clearHistory: () => void;
  clearConversation: (conversationId: string) => void; // Add this method
  clearAllConversations: () => void; // Add this method
}