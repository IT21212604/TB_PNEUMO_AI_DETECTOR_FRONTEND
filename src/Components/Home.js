import React from 'react';
import './Home.css';  // Import the CSS file
import Footer from './Footer';



const Home = () => {
  return (
    
      
    <div className="home-container">
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="container">
        <h1 className="title1">Welcome to TB PNEUMO AI Detector</h1>
        <p className="description">
          This tool uses AI to detect Tuberculosis and Pneumonia from chest X-rays. 
          Please login to test.
        </p>

        <div className="features">
          <a href="/Login" className="feature-card">
            <h2>Login</h2>
            <p>Upload X-ray images to get AI-based detection results.</p>
          </a>
          
         
        </div>
        <a href="/Contact" className="feature-card2">
            <h3>Help Center</h3>
            
          </a>
      </div>
      <Footer/>
    </div>
    
  );
};

export default Home;
