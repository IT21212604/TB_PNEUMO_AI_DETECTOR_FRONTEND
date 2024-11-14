// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';
// /*import Header from './Header'; // Import the Header component*/
// import Footer from './Footer';


// //import Navbar from './Navbar';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [userType, setUserType] = useState('user');
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
// //make API Call to Authentic user
//     const response = await fetch('http://localhost:5000/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ email, password, userType })
//     });

//     const data = await response.json(); //converted from JSON format into a JavaScript object
//     if (response.ok) {
//       alert(data.message);
//       localStorage.setItem('userDetails', JSON.stringify(data.user));
//       navigate('/profile');
//     } else {
//       alert(data.message);
//     }
//   };

//   return (
//     <div>
//       {/* Include the header component<Navbar/> 
//       */}
      
    
      
//       <div className="login-container">
    
//         <div className="login-box">
//           <h2>Login</h2>
//           <form onSubmit={handleSubmit}>
//           <div className="input-grouplogin">
              
//               <div className="toggle-switch">
//       <input
//         type="radio"
//         id="userRole"
//         value="user"
//         checked={userType === 'user'}
//         onChange={(e) => setUserType(e.target.value)}
//         required
//       />
//       <label htmlFor="userRole">Admin</label>

//       <input
//         type="radio"
//         id="doctorRole"
//         value="doctor"
//         checked={userType === 'doctor'}
//         onChange={(e) => setUserType(e.target.value)}
//         required
//       />
//       <label htmlFor="doctorRole">Doctor</label>
//     </div>
//             </div>
//             <div className="input-grouplogin">
//               <label >Email</label>
//               <input
//                 type="text"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="input-grouplogin">
//               <label >Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
            
            
//             <div className="forgot-password-container">
//               <a href="/passwordReset">Reset Password</a>
//             </div>
//             <center><button type="submit" className="login-button"><center>LOG IN</center></button></center>
//           </form>
//           <div className="no-account">
//             <p>Don't have an account? <a href='./Contact'>Refer Demo</a></p>
//           </div>
          
//         </div>
//       </div>
//       <Footer />  
//     </div>
   
//   );
// };

// export default Login;

// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Footer from './Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, userType })
      });
      
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        localStorage.setItem('userDetails', JSON.stringify(data.user));
        navigate('/profile');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-grouplogin">
              <div className="toggle-switch">
                <input type="radio" id="userRole" value="user" checked={userType === 'user'}
                  onChange={(e) => setUserType(e.target.value)} required />
                <label htmlFor="userRole">User</label>

                <input type="radio" id="doctorRole" value="doctor" checked={userType === 'doctor'}
                  onChange={(e) => setUserType(e.target.value)} required />
                <label htmlFor="doctorRole">Doctor</label>
              </div>
            </div>
            <div className="input-grouplogin">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-grouplogin">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="forgot-password-container">
              <a href="/passwordReset">Reset Password</a>
            </div>
            <button type="submit" className="login-button">LOG IN</button>
          </form>
          <div className="no-account">
            <p>Don't have an account? <a href='./Contact'>Refer Demo</a></p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
