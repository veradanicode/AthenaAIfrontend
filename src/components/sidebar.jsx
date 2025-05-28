import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64  text-white h-screen p-6 hidden md:block">
      <ul className="space-y-4">
        <li className="hover:text-blue-500 cursor-pointer">Overview</li>
        <li className="hover:text-blue-500 cursor-pointer">Subjects</li>
        <li className="hover:text-blue-500 cursor-pointer">Tasks</li>
        <li className="hover:text-blue-500 cursor-pointer">Calendar</li>
        <li className="hover:text-blue-500 cursor-pointer">Settings</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
