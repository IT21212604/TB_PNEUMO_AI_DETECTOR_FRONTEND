import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Detector.css';
import Footer from './Footer';
import Navbar from './Navbar';

const Detector = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [nic, setNic] = useState(''); // New state for NIC
  const [xray, setXray] = useState(null);
  const navigate = useNavigate();

  const handleXrayChange = (event) => {
    setXray(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    formData.append('nic', nic); // Append NIC to FormData
    formData.append('file', xray); // Use 'file' to match the Flask backend

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      // Check if response is ok (status 200-299)
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const data = await response.json();
      navigate('/result', { state: { result: data.predicted_class, name, age, nic } });
    } catch (error) {
      console.error('Error:', error);
      // Optionally, you can show an error message to the user
    }
  };

  return (
    
    <div className="detector-container">
      <div className="detector-box">
        <h2>TB PNEUMO AI DETECTOR</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group1">
            <label>Patient's Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group1">
            <label>Patient's Age</label>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="input-group1">
            <label>Patient's NIC</label> {/* New label for NIC */}
            <input
              type="text"
              value={nic}
              onChange={(e) => setNic(e.target.value)} // Handle NIC input
              required
            />
          </div>
          <div className="input-group1">
            <label>Patient's X-ray</label>
            <input type="file" onChange={handleXrayChange} required />
          </div>
         
          <button type="submit" className="result-button1">
            Get Result
          </button>
        </form>
      </div>
      <Navbar/>
      <Footer/>
    </div>
  );
};

export default Detector;