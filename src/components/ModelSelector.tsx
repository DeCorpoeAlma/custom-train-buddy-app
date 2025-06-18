
import React, { useState } from 'react';
import { Brain, Zap, HardDrive, Clock } from 'lucide-react';

export const ModelSelector = ({ onNext, onComplete, canProceed }) => {
  const [selectedModel, setSelectedModel] = useState(null);

  const models = [
    {
      id: 'phi3',
      name: 'Phi-3-Mini-128K',
      provider: 'Microsoft',
      ramRequired: 4,
      description: 'Lightweight model, ideal for systems with limited RAM, supports LoRA fine-tuning.',
      hfPath: 'microsoft/Phi-3-mini-128k-instruct',
      difficulty: 'Beginner',
      trainingTime: '1-2 hours',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'gemma',
      name: 'Gemma-2B',
      provider: 'Google',
      ramRequired: 6,
      description: 'Compact model from Google, excellent for general-purpose tasks and experimentation.',
      hfPath: 'google/gemma-2b',
      difficulty: 'Beginner',
      trainingTime: '2-3 hours',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'mistral',
      name: 'Mistral-7B',
      provider: 'Mistral AI',
      ramRequired: 12,
      description: 'Efficient model for complex tasks, supports QLoRA for memory optimization.',
      hfPath: 'mistralai/Mixtral-7B-Instruct-v0.1',
      difficulty: 'Intermediate',
      trainingTime: '4-6 hours',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'llama',
      name: 'Llama-3-8B',
      provider: 'Meta',
      ramRequired: 16,
      description: 'Versatile model, ideal for fine-tuning on specific tasks with high performance.',
      hfPath: 'meta-llama/Llama-3-8b',
      difficulty: 'Advanced',
      trainingTime: '6-8 hours',
      color: 'from-orange-500 to-red-600'
    }
  ];

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    onComplete(model);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-500/20';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-500/20';
      case 'Advanced': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  if (!canProceed) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Model Selection</h2>
        <p className="text-gray-400">Please complete the system check first.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Choose Your Model</h2>
        <p className="text-gray-400">Select a model that fits your requirements and system capabilities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {models.map((model) => (
          <div 
            key={model.id}
            onClick={() => handleModelSelect(model)}
            className={`relative bg-white/5 rounded-xl p-6 border cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-white/10 ${
              selectedModel?.id === model.id 
                ? 'border-blue-500 bg-blue-500/10 scale-105' 
                : 'border-white/20 hover:border-white/40'
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${model.color} opacity-10 rounded-xl`}></div>
            
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{model.name}</h3>
                  <p className="text-sm text-gray-400">{model.provider}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(model.difficulty)}`}>
                  {model.difficulty}
                </span>
              </div>

              <p className="text-gray-300 text-sm mb-4 leading-relaxed">{model.description}</p>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-400">
                  <HardDrive size={16} className="mr-2" />
                  <span>RAM Required: {model.ramRequired}GB</span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Clock size={16} className="mr-2" />
                  <span>Training Time: {model.trainingTime}</span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Brain size={16} className="mr-2" />
                  <span className="font-mono text-xs">{model.hfPath}</span>
                </div>
              </div>

              {selectedModel?.id === model.id && (
                <div className="mt-4 p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                  <div className="flex items-center">
                    <Zap className="text-blue-400 mr-2" size={16} />
                    <span className="text-blue-300 text-sm font-medium">Selected</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedModel && (
        <div className="text-center">
          <button 
            onClick={onNext}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Continue to Data Processing
          </button>
        </div>
      )}
    </div>
  );
};
