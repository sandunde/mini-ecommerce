import { Dropdown } from 'react-bootstrap';
import React, { useState } from 'react';
import "./Navbar.css";
import Profile from "../../assets/profile.png";

const Navbar = () => {
  const [status, setStatus] = useState('Active');

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus); 
  };

  return (
    <div className='nav-bar'>
      <Dropdown className='dropdown-btn'>
        <Dropdown.Toggle className='dropdown-btn'>
          ADMIN
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleStatusChange('Logout')} href='#action'>Logout</Dropdown.Item>
          <Dropdown.Item onClick={() => handleStatusChange('Active')} >Active</Dropdown.Item>
          <Dropdown.Item onClick={() => handleStatusChange('Inactive')} >Inactive</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div className="profile-container">
        <img src={Profile} alt='profile' className='profile-pic' />
        <div className={`status-dot ${status.toLowerCase()}`}></div>
      </div>
    </div>
  );
}

export default Navbar;
