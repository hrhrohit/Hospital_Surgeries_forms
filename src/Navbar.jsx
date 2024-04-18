import React from 'react';

function Navbar({ onOptionClick }) {
  return (
    <nav className="bg-gray-800 text-white flex justify-between p-4">
      <h1 className="text-xl font-bold">Surgical Coordination Protocol</h1>
      <div className="flex space-x-4">
        <button
          className="btn btn-primary"
          onClick={() => onOptionClick('doctor')}
        >
          Doctor
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => onOptionClick('anesthetist')}
        >
          Anesthetist
        </button>
        <button
          className="btn btn-info" // Use a different button style if desired
          onClick={() => onOptionClick('nurse')}
        >
          Nurse
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
