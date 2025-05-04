import React from 'react';

interface ApiStatusBannerProps {
  status: 'loading' | 'online' | 'offline';
}

const ApiStatusBanner: React.FC<ApiStatusBannerProps> = ({ status }) => {
  if (status === 'online' || status === 'loading') return null;

  return (
    <div className="bg-red-500 text-white p-3 rounded-lg mb-4 shadow-lg text-center">
      <p className="font-medium">⚠️ Connection to server lost. Some features may not work properly.</p>
      <button 
        className="mt-2 bg-white text-red-500 px-4 py-1 rounded-full text-sm font-medium hover:bg-red-50 transition-colors"
        onClick={() => window.location.reload()}
      >
        Retry Connection
      </button>
    </div>
  );
};

export default ApiStatusBanner;