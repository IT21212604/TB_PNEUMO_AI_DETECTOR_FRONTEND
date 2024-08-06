// src/Detector.js
import React, { useState } from 'react';
import './Detector.css';

const Detector = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [xray, setXray] = useState(null);

  const handleXrayChange = (event) => {
    setXray(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    formData.append('xray', xray);

    const response = await fetch('http://localhost:5000/detect', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    alert(`Detection Result: ${data.result}`);
  };

  return (
    <div className="detector-container">
      <div className="detector-box">
        <h2>TB PNEUMO AI DETECTOR</h2>
        <p>Welcome to our AI-powered Respiratory Disease Diagnostic Tool. We combine advanced technology with medical expertise to support faster, more accurate diagnoses.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Patient's Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Patient's Age</label>
            <input type="text" value={age} onChange={(e) => setAge(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Patient's Xray</label>
            <input type="file" onChange={handleXrayChange} required />
          </div>
          <button type="submit" className="result-button">Result</button>
        </form>
      </div>
    </div>
  );
};

export default Detector;
