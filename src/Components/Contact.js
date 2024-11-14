import React from 'react';
import './Contact.css'
import Footer from './Footer';

function Contact() {
  return (
    <div className='contact-page'>
      <div className='half-page right-side'>
        <div className='demo-text'>
          <strong>See what AI detector can do..Watch the video</strong>
        </div>
        <iframe 
          title='youtube' 
          width="560" 
          height="315" 
          src="https://www.youtube.com/embed/tgbNymZ7vqY?controls=0">
        </iframe>
      </div>
      
      <div className='half-page left-side'>
        <div className='demo-introduction'>
          
        
          <strong className='topic'>TB Pneumo AI Detector</strong> is an innovative, AI-powered diagnostic tool designed to assist healthcare professionals in the early detection of tuberculosis and pneumonia.
          Leveraging advanced deep learning algorithms, our system accurately identifies potential indicators of these conditions, providing fast, reliable insights that support early intervention and treatment.
        
        </div>
        <br></br>
        <br></br>
        <div className='contactdetails'>
        <dl>
        <dt><center>Email : <a href="https://mail.google.com/" >brainsalad@gmail.com</a></center></dt>
        <br></br>
        <dt><center>Phone : 077 777 77 77</center></dt>
        </dl>
        
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Contact;
