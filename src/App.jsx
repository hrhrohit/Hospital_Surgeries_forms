import React, { useState } from 'react';
import Navbar from './Navbar';
import DoctorForm from './DoctorForm';
import AnesthetistForm from './AnesthetistForm';
import NurseForm from './NurseForm';
function App() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="container mx-auto px-4">
      <Navbar onOptionClick={handleOptionClick} />
      {selectedOption === 'doctor' && <DoctorForm />}
      {selectedOption === 'anesthetist' && <AnesthetistForm />}   
      {selectedOption === 'nurse' && <NurseForm />}   
    </div>
  );
}

export default App;