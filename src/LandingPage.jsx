// LandingPage.js
import React, { useState } from 'react';

function LandingPage({ onLogin }) {
  const [showModal, setShowModal] = useState(false);
  const [role, setRole] = useState('');
  const [passKey, setPassKey] = useState('');

  const handleSignIn = (selectedRole) => {
    setRole(selectedRole);
    setShowModal(true);
  };

  const handleLogin = () => {
    onLogin(role, passKey);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Welcome to the Surgical Coordination Protocol</h1>
      <div className="space-x-4">
        <button
          onClick={() => handleSignIn('doctor')}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Sign in as Doctor
        </button>
        <button
          onClick={() => handleSignIn('super')}
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
        >
          Sign in as 
        </button>
      </div>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="font-semibold text-xl mb-4">Enter Pass Key for {role}</h2>
            <input
              type="password"
              placeholder="Enter pass key"
              className="border border-gray-300 p-2 rounded w-full"
              value={passKey}
              onChange={(e) => setPassKey(e.target.value)}
            />
            <div className="mt-4 flex justify-between space-x-4">
              <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Login
              </button>
              <button onClick={() => setShowModal(false)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
