

import React, { useState } from 'react';
import './DoctorProfile.css';

const DoctorProfile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    dob: '',
    gender: '',
    medicalLicenseNumber: '',
    specialization: '',
    yearsOfExperience: '',
    hospitalName: '',
    department: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    userType: 'doctor' // Adding userType field with default value 'doctor'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="profile-container">
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2>Create Doctor Profile</h2>
        <div className="form-section">
          <h3>Basic Information</h3>
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
          <input type="text" name="middleName" placeholder="Middle Name" value={formData.middleName} onChange={handleChange} />
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Choose your gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-section">
          <h3>Professional Information</h3>
          <input type="text" name="medicalLicenseNumber" placeholder="Medical License Number" value={formData.medicalLicenseNumber} onChange={handleChange} required />
          <input type="text" name="specialization" placeholder="Specialization" value={formData.specialization} onChange={handleChange} required />
          <input type="number" name="yearsOfExperience" placeholder="Years of Experience" value={formData.yearsOfExperience} onChange={handleChange} required />
          <input type="text" name="hospitalName" placeholder="Hospital/Clinic Name" value={formData.hospitalName} onChange={handleChange} required />
          <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
        </div>
        <div className="form-section">
          <h3>Account Information</h3>
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          <input type="tel" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
          <p>Your password must be at least 8 characters long and include a mix of letters, numbers, and special characters.</p>
        </div>
        <div className="form-buttons">
          <button type="button">Back</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default DoctorProfile;

