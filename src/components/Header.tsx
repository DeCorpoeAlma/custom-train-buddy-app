
import React from 'react';
import { Settings, Download } from 'lucide-react';

export const Header = () => {
  return (
    <header className="relative bg-white/5 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">MLX</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">MLX Training Studio</h1>
              <p className="text-gray-400 text-sm">Custom AI Model Fine-tuning Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10">
              <Settings size={20} />
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
              <Download size={16} />
              <span>Export Config</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
