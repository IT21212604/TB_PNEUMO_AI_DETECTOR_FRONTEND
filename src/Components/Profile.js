import React, { useEffect, useState } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';

import Footer from './Footer';
import Navbar from './Navbar';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    setUserDetails(userDetails);
  }, []);

  const handleRegisterDoctor = () => {
    navigate('/create-profile');
  };
  
  const handleRegisterAdmin = () => {
    navigate('/register');
  };

  const handleDetector = () => {
    navigate('/detector');
  };

  
  const handleDetails = () => {
    navigate('/allpatientdetails');
  };
  
  

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <Navbar />

      <div className="profile-container-single">
        <div className="profile-box">
          <div className="profile-content">
            {/* Profile Details Section */}
            <div className="profile-details-section">
              <h2>{userDetails.fullName} - Profile Information</h2>
              
              <table className="profile-details">
                <tbody>
                  <tr>
                    <td><strong>Name</strong></td>
                    <td>{userDetails.fullName}</td>
                  </tr>
                  <tr>
                    <td><strong>Email</strong></td>
                    <td>{userDetails.email}</td>
                  </tr>
                  <tr>
                    <td><strong>User Type</strong></td>
                    <td>{userDetails.userType}</td>
                  </tr>

                  {userDetails.userType === 'doctor' && (
                    <>
                      <tr>
                        <td><strong>Medical License Number</strong></td>
                        <td>{userDetails.medicalLicenseNumber}</td>
                      </tr>
                      <tr>
                        <td><strong>Specialization</strong></td>
                        <td>{userDetails.specialization}</td>
                      </tr>
                      <tr>
                        <td><strong>Years of Experience</strong></td>
                        <td>{userDetails.yearsOfExperience}</td>
                      </tr>
                      <tr>
                        <td><strong>Hospital Name</strong></td>
                        <td>{userDetails.hospitalName}</td>
                      </tr>
                      <tr>
                        <td><strong>Department</strong></td>
                        <td>{userDetails.department}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
              
              <div className="action-button-box">
                {userDetails.userType === 'user' ? (
                  <>
                    <p>Add new Doctors and New Admin Here.</p>
                    <button onClick={handleRegisterDoctor} className="action-button">Enroll Doctor</button>
                    <button onClick={handleRegisterAdmin} className="action-button">Enroll Admin</button>
                  </>
                ) : (
                  <>
                  <button onClick={handleDetector} className="action-button">Detector</button>
                  {userDetails.userType === 'doctor' && (
                    <button onClick={handleDetails} className="action-button2">View Patient Details</button>
                  )}
                  
                  </>
                  
                )}
              </div>
            </div>

            {/* Background Image Section */}
            <div className="profile-background-image"></div>
            
                  
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
