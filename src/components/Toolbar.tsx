
import React from 'react';

const Toolbar: React.FC = () => {
  return (
    <div className="bg-telume-darker border-b border-telume-blue/20 p-2 flex items-center space-x-2">
      <button className="bg-telume-blue/20 hover:bg-telume-blue/30 text-white text-sm px-3 py-1 rounded transition-colors">
        Pan
      </button>
      <button className="bg-gray-800/30 hover:bg-telume-blue/30 text-white text-sm px-3 py-1 rounded transition-colors">
        Zoom
      </button>
      <button className="bg-gray-800/30 hover:bg-telume-blue/30 text-white text-sm px-3 py-1 rounded transition-colors">
        Select
      </button>
      <div className="h-5 border-r border-telume-blue/20 mx-1"></div>
      <button className="bg-gray-800/30 hover:bg-telume-blue/30 text-white text-sm px-3 py-1 rounded transition-colors">
        Add Layer
      </button>
      <button className="bg-gray-800/30 hover:bg-telume-blue/30 text-white text-sm px-3 py-1 rounded transition-colors">
        Export
      </button>
      <div className="flex-1"></div>
      <div className="bg-gray-800/30 text-white text-xs px-2 py-1 rounded">
        Zoom: 100%
      </div>
      <div className="bg-gray-800/30 text-white text-xs px-2 py-1 rounded">
        Lat: 0.00° | Lng: 0.00°
      </div>
    </div>
  );
};

export default Toolbar;
