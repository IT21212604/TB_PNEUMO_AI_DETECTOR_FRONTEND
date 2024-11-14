import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './AllPatientDetails.css';
import Footer from './Footer';
import Navbar from './Navbar';


const AllPatientDetails = () => {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [searchNIC, setSearchNIC] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch patient records from the backend
    const fetchPatientRecords = async () => {
        try {
            const response = await axios.get('http://localhost:5000/results');
            setPatients(response.data);
            setFilteredPatients(response.data); // Set filtered patients initially to all patients
        } catch (error) {
            console.error('Error fetching patient records:', error);
            setError('Could not fetch patient records. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatientRecords();
    }, []);

    const handleSearch = () => {
        // Filter patients based on NIC number
        const filtered = patients.filter(patient => 
            patient.patient_nic && patient.patient_nic.includes(searchNIC)
        );
        setFilteredPatients(filtered);
    };

    const generatePDF = (patient) => {
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
    
        // Center the title
        const titleWidth = doc.getStringUnitWidth(title) * fontSizeTitle / doc.internal.scaleFactor;
        const titleOffset = (pageWidth - titleWidth) / 2;
    
        doc.setFontSize(fontSizeTitle);
        doc.setTextColor(0, 0, 0); // Reset to black color for main text
        doc.text(title, titleOffset, 15);
    
        // Add a border around the PDF
        const borderOffset = 7; // Offset from the edges
        doc.setDrawColor(0, 0, 0); // Set border color to black
        doc.rect(borderOffset, borderOffset, pageWidth - 2 * borderOffset, pageHeight - 2 * borderOffset); // Draw the border
        // Prepare patient details
        const details = [
            `Patient's Name: ${patient.patient_name || 'N/A'}`,
            `Patient's Age: ${patient.patient_age || 'N/A'}`,
            `Patient's NIC: ${patient.patient_nic || 'N/A'}`,
            `Detection Result: ${patient.predicted_class || 'N/A'}`
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
    
        // Save PDF with NIC in the filename if available
        const filename = `detection_result_${patient.patient_nic || 'unknown'}.pdf`;
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        
        <div className='patient'>
             <Navbar /> 
            <div className="all-patient-details-container">
            <h2>All Patient Details</h2>
            
            {/* Search bar for NIC */}
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Search by NIC" 
                    value={searchNIC} 
                    onChange={(e) => setSearchNIC(e.target.value)} 
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-btn">Search</button>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Patient Name</th>
                        <th>Patient Age</th>
                        <th>NIC</th>
                        <th>Predicted Class</th>
                        <th>Timestamp</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPatients.map((patient) => (
                        <tr key={patient._id}>
                            <td>{patient.patient_name}</td>
                            <td>{patient.patient_age}</td>
                            <td>{patient.patient_nic}</td>
                            <td>{patient.predicted_class}</td>
                            <td>{new Date(patient.timestamp).toLocaleString()}</td>
                            <td>
                                <button onClick={() => generatePDF(patient)} className="download-btn">
                                    Download PDF
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
           
            <Footer />
        </div>
    );
};

export default AllPatientDetails;
