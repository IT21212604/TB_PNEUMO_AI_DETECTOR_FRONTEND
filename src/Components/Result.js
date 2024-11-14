import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import Footer from './Footer';
import './Result.css';
import Navbar from './Navbar';

const Result = () => {
  const location = useLocation();
  const { result, name, age, nic } = location.state || {};

  useEffect(() => {
    console.log('Location State:', location.state);
  }, [location.state]);

  const generatePDF = () => {
    const doc = new jsPDF();

    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.width;
    const pageHeight = pageSize.height;

    // Load watermark image and add to PDF
    const imageSrc = `${process.env.PUBLIC_URL}/home.png`; // Path to the image in the public folder
    // const watermarkText = 'TB PNEUMO AI DETECTOR';

    const addWatermark = (imageBase64) => {
      // Set opacity to make the watermark more subtle
      doc.setGState(new doc.GState({ opacity: 0.2 })); // for very faint watermark
  
      // Add the image with reduced opacity to give it a softer, "blurred" appearance
      doc.addImage(imageBase64, 'PNG', 30, 30, pageWidth - 50, pageHeight - 50); // Adjust position and size as needed
  
      // Reset opacity for the main content
      doc.setGState(new doc.GState({ opacity: 1 }));
      
      // Title and patient details
const title = 'Detection Result';
const fontSizeTitle = 23;
const fontSizeDetail = 15;

// Set title font size and color
doc.setFontSize(fontSizeTitle);
doc.setTextColor(0, 0, 0); // Reset to black color for main text

// Center the title
const titleWidth = (doc.getStringUnitWidth(title) * fontSizeTitle) / doc.internal.scaleFactor;
const titleOffset = (pageWidth - titleWidth) / 2;
doc.text(title, titleOffset, 15);

// Add a border around the PDF
const borderOffset = 7; // Offset from the edges
doc.setDrawColor(0, 0, 0); // Set border color to black
doc.rect(borderOffset, borderOffset, pageWidth - 2 * borderOffset, pageHeight - 2 * borderOffset); // Draw the border

// Prepare patient details
const details = [
    `Patient's Name: ${name || 'N/A'}`,
    `Patient's Age: ${age || 'N/A'}`,
    `Patient's NIC: ${nic || 'N/A'}`,
    `Detection Result: ${result || 'N/A'}`
];

// Set font size for patient details
doc.setFontSize(fontSizeDetail);
let yPosition = 30; // Starting y position for patient details

// Loop through each detail and center-align it
details.forEach(detail => {
    const detailWidth = (doc.getStringUnitWidth(detail) * fontSizeDetail) / doc.internal.scaleFactor; // Calculate width
    const detailOffset = (pageWidth - detailWidth) / 2; // Calculate offset for centering
    doc.text(detail, detailOffset, yPosition); // Draw the centered text
    yPosition += 10; // Move down for the next line
});
      const filename = `detection_result_${nic || 'unknown'}.pdf`;
      doc.save(filename);
    };

    // Fetch the image and convert to base64
    fetch(imageSrc)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = function () {
          addWatermark(reader.result);
        };
        reader.readAsDataURL(blob);
      });
  };

  return (
   
    <div className="result-container">
      
      <div className="result-box">
        <h2>Detection Result</h2>
        <p>
          <strong>Patient's Name:</strong> {name}
        </p>
        <p>
          <strong>Patient's Age:</strong> {age}
        </p>
        <p>
          <strong>Patient's NIC:</strong> {nic}
        </p>
        <p>
          <strong>Detection Result:</strong> {result}
        </p>
       
        <a href='/detector' className="back-link">Back</a>
        <button className="result-button" onClick={generatePDF}>Generate PDF</button>
        
      </div>
      <Navbar/>
      <Footer />
    </div>
    
  );
};

export default Result;
