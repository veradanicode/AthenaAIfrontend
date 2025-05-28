import React, { useEffect, useState, useRef, useContext } from 'react';
import {
    BellIcon,
    MagnifyingGlassIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { ThemeContext } from '../components/ThemeContext';

const Navbar = () => {
    const [showNav, setShowNav] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const searchRef = useRef(null);
    const profileRef = useRef(null);
    const location = useLocation();
    const { theme } = useContext(ThemeContext);

    const navItems = [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Video Analysis', path: '/videoanalysis' },
        { label: 'Quizze', path: '/quizze' },
        { label: 'Smart Notes', path: '/smartnotes' },
        { label: 'Smart Search', path: '/smartsearch' },
        { label: 'Smart Assistant', path: '/smartassistant' },
        { label: 'Audiofy', path: '/audiofy' },
    ];

    useEffect(() => {
        setTimeout(() => setShowNav(true), 100);
    }, []);

    // Close search or profile when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearch(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfile(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navbarBg = theme === 'dark' ? 'bg-black' : 'bg-gray-100';
    const navbarBorder = theme === 'dark' ? 'border-gray-800' : 'border-gray-200';
    const activeTextColor = 'text-blue-500';
    const hoverTextColor = 'hover:text-blue-400';
    const iconColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
    const iconHoverColor = 'hover:text-blue-600';

    return (
        <nav
            className={`sticky top-0 z-50 px-6 py-4 shadow-md border-b flex items-center justify-between transform transition-all duration-700 ease-in-out ${navbarBg} ${navbarBorder} ${
                showNav ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
            }`}
        >
            {/* Logo */}
            <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-blue-600">Athena</span>
                <img src="/img/owlet.png" alt="owl logo" className="h-10 w-auto" />
            </div>

            {/* Navigation Links */}
            <ul className="flex space-x-3">
                {navItems.map((item) => (
                    <li key={item.path}>
                        <Link
                            to={item.path}
                            className={`transition px-3 py-2 rounded-md ${
                                location.pathname === item.path
                                    ? `${activeTextColor} font-bold`
                                    : 'text-gray-400'
                            } ${hoverTextColor}`}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
                {/* Search */}
                <div ref={searchRef} className="relative flex items-center">
                    <MagnifyingGlassIcon
                        className={`h-6 w-6 cursor-pointer ${iconColor} ${iconHoverColor}`}
                        onClick={() => setShowSearch(true)}
                    />
                    <div
                        className={`ml-2 transition-all duration-300 ease-in-out transform origin-left ${
                            showSearch ? 'scale-x-100 opacity-100 w-48' : 'scale-x-0 opacity-0 w-0'
                        }`}
                    >
                        <input
                            type="text"
                            placeholder="Search..."
                            className={`w-full px-3 py-1 rounded-md border text-sm shadow-sm focus:outline-none transition-colors ${
                                theme === 'dark'
                                    ? 'bg-gray-800 text-white border-gray-700'
                                    : 'bg-white text-gray-900 border-gray-300'
                            }`}
                        />
                    </div>
                </div>

                {/* Notifications */}
                <BellIcon
                    className={`h-6 w-6 cursor-pointer ${iconColor} ${iconHoverColor}`}
                />

                {/* Profile Section */}
                <div ref={profileRef} className="relative">
                    <UserCircleIcon
                        className={`h-8 w-8 cursor-pointer ${iconColor} ${iconHoverColor}`}
                        onClick={() => setShowProfile((prev) => !prev)}
                    />

                    {showProfile && (
                        <div
                            className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50 transition duration-300 ${
                                theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                            }`}
                        >
                            <ul className="py-2 text-sm">
                                <li className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer">
                                    <Link to="/profile">My Profile</Link>
                                </li>
                                <li className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer">
                                    <Link to="/educational-settings">Educational Settings</Link>
                                </li>
                                <li className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer">
                                    <button onClick={() => alert('Logging out...')}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Theme Toggle */}
                <ThemeToggle />
            </div>
        </nav>
    );
};

export default Navbar;
