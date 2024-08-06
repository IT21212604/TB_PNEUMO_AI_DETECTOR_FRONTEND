
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user'); // default to 'user'
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, userType })
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message);
      localStorage.setItem('userDetails', JSON.stringify(data.user));
      navigate('/profile');
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>User Name</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>User Type</label>
            <select value={userType} onChange={(e) => setUserType(e.target.value)} required>
              <option value="user">User</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
          <button type="submit" className="login-button">LOGIN</button>
        </form>
        <div className="forgot-password-container">
          <button 
            className="forgot-password-button" 
            onClick={() => navigate('/passwordReset')}
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
