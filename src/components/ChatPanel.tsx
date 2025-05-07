
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { MessageSquare, Send, X } from 'lucide-react';

interface ChatPanelProps {
  isExpanded: boolean;
  toggleChatPanel: () => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ isExpanded, toggleChatPanel }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'system', content: 'Welcome to Telume AI Assistant. How can I help you with your geospatial visualizations today?' }
  ]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    // Add user message to chat history
    setChatHistory([...chatHistory, { role: 'user', content: message }]);
    
    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      setChatHistory(curr => [
        ...curr, 
        { role: 'system', content: `I'm Telume's AI assistant. I understand you're asking about "${message}". How else can I assist with your geospatial visualization needs?` }
      ]);
    }, 1000);
    
    setMessage('');
  };

  return (
    <div 
      className={cn(
        "bg-telume-darker border-t border-telume-blue/20 transition-all duration-300 absolute bottom-0 left-0 right-0 flex flex-col",
        isExpanded ? "h-72" : "h-12"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-telume-blue/20">
        <div className="flex items-center">
          <MessageSquare className="h-4 w-4 text-telume-blue mr-2" />
          <h3 className="text-sm font-medium text-telume-blue">AI Assistant</h3>
        </div>
        <button 
          onClick={toggleChatPanel}
          className="p-1 hover:bg-telume-blue/20 rounded-md transition-colors"
        >
          {isExpanded ? <X className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
        </button>
      </div>
      
      {/* Chat Messages */}
      {isExpanded && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatHistory.map((msg, index) => (
            <div 
              key={index} 
              className={cn(
                "max-w-3/4 p-2 rounded-md",
                msg.role === 'user' 
                  ? "bg-telume-blue/20 ml-auto" 
                  : "bg-gray-800/30"
              )}
            >
              <p className="text-sm">{msg.content}</p>
            </div>
          ))}
        </div>
      )}
      
      {/* Input */}
      {isExpanded && (
        <div className="p-3 border-t border-telume-blue/20">
          <div className="flex items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask the AI assistant..."
              className="flex-1 bg-gray-800/30 border border-telume-blue/20 rounded-l-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-telume-blue/50"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="bg-telume-blue hover:bg-telume-blue-dark text-white p-2 rounded-r-md"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPanel;
