import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from './components/nav.jsx';
import Dashboard from './pages/dashboard.jsx';
import VideoAnalysis from "./pages/videoanalysis.jsx";
import Quizze from "./pages/quizze.jsx";
import SmartSearch from "./pages/smartsearch.jsx";
import SmartNotes from "./pages/smartnote.jsx";
import SmartAssistant from "./pages/smartassistant.jsx";
import Audiofy from "./pages/audiofy.jsx";
import LandingPage from "./pages/landingpage.jsx";
import Login from "./pages/login.jsx";         // <-- create this
import Signup from "./pages/signup.jsx";       // <-- create this

import { ThemeProvider } from './components/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/videoanalysis" element={<VideoAnalysis />} />
                <Route path="/quizze" element={<Quizze />} />
                <Route path="/smartnotes" element={<SmartNotes />} />
                <Route path="/smartsearch" element={<SmartSearch />} />
                <Route path="/smartassistant" element={<SmartAssistant />} />
                <Route path="/audiofy" element={<Audiofy />} />
                {/* Default redirect if route not found */}
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </>
          }
        />

      </Routes>
    </ThemeProvider>
  );
}

export default App;
