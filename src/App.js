
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import './App.css';
import Detector from './Components/Detector';
import PasswordReset from './Components/PasswordReset';
import Profile from './Components/Profile';
import DoctorProfile from './Components/DoctorProfile';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/detector" element={<Detector/>}/>
          <Route path="/passwordReset" element={<PasswordReset/>}/>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/create-profile" element={<DoctorProfile/>}/>
          {/* <Route path="/" component={Login} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
