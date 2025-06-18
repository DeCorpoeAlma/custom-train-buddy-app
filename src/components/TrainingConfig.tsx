
import React, { useState } from 'react';
import { Settings, Zap, Clock, Save } from 'lucide-react';

export const TrainingConfig = ({ onComplete, canProceed }) => {
  const [selectedConfig, setSelectedConfig] = useState('standard');
  const [customParams, setCustomParams] = useState({
    learning_rate: '5e-5',
    rank: '16',
    alpha: '32',
    iterations: '600',
    batch_size: '16'
  });

  const presets = [
    {
      id: 'light',
      name: 'Light Training',
      description: 'Quick training for testing and low-resource systems',
      icon: Zap,
      time: '1-2 hours',
      params: {
        learning_rate: '1e-5',
        rank: '8',
        alpha: '16',
        iterations: '200',
        batch_size: '8'
      },
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'standard',
      name: 'Standard Training',
      description: 'Balanced approach between efficiency and quality',
      icon: Settings,
      time: '4-6 hours',
      params: {
        learning_rate: '5e-5',
        rank: '16',
        alpha: '32',
        iterations: '600',
        batch_size: '16'
      },
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'intensive',
      name: 'Intensive Training',
      description: 'Deep training for maximum quality, requires more resources',
      icon: Clock,
      time: '8-12 hours',
      params: {
        learning_rate: '1e-4',
        rank: '32',
        alpha: '64',
        iterations: '1000',
        batch_size: '32'
      },
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const handleConfigSelect = (configId) => {
    setSelectedConfig(configId);
    if (configId !== 'custom') {
      const preset = presets.find(p => p.id === configId);
      setCustomParams(preset.params);
    }
  };

  const handleParamChange = (param, value) => {
    setCustomParams(prev => ({ ...prev, [param]: value }));
  };

  const handleSaveConfig = () => {
    const config = {
      preset: selectedConfig,
      params: customParams,
      command: generateCommand()
    };
    onComplete(config);
  };

  const generateCommand = () => {
    return `python -m mlx_lm.lora --model selected_model --train --data train_data.jsonl --iters ${customParams.iterations} --steps-per-eval 200 --val-batches 25 --learning-rate ${customParams.learning_rate} --rank ${customParams.rank} --alpha ${customParams.alpha} --batch-size ${customParams.batch_size}`;
  };

  if (!canProceed) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Training Configuration</h2>
        <p className="text-gray-400">Please process your data first.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Configure Training</h2>
        <p className="text-gray-400">Fine-tune your training parameters for optimal results</p>
      </div>

      {/* Preset Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {presets.map((preset) => {
          const IconComponent = preset.icon;
          return (
            <div 
              key={preset.id}
              onClick={() => handleConfigSelect(preset.id)}
              className={`relative bg-white/5 rounded-xl p-4 border cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedConfig === preset.id 
                  ? 'border-blue-500 bg-blue-500/10 scale-105' 
                  : 'border-white/20 hover:border-white/40'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${preset.color} opacity-10 rounded-xl`}></div>
              
              <div className="relative text-center">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <IconComponent size={20} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{preset.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{preset.description}</p>
                <div className="text-xs text-gray-500">
                  <Clock size={12} className="inline mr-1" />
                  {preset.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Configuration */}
      <div className="bg-white/5 rounded-xl p-6 border border-white/20 mb-8">
        <h3 className="text-xl font-bold text-white mb-6">Fine-tune Parameters</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Learning Rate</label>
            <input 
              type="text" 
              value={customParams.learning_rate}
              onChange={(e) => handleParamChange('learning_rate', e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              placeholder="5e-5"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">LoRA Rank</label>
            <input 
              type="number" 
              value={customParams.rank}
              onChange={(e) => handleParamChange('rank', e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              placeholder="16"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">LoRA Alpha</label>
            <input 
              type="number" 
              value={customParams.alpha}
              onChange={(e) => handleParamChange('alpha', e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              placeholder="32"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Iterations</label>
            <input 
              type="number" 
              value={customParams.iterations}
              onChange={(e) => handleParamChange('iterations', e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              placeholder="600"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Batch Size</label>
            <input 
              type="number" 
              value={customParams.batch_size}
              onChange={(e) => handleParamChange('batch_size', e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              placeholder="16"
            />
          </div>
        </div>
      </div>

      {/* Generated Command Preview */}
      <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700 mb-6">
        <h4 className="text-sm font-medium text-gray-300 mb-2">Generated Command:</h4>
        <code className="text-green-400 text-sm font-mono break-all">
          {generateCommand()}
        </code>
      </div>

      {/* Save Configuration */}
      <div className="text-center">
        <button 
          onClick={handleSaveConfig}
          className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto"
        >
          <Save size={16} />
          <span>Save Configuration & Start Training</span>
        </button>
      </div>
    </div>
  );
};
