          
# RAG Chatbot Frontend

A React-based frontend application for a Retrieval-Augmented Generation (RAG) chatbot.

## Overview

This project provides a user interface for interacting with a RAG-powered chatbot system. It allows users to upload documents, ask questions, and receive AI-generated responses based on the uploaded content.

## Features

- Interactive chat interface
- File upload functionality
- Markdown rendering for chat messages
- API status monitoring
- Responsive design with Tailwind CSS

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Axios for API requests
- React Markdown for rendering markdown content

## Project Structure

```
src/
  ├── components/       # UI components
  ├── contexts/         # React context providers
  ├── services/         # API service layer
  ├── types/            # TypeScript type definitions
  └── utils/            # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/RAG-chatbot-fe.git
   cd RAG-chatbot-fe
   ```

2. Install dependencies
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

This will start the Vite development server, typically at http://localhost:5173

### Building for Production

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_API_BASE_URL=your_backend_api_url
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

        