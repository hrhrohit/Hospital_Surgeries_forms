// App.js
import React, { useState } from 'react';
import Navbar from './Navbar';
import DoctorForm from './DoctorForm';
import AnesthetistForm from './AnesthetistForm';
import NurseForm from './NurseForm';
import LandingPage from './LandingPage';
import { fetchPassKeys } from '../firebaseConfig';

function App() {
  const [userRole, setUserRole] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState('');

  const handleLogin = async (role, passKey) => {
    try {
      const keys = await fetchPassKeys();
      if ((role === 'doctor' && passKey === keys.doctorPass) || (role === 'super' && passKey === keys.superPass)) {
        setIsAuthenticated(true);
        setUserRole(role);
        setActivePage(role === 'super' ? 'anesthetist' : ''); // Default page for super
      } else {
        alert('Incorrect Pass Key');
      }
    } catch (error) {
      alert('Failed to fetch pass keys');
    }
  };

  const handleOptionClick = (option) => {
    setActivePage(option); // Update the active page
  };

  const handleHomeClick = () => {
    setIsAuthenticated(false);
    setUserRole('');
    setActivePage('');
  };

  return (
    <div className="container mx-auto px-4">
      {!isAuthenticated ? (
        <LandingPage onLogin={handleLogin} />
      ) : (
        <>
          <Navbar onHomeClick={handleHomeClick} onOptionClick={handleOptionClick} userRole={userRole} activePage={activePage} />
          {userRole === 'doctor' && <DoctorForm />}
          {userRole === 'super' && activePage === 'anesthetist' && <AnesthetistForm />}
          {userRole === 'super' && activePage === 'nurse' && <NurseForm />}
        </>
      )}
    </div>
  );
}

export default App;
