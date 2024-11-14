// src/Register.js
import React, { useState } from 'react';
import './Register.css';
//import Header from './Header'; // Import the Header component
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [nic, setNic] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  // Validation functions
  const validateNIC = (nic) => {
    const nicRegex = /^(?:\d{12}|\d{9}[Vv])$/;
    return nicRegex.test(nic);
  };


  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // At least 8 characters, at least one letter, one number, and one special character
    return passwordRegex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation checks
    if (!validateNIC(nic)) {
      alert('Please enter a valid NIC (12 digits or 9 digits followed by V/v).');
      return;
    }


    if (!validatePassword(password)) {
      alert('Password must be at least 8 characters long and include a mix of letters, numbers, and special characters.');
      return;
    }

    if (password !== reEnterPassword) {
      alert('Passwords do not match');
      return;
    }

    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fullName, nic, email, password }),
    });

    //const data = await response.json();
    //alert(data.message);
    
    //edit by

    const data = await response.json(); // Parse JSON response
  if (response.ok) {
   alert(data.message);
   navigate('/login'); // Navigate on successful response
  }else {
   alert(`Error: ${data.message}`);
  };
   // end edit

  };


  return (
    <div>
      
      <div className="register-page">
      
      
      <div className="register-container">
        <div className="register-box">
          <h2>Admin Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-groupregister">
              <label>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="input-groupregister">
              <label>NIC</label>
              <input
                type="text"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
                required
              />
            </div>
            <div className="input-groupregister">
              <label>Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-groupregister">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-groupregister">
              <label>Re-enter Password</label>
              <input
                type="password"
                value={reEnterPassword}
                onChange={(e) => setReEnterPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="agree-terms">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
                required
              />
              <label htmlFor="agreeTerms" className='agree'>
                I agree to the terms and conditions.
              </label>
            </div>
          
            <button type="submit" className="register-button">
              REGISTER
            </button>
          </form>
          <p className='agree'>
            Already have an account? <a href="/login">Log In</a>
          </p>
          <a href='/profile'>Back</a>
        </div>
      </div>
      <Footer/>
      </div>
    </div>
    
    
  );
};

export default Register;
