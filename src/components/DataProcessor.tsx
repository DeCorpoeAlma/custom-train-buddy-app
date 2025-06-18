
import React, { useState } from 'react';
import { Upload, FileText, Database, BookOpen, CheckCircle } from 'lucide-react';

export const DataProcessor = ({ onNext, onComplete, canProceed }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [processingStatus, setProcessingStatus] = useState('idle');

  const processingMethods = [
    {
      id: 'structured',
      title: 'Structured Data',
      description: 'Upload formatted Q&A data (.txt, .csv, .json)',
      icon: Database,
      formats: ['.txt', '.csv', '.json'],
      example: 'Question: What is AI? || Answer: Artificial Intelligence...'
    },
    {
      id: 'book',
      title: 'Book Processing',
      description: 'Transform any book into training data',
      icon: BookOpen,
      formats: ['.txt'],
      example: 'Automatically generate Q&A pairs from text content'
    }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setProcessingStatus('processing');
      
      // Simulate processing
      setTimeout(() => {
        setProcessingStatus('completed');
        onComplete({
          method: selectedMethod,
          file: file,
          entriesGenerated: Math.floor(Math.random() * 500) + 100
        });
      }, 2000);
    }
  };

  if (!canProceed) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Data Processing</h2>
        <p className="text-gray-400">Please select a model first.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Prepare Training Data</h2>
        <p className="text-gray-400">Choose how you want to process your training data</p>
      </div>

      {!selectedMethod ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {processingMethods.map((method) => {
            const IconComponent = method.icon;
            return (
              <div 
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className="bg-white/5 rounded-xl p-6 border border-white/20 cursor-pointer hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:scale-105"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                  <p className="text-gray-400 mb-4">{method.description}</p>
                  
                  <div className="mb-4">
                    <div className="text-sm text-gray-500 mb-2">Supported formats:</div>
                    <div className="flex justify-center space-x-2">
                      {method.formats.map((format) => (
                        <span key={format} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                          {format}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 bg-white/5 rounded-lg p-3">
                    <strong>Example:</strong> {method.example}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 rounded-xl p-6 border border-white/20 mb-6">
            <h3 className="text-xl font-bold text-white mb-4">
              {processingMethods.find(m => m.id === selectedMethod)?.title}
            </h3>
            
            {processingStatus === 'idle' && (
              <div className="text-center">
                <div className="border-2 border-dashed border-gray-500 rounded-xl p-8 mb-4 hover:border-blue-500 transition-colors">
                  <Upload size={32} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">Drag & drop your file here or click to browse</p>
                  <input 
                    type="file" 
                    onChange={handleFileUpload}
                    className="hidden" 
                    id="file-upload"
                    accept={processingMethods.find(m => m.id === selectedMethod)?.formats.join(',')}
                  />
                  <label 
                    htmlFor="file-upload"
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300"
                  >
                    Choose File
                  </label>
                </div>
              </div>
            )}

            {processingStatus === 'processing' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h4 className="text-white font-semibold mb-2">Processing {uploadedFile?.name}</h4>
                <p className="text-gray-400">Generating training data...</p>
              </div>
            )}

            {processingStatus === 'completed' && (
              <div className="text-center py-8">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h4 className="text-white font-semibold mb-2">Processing Complete!</h4>
                <p className="text-gray-400 mb-4">Successfully processed {uploadedFile?.name}</p>
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6">
                  <p className="text-green-300">Generated training entries ready for fine-tuning</p>
                </div>
                
                <button 
                  onClick={onNext}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Continue to Training Configuration
                </button>
              </div>
            )}
          </div>

          {processingStatus === 'idle' && (
            <button 
              onClick={() => setSelectedMethod(null)}
              className="w-full py-2 text-gray-400 hover:text-white transition-colors"
            >
              ← Back to method selection
            </button>
          )}
        </div>
      )}
    </div>
  );
};
