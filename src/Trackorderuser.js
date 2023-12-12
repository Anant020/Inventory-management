import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { onValue, ref, remove } from 'firebase/database';
import './Trackorderuser.css';
import { useNavigate } from 'react-router-dom';

export default function Trackorderuser() {
    const [items, setItems] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        onValue(ref(db, 'vendorapproval'), snapshot => {
            const data = snapshot.val();
            if (data !== null) {
                const itemList = Object.values(data);
                setItems(itemList);
            }
        });
    }, []);
    const deletehandle = (index) => {
        // Construct the path using the index
        const itemPath = `/vendorapproval/${index}`;
        remove(ref(db, itemPath));
    };
    return (
        <div>
            <div className='topline'>
                <button className='btn1' style={{ height: "50px", marginLeft: "2%", padding: "0" }} onClick={() => { navigate("/display") }}>Back</button>
                <div className='cartheading'>
                    <h1 className='h1cart'>Track Product</h1>
                </div>
            </div>
            <div className='totalorder'>
                {items.map((item, index) => (
                    <div className='orderlist' key={index}>
                        <h2>Product ID: {item.productId}</h2>
                        <h2>Title: {item.title}</h2>
                        <h2>Size: {item.size}</h2>
                        <h2>Price: {item.price}</h2>
                        <h2 style={{ color: "lime" }}>Incoming </h2>
                        {/* <button className='btn' onClick={deletehandle(index)}>Delete Order</button> */}
                    </div>
                ))}
            </div>
        </div>
    );
}
