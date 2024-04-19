import React from 'react';

function Navbar({ onHomeClick, onOptionClick, userRole, activePage }) {
  // Helper function to determine button styles based on user role and active page
  const buttonClass = (page) => {
    let baseClasses = "px-4 py-2 rounded transition-colors";
    if (activePage === page) {
      // Highlight the active page
      return `${baseClasses} bg-white text-gray-800 font-semibold`;
    } else if (userRole !== page) {
      // Dim buttons for inaccessible pages
      return `${baseClasses} opacity-50 cursor-not-allowed bg-gray-600`;
    }
    // Default style for accessible pages
    return `${baseClasses} hover:bg-white hover:text-gray-800 bg-gray-700`;
  };

  return (
    <nav className="bg-gray-800 p-4 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button onClick={onHomeClick} className="hover:bg-gray-700 p-2 rounded">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 22V12h6v10"></path></svg>
          </button>
          <h1 onClick={onHomeClick} className="text-xl font-bold cursor-pointer">Surgical Coordination Protocol</h1>
        </div>
        <div className="flex space-x-4">
          <button
            className={buttonClass('doctor')}
            onClick={() => onOptionClick('doctor')}
            disabled={userRole !== 'doctor'}
          >
            Doctor
          </button>
          <button
            className={buttonClass('anesthetist')}
            onClick={() => onOptionClick('anesthetist')}
            disabled={userRole !== 'anesthetist'}
          >
            Anesthetist
          </button>
          <button
            className={buttonClass('nurse')}
            onClick={() => onOptionClick('nurse')}
            disabled={userRole !== 'nurse'}
          >
            Nurse
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
