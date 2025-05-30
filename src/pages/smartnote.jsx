import React, { useState, useContext } from 'react';
import { ThemeContext } from '../components/ThemeContext';
import { BASE_URL } from "../../config";

function SmartNotes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { theme } = useContext(ThemeContext);

  // Define theme-based styles
    const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100';
    const textColor = theme === 'dark' ? 'text-white' : 'text-gray-800';
    const bgSecondary = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
    const borderSecondary = theme === 'dark' ? 'border-gray-700' : 'border-gray-300';
    const textSecondary = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
    const inputBg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200';
    const inputBorder = theme === 'dark' ? 'border-gray-600' : 'border-gray-300';


  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const handleRemoveFile = (index) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  return (
    <div className={`${bgColor} ${textColor} p-6 rounded-md shadow-md`}>
      <h2 className={`text-xl font-semibold ${textSecondary} mb-4`}>Smart Notes</h2>

      {/* Top Search Bar, Sort, and Filter */}
      <div className="flex items-center mb-6 space-x-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-6a7 7 0 10-14 0 7 7 0 0014 0z" />
            </svg>
          </div>
          <input
            type="text"
            className={`shadow-sm ${inputBg} border border-${inputBorder} ${textColor} text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5`}
            placeholder="Search your test here..."
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
        </div>
        <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Sort By
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Filter
        </button>
      </div>

      {/* Add Notes to take quiz Card */}
      <div className="mb-4 p-6 rounded-md bg-purple-800 border border-purple-700 flex items-center space-x-6">
        <div className="p-3 rounded-full bg-purple-900 text-purple-300">
          {/* Placeholder for an icon */}
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7 1.274 4.057-1.176 8-5.042 8-3.866 0-7.657-3.943-8.93-8z" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-gray-300">Add Notes to take quiz</h3>
          <p className="text-sm text-gray-500">Take quiz from your note</p>
          <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Take Quiz</button>
        </div>
      </div>

      {/* Ready To Take A Short Quiz? Card */}
      <div className="mb-4 p-6 rounded-md bg-green-800 border border-green-700">
        <h3 className="font-semibold text-gray-300">Ready To Take A Short Quiz?</h3>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Start Short Quiz</button>
      </div>

      {/* Media Upload Card */}
      <div className={`mb-4 p-4 rounded-md ${bgSecondary} border border-${borderSecondary}`}>
        <h3 className={`text-lg font-medium ${textSecondary} mb-2`}>Media Upload</h3>
        <div
          className={`border-dashed border-2 border-${borderSecondary} rounded-md p-6 flex flex-col items-center justify-center cursor-pointer`}
          onDrop={handleFileDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <svg className="w-10 h-10 text-gray-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
          </svg>
          <p className={`text-sm ${textSecondary}`}>Drag and drop your file(s) here</p>
          <label htmlFor="fileInput" className="mt-1 text-blue-500 hover:underline cursor-pointer">or browse</label>
          <input type="file" id="fileInput" className="hidden" multiple onChange={handleFileSelect} />
          <p className={`text-xs ${textSecondary} mt-1`}>Max 5 files are allowed</p>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="mt-4">
            <h4 className={`text-md font-semibold ${textSecondary} mb-2`}>Uploaded Files</h4>
            <ul>
              {uploadedFiles.map((file, index) => (
                <li key={index} className={`flex items-center ${bgSecondary} rounded-md p-2 mb-2`}>
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className={`${textSecondary} text-sm`}>{file.name}</span>
                  <span className={`ml-auto ${textSecondary} text-xs`}>({(file.size / 1024).toFixed(2)} KB)</span>
                  <button onClick={() => handleRemoveFile(index)} className="ml-2 text-red-500 hover:text-red-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <p className={`text-xs ${textSecondary} mt-2`}>Only support .jpg, .png, .svg and .zip files</p>
      </div>

      {/* Describe Quiz From Note Card */}
      <div className={`p-4 rounded-md ${bgSecondary} border border-${borderSecondary}`}>
        <h3 className={`text-lg font-medium ${textSecondary} mb-2`}>Describe Quiz From Note</h3>
        <textarea
          className={`shadow-sm ${inputBg} border border-${inputBorder} ${textColor} text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2`}
          placeholder="Enter instructions or describe the quiz you want to generate from your notes..."
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Generate Quiz</button>
      </div>

      
    </div>
  );
}

export default SmartNotes;
