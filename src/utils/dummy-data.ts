import { Message } from '../types';

// API Configuration
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'https://api.example.com/chat';

// Uncomment and use this function when API is ready
/*
async function fetchChatResponse(query: string): Promise<string> {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any required authentication headers
        // 'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
      body: JSON.stringify({
        query,
        // Add any additional parameters required by your API
        // max_tokens: 150,
        // temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.response; // Adjust based on your API response structure
  } catch (error) {
    console.error('Error fetching chat response:', error);
    throw error;
  }
}
*/

// Dummy responses for testing
const dummyResponses = [
  "I've analyzed the documentation and found that this particular feature is designed to handle customer inquiries efficiently.",
  "Based on the available information, the recommended approach is to follow our standard operating procedures for such cases.",
  "The documentation specifies that this functionality is part of our premium service tier.",
  "According to our guidelines, this type of request should be escalated to our specialized support team.",
  "I've found relevant information in the knowledge base that addresses your specific concern.",
  "The documentation doesn't cover this specific scenario. I recommend contacting our support team for clarification.",
  "Based on our best practices, we typically handle such situations by following a step-by-step approach.",
  "I've identified several relevant policies in our documentation that apply to your question."
];

export const generateDummyResponse = async (query: string): Promise<string> => {
  // Simulate API delay with realistic network latency
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));
  
  // Simple logic to determine if we should return "I don't know"
  const unknownTopics = ['pricing', 'discount', 'refund', 'cancel'];
  if (unknownTopics.some(topic => query.toLowerCase().includes(topic)) || Math.random() < 0.15) {
    return "I apologize, but I don't have enough information in the provided documentation to answer that question accurately.";
  }
  
  // Return a random response with some context
  const response = dummyResponses[Math.floor(Math.random() * dummyResponses.length)];
  return response;
};