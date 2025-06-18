
import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Monitor, Cpu, HardDrive, Wifi } from 'lucide-react';

export const SystemCheck = ({ onNext, onComplete }) => {
  const [checks, setChecks] = useState([]);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Simulate system checks
    const systemChecks = [
      { name: 'Apple Silicon Chip', icon: Cpu, status: 'checking' },
      { name: 'ARM64 Architecture', icon: Monitor, status: 'checking' },
      { name: 'macOS ≥ 13.0', icon: Monitor, status: 'checking' },
      { name: 'Python ≥ 3.9', icon: Monitor, status: 'checking' },
      { name: 'MLX Library', icon: Monitor, status: 'checking' },
      { name: 'MLX-LM Package', icon: Monitor, status: 'checking' },
      { name: 'Available RAM (≥8GB)', icon: HardDrive, status: 'checking' },
      { name: 'Network Connection', icon: Wifi, status: 'checking' }
    ];

    setChecks(systemChecks);

    // Simulate check completion
    const timer = setTimeout(() => {
      const updatedChecks = systemChecks.map((check, index) => ({
        ...check,
        status: Math.random() > 0.2 ? 'pass' : index < 6 ? 'pass' : 'fail' // Most checks pass
      }));
      setChecks(updatedChecks);
      setIsChecking(false);
      
      const allPassed = updatedChecks.every(check => check.status === 'pass');
      onComplete(allPassed);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pass': return <CheckCircle className="text-green-500" size={20} />;
      case 'fail': return <XCircle className="text-red-500" size={20} />;
      case 'warning': return <AlertCircle className="text-yellow-500" size={20} />;
      default: return <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
    }
  };

  const allCompleted = !isChecking && checks.length > 0;
  const allPassed = checks.every(check => check.status === 'pass');

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">System Compatibility Check</h2>
        <p className="text-gray-400">Verifying your system meets MLX training requirements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {checks.map((check, index) => {
          const IconComponent = check.icon;
          return (
            <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <IconComponent size={20} className="text-blue-400" />
                </div>
                <span className="flex-1 text-white font-medium">{check.name}</span>
                {getStatusIcon(check.status)}
              </div>
            </div>
          );
        })}
      </div>

      {allCompleted && (
        <div className="text-center space-y-4">
          {allPassed ? (
            <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
              <CheckCircle className="mx-auto text-green-500 mb-2" size={32} />
              <h3 className="text-green-400 font-semibold text-lg">System Ready!</h3>
              <p className="text-green-300 text-sm">Your system is compatible with MLX training</p>
            </div>
          ) : (
            <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
              <XCircle className="mx-auto text-red-500 mb-2" size={32} />
              <h3 className="text-red-400 font-semibold text-lg">System Issues Detected</h3>
              <p className="text-red-300 text-sm">Some requirements are not met. Please check the failed items.</p>
            </div>
          )}
          
          <button 
            onClick={onNext}
            disabled={!allPassed}
            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
              allPassed 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:scale-105' 
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continue to Model Selection
          </button>
        </div>
      )}
    </div>
  );
};
