// src/components/LandingNavbar.jsx
import React from 'react';
import { cn } from '@/lib/utils';

const LandingNavbar = () => {
  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo Area */}
        <a href="/" className="flex items-center font-semibold text-lg text-gray-800">
          {/*actual logo component  */}
          <div className="w-6 h-6 mr-2 rounded-sm ">
            <img src="./img/owlet.png" alt="owlet.png" />
          </div>
          ATHENA
        </a>

        {/* Navigation Links */}
<div className="flex items-center space-x-6">
  <a
    href="/dashboard"
    className="text-gray-900 hover:text-indigo-500 transition duration-200 hover:underline underline-offset-4 decoration-blue-500"
  >
    Dashboard
  </a>
  <a
    href="/courses"
    className="text-gray-900 hover:text-indigo-500 transition duration-200 hover:underline underline-offset-4 decoration-blue-500"
  >
    Our Courses
  </a>
  <a
    href="/about"
    className="text-gray-900 hover:text-indigo-500 transition duration-200 hover:underline underline-offset-4 decoration-blue-500"
  >
    About Us
  </a>
  <a
    href="/contact"
    className="text-gray-900 hover:text-indigo-500 transition duration-200 hover:underline underline-offset-4 decoration-blue-500"
  >
    Contact
  </a>
</div>


        {/* Call to Action Buttons */}
        <div className="flex items-center space-x-4">
          <a
            href="/signup"
            className="px-4 py-2 border border-indigo-500 text-indigo-500 rounded-md hover:bg-indigo-50 focus:outline-none focus-ring-2 focus-ring-indigo-500 transition duration-200"
          >
            Sign Up
          </a>
          <a
            href="/get-started"
            className="px-4 py-2 bg-indigo-500 text-white rounded-md shadow-md hover:bg-indigo-600 focus:outline-none focus-ring-2 focus-ring-indigo-500 transition duration-200"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Menu Button (you'll need to add state and logic for this) */}
        <div className="md:hidden">
          <button className="text-gray-600 hover:text-indigo-500 focus:outline-none focus-ring-2 focus-ring-indigo-500">
            {/* Hamburger Icon (you can use a library like Heroicons) */}
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

    
    </nav>
  );
};

export default LandingNavbar;