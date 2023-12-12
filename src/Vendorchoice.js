import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VendorChoice.css';
import Navbar from './navbar';


const VendorChoice = () => {
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate('/vendor');
  };

  const handleVendortrack = () => {
    navigate('/vendortrack');
  };

  return (
    <div>
      <Navbar/>
      <div className='btnset'>
        <button onClick={handleAddProduct} className='btn1'>Add Product</button>
        <button onClick={handleVendortrack} className='btn1'>Track Order</button>
      </div>
    </div>
  );
};

export default VendorChoice;
