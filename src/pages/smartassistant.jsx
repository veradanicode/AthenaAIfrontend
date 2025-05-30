import React, { useState, useContext } from 'react';
import { ThemeContext } from '../components/ThemeContext';
import { BASE_URL } from "../../config";

function SmartAssistant() {
  const [query, setQuery] = useState('');
  const [assistantResponse, setAssistantResponse] = useState('');
  const [activeFeature, setActiveFeature] = useState('chat'); 
  const { theme } = useContext(ThemeContext);

  // Define theme-based styles
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-800';
  const bgSecondary = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const borderSecondary = theme === 'dark' ? 'border-gray-700' : 'border-gray-300';
  const textSecondary = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const inputBg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200';
  const inputBorder = theme === 'dark' ? 'border-gray-600' : 'border-gray-300';

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const simulatedResponse = `Simulated response for your query: "${query}". This could include explanations, summaries, or answers based on your study materials.`;
    setAssistantResponse(simulatedResponse);
    setQuery(''); 
  };

  const handleFeatureChange = (feature) => {
    setActiveFeature(feature);
    setQuery(''); 
    setAssistantResponse(''); 
  };

  return (
    <div className={`p-6 rounded-md shadow-md grid grid-cols-1 lg:grid-cols-3 gap-6 ${bgColor} ${textColor}`}>
      {/* Left Sidebar: Assistant Features */}
      <div className={`${bgSecondary} rounded-md p-4 border border-${borderSecondary} flex flex-col space-y-4`}>
        <h3 className={`text-lg font-medium ${textSecondary} mb-2`}>Assistant Features</h3>
        <button
          onClick={() => handleFeatureChange('chat')}
          className={`py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            activeFeature === 'chat' ? 'bg-blue-500 text-white' : `${inputBg} ${textSecondary} hover:bg-gray-600 ${theme === 'light' ? 'hover:bg-gray-300' : ''}`
          }`}
        >
          Chat with Assistant
        </button>
        <button
          onClick={() => handleFeatureChange('summarize')}
          className={`py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            activeFeature === 'summarize' ? 'bg-blue-500 text-white' : `${inputBg} ${textSecondary} hover:bg-gray-600 ${theme === 'light' ? 'hover:bg-gray-300' : ''}`
          }`}
        >
          Summarize Text
        </button>
        <button
          onClick={() => handleFeatureChange('explain')}
          className={`py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            activeFeature === 'explain' ? 'bg-blue-500 text-white' : `${inputBg} ${textSecondary} hover:bg-gray-600 ${theme === 'light' ? 'hover:bg-gray-300' : ''}`
          }`}
        >
          Explain Concept
        </button>
        <button
          onClick={() => handleFeatureChange('practice')}
          className={`py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            activeFeature === 'practice' ? 'bg-blue-500 text-white' : `${inputBg} ${textSecondary} hover:bg-gray-600 ${theme === 'light' ? 'hover:bg-gray-300' : ''}`
          }`}
        >
          Practice Questions
        </button>
        
      </div>

      {/* Main Content Area */}
      <div className={`${bgSecondary} rounded-md p-4 border border-${borderSecondary} col-span-2 flex flex-col`}>
        <h2 className={`text-xl font-semibold ${textSecondary} mb-4`}>Study Assistant</h2>

        {activeFeature === 'chat' && (
          <div>
            <h3 className={`text-lg font-medium ${textSecondary} mb-2`}>Chat with Assistant</h3>
            <form onSubmit={handleSubmit} className="mb-4">
              <input
                type="text"
                className={`shadow-sm ${inputBg} border border-${inputBorder} ${textColor} text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                placeholder="Ask your question..."
                value={query}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Send
              </button>
            </form>
            {assistantResponse && (
              <div className={`mt-4 p-3 rounded-md ${bgSecondary} border border-${borderSecondary}`}>
                <p className={textSecondary}>{assistantResponse}</p>
              </div>
            )}
          </div>
        )}

        {activeFeature === 'summarize' && (
          <div>
            <h3 className={`text-lg font-medium ${textSecondary} mb-2`}>Summarize Text</h3>
            <textarea
              className={`shadow-sm ${inputBg} border border-${inputBorder} ${textColor} text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2`}
              placeholder="Paste the text you want to summarize..."
              value={query}
              onChange={handleInputChange}
            />
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Summarize
            </button>
            {assistantResponse && (
              <div className={`mt-4 p-3 rounded-md ${bgSecondary} border border-${borderSecondary}`}>
                <p className={textSecondary}>{assistantResponse}</p>
              </div>
            )}
          </div>
        )}

        {activeFeature === 'explain' && (
          <div>
            <h3 className={`text-lg font-medium ${textSecondary} mb-2`}>Explain Concept</h3>
            <input
              type="text"
              className={`shadow-sm ${inputBg} border border-${inputBorder} ${textColor} text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2`}
              placeholder="Enter the concept you want explained..."
              value={query}
              onChange={handleInputChange}
            />
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Explain
            </button>
            {assistantResponse && (
              <div className={`mt-4 p-3 rounded-md ${bgSecondary} border border-${borderSecondary}`}>
                <p className={textSecondary}>{assistantResponse}</p>
              </div>
            )}
          </div>
        )}

        {activeFeature === 'practice' && (
          <div>
            <h3 className={`text-lg font-medium ${textSecondary} mb-2`}>Practice Questions</h3>
            {/* Placeholder for displaying practice questions and handling answers */}
            <p className={textSecondary}>This section will display practice questions related to your study materials.</p>
            {/* You might have a button to fetch questions or display the first question */}
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 px-4 rounded focus:outline-none focus:shadow-outline mt-2">
              Start Practice
            </button>
            
          </div>
        )}

        
      </div>
    </div>
  );
}

export default SmartAssistant;
