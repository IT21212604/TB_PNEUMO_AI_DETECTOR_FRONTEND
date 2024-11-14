import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllUserDetails.css';

const AllUserDetails = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editUserId, setEditUserId] = useState(null);
    const [userData, setUserData] = useState({ fullName: '', email: '', nic: '' });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users');
                setUsers(response.data);
            } catch (err) {
                setError('Failed to fetch user data.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleEditClick = (user) => {
        setEditUserId(user._id);
        setUserData({ fullName: user.fullName, email: user.email, nic: user.nic });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/users/${editUserId}`, userData);
            if (response.status === 200) {
                console.log('User updated successfully:', response.data);
                setUsers(users.map(user => (user._id === editUserId ? { ...user, ...userData } : user)));
                setEditUserId(null);
                setUserData({ fullName: '', email: '', nic: '' });
            }
        } catch (error) {
            console.error('Error updating user:', error);
            setError('Failed to update user.');
        }
    };

    const handleDelete = async (userId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/users/${userId}`);
            if (response.status === 200) {
                console.log('User deleted successfully:', response.data);
                setUsers(users.filter(user => user._id !== userId));
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            setError('Failed to delete user.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="user-details-container">
            <h1>All User Details</h1>
            <table className="user-details-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>NIC</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>{user.nic}</td>
                            <td>
                                <button onClick={() => handleEditClick(user)}>Edit</button>
                                <button onClick={() => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editUserId && (
                <div className="edit-user-modal">
                    <h2>Edit User</h2>
                    <input
                        type="text"
                        name="fullName"
                        value={userData.fullName}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                    />
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                    />
                    <input
                        type="text"
                        name="nic"
                        value={userData.nic}
                        onChange={handleInputChange}
                        placeholder="NIC"
                    />
                    <button onClick={handleUpdate}>Update User</button>
                    <button onClick={() => { setEditUserId(null); setUserData({ fullName: '', email: '', nic: '' }); }}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default AllUserDetails;
