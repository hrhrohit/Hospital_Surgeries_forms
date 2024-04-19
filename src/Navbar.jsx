// Navbar.js
import React from 'react';

function Navbar({ onHomeClick, onOptionClick, userRole, activePage }) {
  return (
    <nav className="bg-gray-800 p-4 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button onClick={onHomeClick} className="hover:bg-gray-700 p-2 rounded">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 22V12h6v10"></path></svg>          </button>
          <h1 onClick={onHomeClick} className="text-xl font-bold cursor-pointer">Surgical Coordination Protocol</h1>
        </div>
        <div className="flex space-x-4">
          {userRole === 'doctor' && (
            <button
              className="px-4 py-2 rounded hover:bg-white hover:text-gray-800 transition-colors"
              onClick={() => onOptionClick('doctor')}
            >
              Doctor
            </button>
          )}
          {userRole === 'super' && (
            <>
              <button
                className={`px-4 py-2 rounded hover:bg-white hover:text-gray-800 transition-colors ${activePage === 'anesthetist' ? 'bg-white text-gray-800' : ''}`}
                onClick={() => onOptionClick('anesthetist')}
              >
                Anesthetist
              </button>
              <button
                className={`px-4 py-2 rounded hover:bg-white hover:text-gray-800 transition-colors ${activePage === 'nurse' ? 'bg-white text-gray-800' : ''}`}
                onClick={() => onOptionClick('nurse')}
              >
                Nurse
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
