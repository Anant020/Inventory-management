import React from 'react';
import './navbar.css';
import {useNavigate} from 'react-router-dom';
export default function Navbar() {
    const navigate = useNavigate();
    const handleRefresh = () => {
        window.location.reload();
      }
      const tovendor = () =>{
        navigate('/vendor')
      }
  return (
    <div className='one'>
    <div className='navbar'>
      <ul className="nav-links">
    <li className="logo">Inventory Management</li>
    <li className="center"><a href="/" >Home</a></li>
    <li className="center"><a onClick={handleRefresh} href="#">Refresh</a></li>

  </ul>
    </div>
    </div>
  )
}
