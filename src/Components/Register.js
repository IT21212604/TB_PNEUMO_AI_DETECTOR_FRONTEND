
// src/Register.js
import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [nic, setNic] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== reEnterPassword) {
      alert('Passwords do not match');
      return;
    }

    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fullName, nic, username, password })
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>NIC</label>
            <input type="text" value={nic} onChange={(e) => setNic(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>User Name</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Re-enter Password</label>
            <input type="password" value={reEnterPassword} onChange={(e) => setReEnterPassword(e.target.value)} required />
          </div>
          <div className="agree-terms">
            <input type="checkbox" id="agreeTerms" checked={agreed} onChange={() => setAgreed(!agreed)} required />
            <label htmlFor="agreeTerms">I agree to the terms and conditions.</label>
          </div>
          <button type="submit" className="register-button">REGISTER</button>
        </form>
        <p>Already have an account? <a href="/login">Log In</a></p>
      </div>
    </div>
  );
};

export default Register;
