import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PasswordReset.css';
import Footer from './Footer';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');  // State for userType
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    const payload = { email, currentPassword, newPassword, userType };
    console.log("Sending payload:", payload);  // Log payload for debugging
  
    try {
      const response = await fetch('http://localhost:5000/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An error occurred');
      }
  
      const data = await response.json();
      alert(data.message);
      navigate('/login'); // Redirect to login after reset
  
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to reset password. Please check your network connection and try again.");
    }
  };

  return (
    <div className='password-reset-page'>
      <div className="password-reset-container">
        <div className="password-reset-box">
          <h2>Password Reset</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group1">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-group1">
              <label>Current Password</label>
              <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
            </div>
            <div className="input-group1">
              <label>New Password</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            </div>
            <div className="input-group1">
              <label>Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <div className="input-group1">
              <label>User Type</label>
              <select value={userType} onChange={(e) => setUserType(e.target.value)} required>
                <option value="">Select Type</option>
                <option value="user">User</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
            <button type="submit" className="submit-button">Change Password</button>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default PasswordReset;
