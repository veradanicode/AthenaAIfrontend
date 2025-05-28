import React, { useContext } from 'react';
import { ThemeContext } from '../components/ThemeContext';

function VideoAnalysis() {
  const { theme } = useContext(ThemeContext);
  const [videoFile, setVideoFile] = React.useState(null);
  const [videoUrl, setVideoUrl] = React.useState('');
  const [analysisResult, setAnalysisResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleUrlUpload = async () => {
  if (!videoUrl) {
    alert("Please enter a video URL.");
    return;
  }

  setLoading(true);
  try {
    const response = await fetch('http://localhost:5000/api/video/analyze-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ videoUrl }),
    });

    if (!response.ok) throw new Error("Failed to analyze video from URL");

    const data = await response.json();
    setAnalysisResult(data);
  } catch (err) {
    console.error("Error:", err);
    alert("Something went wrong.");
  } finally {
    setLoading(false);
  }
};
  const handleUpload = async () => {
  if (!videoFile) {
    alert("Please select a video file.");
    return;
  }

  const formData = new FormData();
  formData.append('video', videoFile);

  setLoading(true);
  try {
    const response = await fetch('http://localhost:5000/api/video/analyze', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error("Failed to analyze video");

    const data = await response.json();
    setAnalysisResult(data);

  } catch (err) {
    console.error("Error:", err);
    alert("Something went wrong.");
  } finally {
    setLoading(false);
  }

  
};



  // Define theme-based styles
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-800';
  const bgSecondary = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const borderSecondary = theme === 'dark' ? 'border-gray-700' : 'border-gray-300';
  const textSecondary = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const inputBg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200';
  const inputBorder = theme === 'dark' ? 'border-gray-600' : 'border-gray-300';

  return (
    <div className={`${bgColor} ${textColor} p-6 rounded-md shadow-md`}>
      <h2 className={`text-xl font-semibold ${textSecondary} mb-4`}>Video Analysis</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Media Upload and Upload from URL */}
        <div className="space-y-6">
          {/* Media Upload */}
          <div className={`${bgSecondary} border rounded-md p-4 border-${borderSecondary}`}>
            <h3 className={`text-lg font-medium ${textSecondary} mb-2`}>Media Upload</h3>
            <div className={`border-dashed border-2 border-${borderSecondary} rounded-md p-10 flex flex-col items-center justify-center`}>
              <svg className="w-12 h-12 text-gray-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
              </svg>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files[0])}
                className="mt-2 text-sm"
              />
              <p className={`text-xs ${textSecondary} mt-1`}>Supported formats: MP4, MOV, AVI</p>
               <button
                onClick={handleUpload}
                disabled={loading}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
              >
                {loading ? "Analyzing..." : "Analyze Video"}
              </button>
            </div>
          </div>

          {/* Upload from URL */}
          <div className={`${bgSecondary} border rounded-md p-4 border-${borderSecondary}`}>
            <h3 className={`text-lg font-medium ${textSecondary} mb-2`}>Upload from URL</h3>
            <div className="mb-2">
              <label htmlFor="videoUrl" className={`block text-sm ${textSecondary}`}>Video URL:</label>
             <input
                type="text"
                id="videoUrl"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className={`shadow-sm ${inputBg} border border-${inputBorder} ${textColor} text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                placeholder="https://example.com/video.mp4"
              />

            </div>
            <button
              onClick={handleUrlUpload}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>

        </div>

        {/* Right Column: Analysis Results */}
        <div className={`${bgSecondary} border rounded-md p-4 border-${borderSecondary}`}>
          <h3 className={`text-lg font-medium ${textSecondary} mb-2`}>Analysis Results</h3>
          <div className="grid grid-cols-1 gap-6">
            {/* Placeholder for the questions */}
            <div className={`${bgSecondary} p-4 rounded-md`}>
              <h4 className={`text-md font-semibold ${textSecondary} mb-2`}>Generated Questions:</h4>
                 {analysisResult?.questions ? (
                      <pre className={textSecondary} style={{ whiteSpace: 'pre-wrap' }}>
                        {typeof analysisResult.questions === 'string' ? analysisResult.questions : JSON.stringify(analysisResult.questions, null, 2)}
                      </pre>
                    ) : (
                      <p className={textSecondary}>Questions will appear here after analysis.</p>
                    )}
            </div>
            {/* Placeholder for the summary */}
            <div className={`${bgSecondary} p-4 rounded-md`}>
              <h4 className={`text-md font-semibold ${textSecondary} mb-2`}>Summary Notes: </h4>
                {analysisResult?.summary ? (
                  <p className={textSecondary}>{analysisResult.summary}</p>
                ) : (
                  <p className={textSecondary}>Summary notes will appear here after analysis.</p>
                )}
              {/* Example: <TranscriptionResults text={transcriptionText} /> */}
            </div>
            {/* Add more result placeholders as needed */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoAnalysis;
