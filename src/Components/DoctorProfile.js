import React, { useState } from 'react';
import './DoctorProfile.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

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
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    userType: 'doctor'
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    // Basic email validation pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    if (!validatePassword(formData.password)) {
      alert('Password must be at least 8 characters long and include a mix of letters, numbers, and special characters.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      alert(data.message);
      navigate('/profile')
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="profile-container">
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2 className='h2'>Doctor Registration</h2>
        <hr/>
        <div className="form-section">
          <h3 className="info">Basic Information</h3>
          <div className='form-group'>
            <label>First Name</label> 
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
          </div>  
          <div className='form-group'>
            <label>Last Name</label>
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required /> 
          </div>
          <div className='form-group'>
            <label>Middle Name</label>
            <input type="text" name="middleName" placeholder="Middle Name" value={formData.middleName} onChange={handleChange} />
          </div>
          <div className='form-group'>
            <label>Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
          </div>
          <div className='form-group'>
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Choose your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        
        <div className="form-section">
          <h3 className="info">Professional Information</h3>
          <div className='form-group'>
            <label>Medical ID</label>
            <input type="text" name="medicalLicenseNumber" placeholder="Medical License Number" value={formData.medicalLicenseNumber} onChange={handleChange} required />
          </div>
          <div className='form-group'>
            <label>Specialization</label>
            <input type="text" name="specialization" placeholder="Specialization" value={formData.specialization} onChange={handleChange} required />
          </div>
          <div className='form-group'>
            <label>Years of Experience</label>
            <input type="number" name="yearsOfExperience" placeholder="Years of Experience" value={formData.yearsOfExperience} onChange={handleChange} required />
          </div>
          <div className='form-group'>
            <label>Hospital</label>
            <input type="text" name="hospitalName" placeholder="Hospital/Clinic Name" value={formData.hospitalName} onChange={handleChange} required />
          </div>
          <div className='form-group'>
            <label>Department</label>
            <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-section">
          <h3 className="info">Account Information</h3>
          <div className='form-group'>
            <label>Email</label>
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          </div>
          <div className='form-group'>
            <label>Phone Number</label>
            <input type="tel" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className='form-group'>
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
          </div>
          <p>Your password must be at least 8 characters long and include a mix of letters, numbers, and special characters.</p>
        </div>
        
        <div className="form-buttons">
          <a href='/profile'>Back</a>
          <button type="submit">Submit</button>
        </div>
      </form>
      <Navbar />
      <Footer />
    </div>
  );
};

export default DoctorProfile;
