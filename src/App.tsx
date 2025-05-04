import React, { useState, useEffect } from 'react';
import { ChatProvider } from './contexts/ChatContext';
import ChatInterface from './components/ChatInterface';
import ApiStatusBanner from './components/ApiStatusBanner';
import apiService from './services/api';

function App() {
  const [apiStatus, setApiStatus] = useState<'loading' | 'online' | 'offline'>('loading');

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        await apiService.healthCheck();
        setApiStatus('online');
      } catch (error) {
        console.error('API health check failed:', error);
        setApiStatus('offline');
      }
    };

    checkApiStatus();

    // Set up periodic health checks every 30 seconds
    const intervalId = setInterval(checkApiStatus, 150000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-screen-xl mx-auto">
        <ApiStatusBanner status={apiStatus} />

        <header className="text-center py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Angel One Support Chatbot
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Ask questions about Angel One's support documentation and insurance policies. Our AI assistant will provide answers based on official resources.
          </p>
        </header>
        
        <main>
          <ChatProvider>
            <ChatInterface />
          </ChatProvider>
        </main>
        
        <footer className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400 py-4">
          <p>© 2025 Angel One Support Assistant. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;