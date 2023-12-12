// VendorForm.js
import React, { useState } from 'react';
import { ref, set, setPriority } from 'firebase/database';
import { uid } from 'uid';
import { db } from './firebase'
import './Vendor.css'
import Navbar from './navbar';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import{useNavigate} from 'react-router-dom';

const VendorForm = () => {
  const [title, setTitle] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmit = () => {
    const productId = uid();

    set(ref(db, `/products/${productId}`), {
      title,
      size,
      price,
      productId,
    });


    // Clear the form
    setTitle('');
    setSize('');
    setPrice('');
    NotificationManager.success('Success', 'Product Added');

  };

  return (
    <div>
      <button className='btn1' style={{position:"relative", margin:"1.5%"}} onClick={()=>navigate('/vendorchoice')}>Back</button>

      {/* <Navbar/> */}
      <h1 className='h1text'>Add Products</h1>
      <div className='form1'>
        <div className='form2'>
          <label className='name'>Title : </label>
          <input className="inp" type='email' onChange={handleTitleChange} value={title} ></input>


          <label className='name'>Size : </label>
          <input className="inp" type="text" value={size} onChange={handleSizeChange}></input>
          <label className='name'>Price : </label>
          <input className="inp" type="text" value={price} onChange={handlePriceChange}></input>
          <button className='btn' type='submit' onClick={handleSubmit}>Add product</button>
        </div>
      </div>
      <NotificationContainer/>
    </div>
  );
};

export default VendorForm;
