
import React from 'react';
import { cn } from '@/lib/utils';
import { Globe, MessageSquare, ArrowRight, ArrowLeft } from 'lucide-react';

interface SidebarProps {
  isExpanded: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, toggleSidebar }) => {
  const menuItems = [
    { name: 'Globe View', icon: <Globe className="h-5 w-5" />, active: true },
    { name: 'Publications', icon: <MessageSquare className="h-5 w-5" />, active: false },
    // Add more menu items as needed
  ];

  return (
    <div 
      className={cn(
        "h-full bg-telume-darker text-white transition-all duration-300 flex flex-col",
        isExpanded ? "w-64" : "w-16"
      )}
    >
      {/* Logo and Header */}
      <div className="p-4 border-b border-telume-blue/20 flex items-center justify-between">
        {isExpanded && <h1 className="text-xl font-semibold text-telume-blue">Telume</h1>}
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-telume-blue/20 rounded-md transition-colors"
        >
          {isExpanded ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
        </button>
      </div>
      
      {/* Navigation Menu */}
      <nav className="flex-1 py-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <a 
                href="#" 
                className={cn(
                  "flex items-center py-2 px-4 rounded-md mx-2 transition-colors",
                  item.active 
                    ? "bg-telume-blue text-white" 
                    : "hover:bg-telume-blue/20 text-gray-300"
                )}
              >
                <span className="mr-3">{item.icon}</span>
                {isExpanded && <span>{item.name}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Tools Section */}
      {isExpanded && (
        <div className="p-4 border-t border-telume-blue/20">
          <h2 className="text-sm font-semibold text-gray-400 mb-2">TOOLS</h2>
          <div className="space-y-2">
            <button className="w-full text-left text-sm py-1 px-2 hover:bg-telume-blue/20 rounded transition-colors">
              3D Viewer
            </button>
            <button className="w-full text-left text-sm py-1 px-2 hover:bg-telume-blue/20 rounded transition-colors">
              Data Layer
            </button>
            <button className="w-full text-left text-sm py-1 px-2 hover:bg-telume-blue/20 rounded transition-colors">
              Export
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
