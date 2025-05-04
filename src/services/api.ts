import axios from 'axios';

// Get API URL from environment variables with a fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface QuestionRequest {
  question: string;
  conversation_id: string;
}

export interface AnswerResponse {
  answer: string;
  sources?: string[];
  conversation_id: string;
}

export interface ConversationRequest {
  conversation_ids: string[];
}

const apiService = {
  // Send a question to the backend and get an answer
  async sendQuestion(question: string, conversationId: string): Promise<AnswerResponse> {
    const response = await apiClient.post<AnswerResponse>('/answer', {
      question,
      conversation_id: conversationId,
    });
    return response.data;
  },

  // Clear one or more conversations
  async clearConversations(conversationIds: string[]): Promise<any> {
    const response = await apiClient.post('/clear-conversation', {
      conversation_ids: conversationIds,
    });
    return response.data;
  },

  // Health check
  async healthCheck(): Promise<any> {
    const response = await apiClient.get('/health');
    return response.data;
  },
};

export default apiService;