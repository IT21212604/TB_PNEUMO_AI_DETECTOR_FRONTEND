// src/PasswordReset.js
import React, { useState } from 'react';
import './PasswordReset.css';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetch('http://localhost:5000/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newPassword })
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="password-reset-container">
      <div className="password-reset-box">
        <h2>Password Reset</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {/* <div className="password-requirements">
            <p>Your password must be at least 8 characters long.</p>
            <p>Include at least one uppercase letter (A-Z).</p>
            <p>Include at least one lowercase letter (a-z).</p>
            <p>Include at least one number (0-9).</p>
            <p>Include at least one special character (e.g., !@#$%^&*).</p>
          </div> */}
          <div className="button-group">
            <button type="button" className="cancel-button">Cancel</button>
            <button type="submit" className="submit-button">Change Password</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
