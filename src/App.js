
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import './App.css';
import Detector from './Components/Detector';
import PasswordReset from './Components/PasswordReset';
import Profile from './Components/Profile';
import DoctorProfile from './Components/DoctorProfile';
import Home from './Components/Home'; // Assuming Home.js contains your Home page
import Contact from './Components/Contact';
import Result from './Components/Result';
import AllPatientDetails from './Components/AllPatientDetails';
import AllDoctorDetails from './Components/AllDoctorDetails';
import AllUserDetails from './Components/AllUserDetails';


//import Header from './Components/Header'<Header/>
      
//import Footer from './Components/Footer'<Navbar/><Footer/>;
//import Navbar from './Components/Navbar'; // Import the Navbar component



function App() {
  const handleHomeClick = () =>{
    window.location.href = '/';
  };

  return (
    <div>
   <button className='logo-button' onClick={handleHomeClick}>
    <img src='./home.png' alt='home' className='logo'></img>
  
   </button>
  
    <Router>
    
    
      <Routes>
   
          <Route path="/" element={<Home />} />
        
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/detector" element={<Detector/>}/>
          <Route path="/passwordReset" element={<PasswordReset/>}/>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/create-profile" element={<DoctorProfile/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/result' element={<Result/>}/>
          <Route path='/allpatientdetails' element={<AllPatientDetails/>}/>
          <Route path='/alldoctordetails' element={<AllDoctorDetails/>}/>
          <Route path='/alluserdetails' element={<AllUserDetails/>}/>
          
          {/* <Route path="/" component={Login} /> <Route path="/header" element={<Header />} />
          <Route path="/footer" element={<Footer />} />*/}
        </Routes>
    
     
    </Router>
    </div>
     
  );
}

export default App;
