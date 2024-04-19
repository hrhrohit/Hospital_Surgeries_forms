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
      const keys = await fetchPassKeys();  // Make sure fetchPassKeys can handle all roles correctly
      if ((role === 'doctor' && passKey === keys.doctorPass) ||
          (role === 'anesthetist' && passKey === keys.AnesthPass) ||
          (role === 'nurse' && passKey === keys.nursePass)) {
        setIsAuthenticated(true);
        setUserRole(role);
        setActivePage(role);  // Set the default active page based on the role
      } else {
        alert('Incorrect Pass Key');
      }
    } catch (error) {
      alert('Failed to fetch pass keys');
    }
  };

  const handleOptionClick = (option) => {
    if (userRole === option) {
      setActivePage(option); // Update the active page if the user has access
    } else {
      alert('Access Denied');
    }
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
          {userRole === 'doctor' && activePage === 'doctor' && <DoctorForm />}
          {userRole === 'anesthetist' && activePage === 'anesthetist' && <AnesthetistForm />}
          {userRole === 'nurse' && activePage === 'nurse' && <NurseForm />}
        </>
      )}
    </div>
  );
}

export default App;
