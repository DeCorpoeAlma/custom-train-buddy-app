
import React, { useState } from 'react';
import { SystemCheck } from '../components/SystemCheck';
import { ModelSelector } from '../components/ModelSelector';
import { DataProcessor } from '../components/DataProcessor';
import { TrainingConfig } from '../components/TrainingConfig';
import { Header } from '../components/Header';
import { StatusBadge } from '../components/StatusBadge';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [systemReady, setSystemReady] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [processedData, setProcessedData] = useState(null);
  const [trainingConfig, setTrainingConfig] = useState(null);

  const steps = [
    { title: 'System Check', component: SystemCheck, completed: systemReady },
    { title: 'Model Selection', component: ModelSelector, completed: !!selectedModel },
    { title: 'Data Processing', component: DataProcessor, completed: !!processedData },
    { title: 'Training Config', component: TrainingConfig, completed: !!trainingConfig }
  ];

  const StepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <Header />
      
      <div className="relative container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md rounded-full px-6 py-4 border border-white/20">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    index === currentStep 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-110' 
                      : step.completed 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-600 text-gray-300'
                  }`}
                >
                  {step.completed ? '✓' : index + 1}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  index === currentStep ? 'text-white' : step.completed ? 'text-green-400' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    step.completed ? 'bg-green-500' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <StepComponent 
            onNext={() => setCurrentStep(Math.min(currentStep + 1, steps.length - 1))}
            onPrev={() => setCurrentStep(Math.max(currentStep - 1, 0))}
            onComplete={(data) => {
              if (currentStep === 0) setSystemReady(data);
              if (currentStep === 1) setSelectedModel(data);
              if (currentStep === 2) setProcessedData(data);
              if (currentStep === 3) setTrainingConfig(data);
            }}
            canProceed={currentStep === 0 ? true : steps[currentStep - 1]?.completed}
          />
        </div>

        {/* Status Bar */}
        <div className="fixed bottom-4 right-4">
          <StatusBadge 
            systemReady={systemReady} 
            modelSelected={!!selectedModel}
            dataProcessed={!!processedData}
            configReady={!!trainingConfig}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
