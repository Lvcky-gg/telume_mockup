
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatPanel from '@/components/ChatPanel';
import Toolbar from '@/components/Toolbar';
import Globe from '@/components/Globe';

const Index = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isChatExpanded, setIsChatExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const toggleChatPanel = () => {
    setIsChatExpanded(!isChatExpanded);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-telume-dark text-white">
      {/* Sidebar */}
      <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        {/* Toolbar */}
        <Toolbar />
        
        {/* Globe Container */}
        <div className="flex-1 relative">
          <Globe />
          
          {/* Overlay info */}
          <div className="absolute top-4 right-4 bg-telume-darker/80 p-3 rounded-md border border-telume-blue/20 text-sm">
            <h3 className="font-medium mb-2">Globe View</h3>
            <p className="text-gray-300 mb-1">Visualization: Standard</p>
            <p className="text-gray-300">Layers: Base map</p>
          </div>
          
          {/* Tool buttons */}
          <div className="absolute left-4 top-4 flex flex-col space-y-2">
            <button className="bg-telume-darker/80 hover:bg-telume-blue/30 p-2 rounded-md border border-telume-blue/20 transition-colors">
              <span className="block h-4 w-4 rounded-full bg-telume-blue"></span>
            </button>
            <button className="bg-telume-darker/80 hover:bg-telume-blue/30 p-2 rounded-md border border-telume-blue/20 transition-colors">
              <span className="block h-4 w-4 rounded bg-telume-blue"></span>
            </button>
            <button className="bg-telume-darker/80 hover:bg-telume-blue/30 p-2 rounded-md border border-telume-blue/20 transition-colors">
              <span className="block h-1 w-4 mt-1.5 rounded-full bg-telume-blue"></span>
            </button>
          </div>
        </div>

        {/* Chat Panel */}
        <ChatPanel isExpanded={isChatExpanded} toggleChatPanel={toggleChatPanel} />
      </div>
    </div>
  );
};

export default Index;
