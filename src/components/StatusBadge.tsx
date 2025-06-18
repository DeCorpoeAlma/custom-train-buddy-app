
import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export const StatusBadge = ({ systemReady, modelSelected, dataProcessed, configReady }) => {
  const getStatus = () => {
    if (configReady) return { text: 'Ready to Train', icon: CheckCircle, color: 'bg-green-500' };
    if (dataProcessed) return { text: 'Configuring', icon: Clock, color: 'bg-yellow-500' };
    if (modelSelected) return { text: 'Processing Data', icon: Clock, color: 'bg-blue-500' };
    if (systemReady) return { text: 'Selecting Model', icon: Clock, color: 'bg-purple-500' };
    return { text: 'Checking System', icon: Clock, color: 'bg-gray-500' };
  };

  const status = getStatus();
  const IconComponent = status.icon;

  return (
    <div className={`${status.color} text-white px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg backdrop-blur-md`}>
      <IconComponent size={16} />
      <span className="text-sm font-medium">{status.text}</span>
    </div>
  );
};
