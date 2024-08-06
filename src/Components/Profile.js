
import React, { useEffect, useState } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';

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

  const handleDetector = () => {
    navigate('/detector');
  };

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h2>User Profile</h2>
        <div className="profile-details">
          <p><strong>Full Name:</strong> {userDetails.fullName}</p>
          <p><strong>NIC:</strong> {userDetails.nic}</p>
          <p><strong>Username:</strong> {userDetails.username}</p>
          <p><strong>User Type:</strong> {userDetails.userType}</p>
          {userDetails.userType === 'doctor' && (
            <>
              <p><strong>Medical License Number:</strong> {userDetails.medicalLicenseNumber}</p>
              <p><strong>Specialization:</strong> {userDetails.specialization}</p>
              <p><strong>Years of Experience:</strong> {userDetails.yearsOfExperience}</p>
              <p><strong>Hospital Name:</strong> {userDetails.hospitalName}</p>
              <p><strong>Department:</strong> {userDetails.department}</p>
            </>
          )}
        </div>
        {userDetails.userType === 'user' ? (
          <button onClick={handleRegisterDoctor} className="action-button">Register Doctor</button>
        ) : (
          <button onClick={handleDetector} className="action-button">Detector</button>
        )}
      </div>
    </div>
  );
};

export default Profile;


