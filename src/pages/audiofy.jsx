import React, { useState, useRef, useContext } from 'react';
import { PlayIcon, PauseIcon, MicrophoneIcon, SpeakerWaveIcon, ArrowUpTrayIcon as UploadIcon } from '@heroicons/react/24/solid';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'; // For theme toggle icon (optional here)
import { ThemeContext } from '../components/ThemeContext';

function Audiofy() {
  const { theme } = useContext(ThemeContext);
  const [textToSpeak, setTextToSpeak] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [activeFeature, setActiveFeature] = useState('textToSpeech');
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Define theme-related variables HERE, before the return statement
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-800';
  const bgSecondary = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const borderSecondary = theme === 'dark' ? 'border-gray-700' : 'border-gray-300';
  const textSecondary = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const inputBg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200';
  const inputBorder = theme === 'dark' ? 'border-gray-600' : 'border-gray-300';
  const buttonPrimary = 'bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline';
  const buttonDisabled = 'opacity-50 cursor-not-allowed';
  const textAccent = theme === 'dark' ? 'text-blue-500' : 'text-blue-700';

  const handleTextChange = (event) => {
    setTextToSpeak(event.target.value);
  };

  const handleGenerateAudio = async () => {
    setProcessing(true);
    setAudioUrl(''); // Clear previous audio
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    const simulatedAudioUrl = 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3';
    setAudioUrl(simulatedAudioUrl);
    setProcessing(false);
    setIsPlaying(false); // Reset play state
    if (audioRef.current) {
      audioRef.current.load(); // Ensure audio reloads
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleTranscribeAudio = async () => {
    if (selectedFile) {
      setProcessing(true);
      setTranscription(''); // Clear previous transcription
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      const simulatedTranscription = `Simulated transcription of "${selectedFile.name}".`;
      setTranscription(simulatedTranscription);
      setProcessing(false);
    } else {
      alert('Please select an audio file.');
    }
  };

  const handleFeatureChange = (feature) => {
    setActiveFeature(feature);
    setTextToSpeak('');
    setAudioUrl('');
    setSelectedFile(null);
    setTranscription('');
    setIsPlaying(false);
    setProcessing(false);
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={`p-6 rounded-md shadow-md grid grid-cols-1 lg:grid-cols-3 gap-6 ${bgColor} ${textColor}`}>
      {/* Left Sidebar */}
      <div className={`rounded-md p-4 flex flex-col space-y-4 ${bgSecondary} ${borderSecondary}`}>
        <h3 className={`text-lg font-medium ${textSecondary} mb-3`}>Audio Tools</h3>
        <button
          onClick={() => handleFeatureChange('textToSpeech')}
          className={`flex items-center py-2 px-3 rounded focus:outline-none focus:shadow-outline ${
            activeFeature === 'textToSpeech' ? 'bg-blue-600 text-white' : `${inputBg} ${textColor === 'text-white' ? 'text-gray-300' : 'text-gray-700'} hover:${textColor === 'text-white' ? 'bg-gray-600' : 'bg-gray-300'}`
          }`}
        >
          <SpeakerWaveIcon className="w-5 h-5 mr-2" />
          Text to Speech
        </button>
        <button
          onClick={() => handleFeatureChange('speechToText')}
          className={`flex items-center py-2 px-3 rounded focus:outline-none focus:shadow-outline ${
            activeFeature === 'speechToText' ? 'bg-blue-600 text-white' : `${inputBg} ${textColor === 'text-white' ? 'text-gray-300' : 'text-gray-700'} hover:${textColor === 'text-white' ? 'bg-gray-600' : 'bg-gray-300'}`
          }`}
        >
          <MicrophoneIcon className="w-5 h-5 mr-2" />
          Speech to Text
        </button>
        {/* Theme Toggle (you can place it here or in a more global layout) */}
        {/* <ThemeToggle /> */}
      </div>

      {/* Main Content */}
      <div className="col-span-2 flex flex-col">
        <h2 className={`text-xl font-semibold ${textSecondary} mb-4`}>Audiofy</h2>

        {activeFeature === 'textToSpeech' && (
          <div className="flex flex-col space-y-4">
            <h3 className={`text-lg font-medium ${textSecondary}`}>Text to Speech</h3>
            <textarea
              className={`shadow-sm ${inputBg} ${inputBorder} ${textColor} text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
              placeholder="Enter text to convert to speech..."
              value={textToSpeak}
              onChange={handleTextChange}
              rows={5}
            />
            <button
              onClick={handleGenerateAudio} // This is where the function is called
              className={`${buttonPrimary} ${processing ? buttonDisabled : ''}`}
              disabled={processing}
            >
              {processing ? 'Generating...' : 'Generate Audio'}
            </button>
            {audioUrl && (
              <div className={`mt-4 rounded-md p-4 flex items-center space-x-4 ${bgSecondary}`}>
                <audio ref={audioRef} src={audioUrl} className="flex-grow" controls />
              </div>
            )}
          </div>
        )}

        {activeFeature === 'speechToText' && (
          <div className="flex flex-col space-y-4">
            <h3 className={`text-lg font-medium ${textSecondary}`}>Speech to Text</h3>
            <div className="mb-3">
              <label htmlFor="audioFile" className={`block ${textSecondary} text-sm mb-2`}>Select Audio File:</label>
              <div className="relative rounded-md shadow-sm">
                <label htmlFor="audioFile" className={`cursor-pointer ${inputBg} ${inputBorder} ${textColor} text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}>
                  <div className="flex items-center">
                    <UploadIcon className={`w-5 h-5 mr-2 ${textSecondary}`} />
                    <span>{selectedFile ? selectedFile.name : 'Upload Audio File'}</span>
                  </div>
                </label>
                <input
                  type="file"
                  id="audioFile"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="audio/*"
                />
              </div>
            </div>
            <button
              onClick={handleTranscribeAudio}
              className={`${buttonPrimary} ${processing ? buttonDisabled : ''}`}
              disabled={processing || !selectedFile}
            >
              {processing ? 'Transcribing...' : 'Transcribe'}
            </button>
            {transcription && (
              <div className={`mt-4 rounded-md p-4 ${bgSecondary}`}>
                <h4 className={`text-md font-semibold ${textSecondary} mb-2`}>Transcription:</h4>
                <p className={textSecondary}>{transcription}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Audiofy;