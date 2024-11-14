import React from 'react';
//import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Navbar.css';

const Navbar = () => {
  return (
 
<div id="mySidenav" class="sidenav">
  <a href="./contact" id="help">Help Center <i class="fa fa-fw fa-wrench"></i></a>
  <a href="./login" id="signout">Sign Out <i class="fa fa-sign-out" ></i></a>
</div>

  );
};

export default Navbar;
