import React, { useEffect, useState } from 'react';
import './AllDoctorDetails.css';
import Navbar from './Navbar';
import Footer from './Footer';

const AllDoctorDetails = () => {
  const [doctors, setDoctors] = useState([]);
  const [editDoctor, setEditDoctor] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:5000/doctors');
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctor details:", error);
    }
  };

  const handleDelete = async (doctorId) => {
    try {
      const response = await fetch(`http://localhost:5000/doctors/${doctorId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setDoctors(doctors.filter(doctor => doctor._id !== doctorId));
      } else {
        console.error("Failed to delete doctor:", await response.json());
      }
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditDoctor({ ...editDoctor, [name]: value });
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/doctors/${editDoctor._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editDoctor)
      });
      if (response.ok) {
        setDoctors(doctors.map(doctor => doctor._id === editDoctor._id ? editDoctor : doctor));
        setEditDoctor(null);
      } else {
        console.error("Failed to update doctor:", await response.json());
      }
    } catch (error) {
      console.error("Error updating doctor:", error);
    }
  };

  return (
    <div className="doctor-details-container">
      <Navbar />
      <h2 className="title">All Doctor Details</h2>
      <div className="doctor-table-container">
        <table className="doctor-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Medical License Number</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Hospital</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length > 0 ? (
              doctors.map(doctor => (
                <tr key={doctor._id}>
                  {editDoctor && editDoctor._id === doctor._id ? (
                    <>
                      <td><input name="firstName" value={editDoctor.firstName} onChange={handleEditChange} /></td>
                      <td><input name="lastName" value={editDoctor.lastName} onChange={handleEditChange} /></td>
                      <td><input name="email" value={editDoctor.email} onChange={handleEditChange} /></td>
                      <td><input name="medicalLicenseNumber" value={editDoctor.medicalLicenseNumber} onChange={handleEditChange} /></td>
                      <td><input name="specialization" value={editDoctor.specialization} onChange={handleEditChange} /></td>
                      <td><input name="yearsOfExperience" value={editDoctor.yearsOfExperience} onChange={handleEditChange} /></td>
                      <td><input name="hospitalName" value={editDoctor.hospitalName} onChange={handleEditChange} /></td>
                      <td><input name="department" value={editDoctor.department} onChange={handleEditChange} /></td>
                      <td>
                        <button onClick={handleEditSubmit}>Save</button>
                        <button onClick={() => setEditDoctor(null)}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{doctor.firstName} {doctor.lastName}</td>
                      <td>{doctor.email}</td>
                      <td>{doctor.medicalLicenseNumber}</td>
                      <td>{doctor.specialization}</td>
                      <td>{doctor.yearsOfExperience}</td>
                      <td>{doctor.hospitalName}</td>
                      <td>{doctor.department}</td>
                      <td>
                        <button onClick={() => setEditDoctor(doctor)}>Edit</button>
                        <button onClick={() => handleDelete(doctor._id)}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No doctor details available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default AllDoctorDetails;
