import React, { useState } from 'react';
import Navbar from './Navbar';
import DoctorForm from './DoctorForm';
import AnesthetistForm from './AnesthetistForm';
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
    </div>
  );
}

export default App;