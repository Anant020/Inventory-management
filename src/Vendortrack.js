import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ref, remove, set, setPriority } from 'firebase/database';
import { uid } from 'uid';
import { db } from './firebase'
import { onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
export default function Vendortrack() {
  const [items, setItems] = useState([]);
  const [check,setcheck] = useState(true);
  useEffect(() => {
    const unsubscribe =  onValue(ref(db, 'vendorapproval'), snapshot => {
      const data = snapshot.val();
      if (data !== null) {
        const itemList = Object.values(data);
        setItems(itemList);
        setcheck(true);
      }
      else{
        setItems([]);
        setcheck(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const navigate = useNavigate();

  const deletehandler = (item) => {
    // console.log(item);
    // remove(ref(db, `/vendorapproval/${item}`));
    remove(ref(db, '/vendorapproval'));
      setItems([]);
      setcheck(false);
  }

  return (
    <div>
      <button className='btn1' style={{ position: "relative", margin: "1.5%" }} onClick={() => navigate('/vendorchoice')}>Back</button>
      <div>

       {check ? (<div className='totalorder'>
          {items.map((item, index) => (
            <div className='orderlist' key={index}>
              <h2>Product ID: {item.productId}</h2>
              <h2>Title: {item.title}</h2>
              <h2>Size: {item.size}</h2>
              <h2>Price: {item.price}</h2>
              <h3 style={{ color: "plum" }}>Pending </h3>

              <button className='btn' style={{ backgroundColor: "red", margin: "0" }} onClick={() => { deletehandler(index) }}>Delete Entire Order</button>
            </div>
          ))}
        </div>):(<h1 className='emptyname'> No Orders Yet</h1>) }
      
      </div>


    </div>
  )
}
