import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../components/ThemeContext';
import { BASE_URL } from "../../config";

const Quizze = () => {
  const { theme } = useContext(ThemeContext);

  const [file, setFile] = useState(null);
  const [className, setClassName] = useState('');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [history, setHistory] = useState([]);

  // Fetch history once on mount
  useEffect(() => {
    fetch(`${BASE_URL}/api/quiz/progress`)
      .then(res => res.json())
      .then(data => setHistory(data.progress || []))
      .catch(console.error);
  }, []);

  const handleFileChange = e => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert('Please select a file');

    // Prompt for class name
    let cls = className;
    if (!cls) {
      cls = window.prompt('Enter class name for this quiz:');
      if (!cls) return alert('Class name is required');
      setClassName(cls);
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${BASE_URL}/api/quiz/progress`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.questions) {
        setQuizQuestions(data.questions);
        setShowQuiz(true);
      } else alert('Quiz generation failed');
    } catch {
      alert('Upload failed');
    }
  };

  const handleOptionSelect = option => {
    if (selected) return;
    setSelected(option);
    const currentQ = quizQuestions[current];
    if (option === currentQ.answer) {
      setScore(s => s + 1);
    }
  };

  const saveResult = async () => {
    const payload = { score, total: quizQuestions.length, date: new Date(), className };
    try {
      await fetch(`${BASE_URL}/api/quiz/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      // refresh history
      const res = await fetch(`${BASE_URL}/api/quiz/progress`);
      const d = await res.json();
      setHistory(d.progress || []);
    } catch (err) {
      console.error('Failed to save result', err);
    }
  };

  const goNext = async () => {
    if (current + 1 < quizQuestions.length) {
      setCurrent(i => i + 1);
      setSelected(null);
    } else {
      await saveResult();
      setShowResult(true);
    }
  };

  const goPrev = () => {
    if (current > 0) {
      setCurrent(i => i - 1);
      setSelected(null);
    }
  };

  const restart = () => {
    setShowQuiz(false);
    setShowResult(false);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setClassName('');
  };

  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-800';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const cardBorder = theme === 'dark' ? 'border-gray-600' : 'border-gray-300';

  // Helper to get letter label
  const getLabel = idx => String.fromCharCode(65 + idx);

  return (
    <div className={`min-h-screen w-full p-6 ${bgColor} ${textColor}`}>
      {!showQuiz && !showResult && (
        <div className={`border p-6 rounded-md ${cardBg} border ${cardBorder}`}>
          <h2 className="text-xl font-bold mb-4">Generate a CBT Quiz</h2>
          <input type="file" accept=".pdf,.docx,.txt" onChange={handleFileChange} />
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleUpload}
          >
            Generate Quiz
          </button>

          {/* History Under Upload */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">My Results</h3>
            {history.length === 0 ? (
              <p>No results yet.</p>
            ) : (
              <ul className="space-y-2">
                {history.map((h, i) => (
                  <li key={i} className="p-3 border rounded">
                    <div><span className="font-semibold">Class:</span> {h.className}</div>
                    <div>{new Date(h.date).toLocaleString()} — {h.score}/{h.total}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {showQuiz && !showResult && (
        <div className={`mt-8 border p-6 rounded-md ${cardBg} border ${cardBorder}`}>          
          {/* Progress Bar */}
          <div className="w-full bg-gray-300 h-2 rounded mb-4">
            <div
              className="h-2 rounded"
              style={{ width: `${((current + 1) / quizQuestions.length) * 100}%`, backgroundColor: '#10B981' }}
            />
          </div>

          <h3 className="text-lg font-semibold mb-2">
            Question {current + 1} of {quizQuestions.length}
          </h3>
          <p className="mb-6 font-medium">{quizQuestions[current].question}</p>
          <div className="space-y-3">
            {quizQuestions[current].options.map((opt, i) => {
              const label = getLabel(i);
              const isCorrect = opt === quizQuestions[current].answer;
              const isSelected = opt === selected;
              let extra = 'border-gray-300 hover:bg-blue-900';
              if (selected) {
                if (isCorrect) extra = 'bg-green-100 border-green-500 text-green-800';
                else if (isSelected) extra = 'bg-red-100 border-red-500 text-red-800';
                else extra = 'opacity-70';
              }

              return (
                <button
                  key={i}
                  disabled={!!selected}
                  className={`flex items-center w-full px-4 py-2 rounded border transition duration-200 ${extra}`}
                  onClick={() => handleOptionSelect(opt)}
                >
                  <span className="font-bold mr-2">{label}.</span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={goPrev}
              disabled={current === 0}
              className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50 hover:bg-gray-700"
            >
              Previous
            </button>
            <button
              onClick={goNext}
              disabled={!selected}
              className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50 hover:bg-green-700"
            >
              {current + 1 === quizQuestions.length ? 'Finish Quiz' : 'Next'}
            </button>
          </div>
        </div>
      )}

      {showResult && (
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-bold">Quiz Complete 🎉</h2>
          <p className="text-lg mt-2">You scored {score} out of {quizQuestions.length}</p>
          <button
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={restart}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Quizze;
