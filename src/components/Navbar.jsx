import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const activeLinkStyle = {
    color: '#3b82f6',
  };

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <span className="font-bold text-xl text-white">URL Shortener</span>
          </div>
          <div className="flex items-center space-x-4 text-gray-300">
            <NavLink to="/" className="hover:text-blue-400 transition" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
              Home
            </NavLink>
            <NavLink to="/statistics" className="hover:text-blue-400 transition" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
              Statistics
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;