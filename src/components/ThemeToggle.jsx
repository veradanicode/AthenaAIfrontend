// components/ThemeToggle.js
import React, { useContext } from 'react';
import { ThemeContext } from '../components/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'; // Or solid

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="focus:outline-none"
    >
      {theme === 'dark' ? (
        <SunIcon className="w-6 h-6 text-yellow-400" />
      ) : (
        <MoonIcon className="w-6 h-6 text-gray-700" />
      )}
    </button>
  );
};

export default ThemeToggle;