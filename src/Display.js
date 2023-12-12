import React, { useEffect, useState } from 'react'
import img from './image.PNG'
import './Display.css'
import { db } from './firebase'
import { uid } from 'uid'
import { onValue, ref, set, setPriority } from 'firebase/database';
import Navbar from './navbar'
import {useNavigate} from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

export default function Display() {
    const navigate = useNavigate();
    const [items, setitems] = useState([]);
    useEffect(() => {
        onValue(ref(db, 'products'), snapshot => {
            const data = snapshot.val();
            if (data !== null) {
                const itemlist = Object.values(data).map((item) => item);
                setitems(itemlist);
                }

        }
        )
        
    }, []);
const buyhandler = (item) =>{
    const { title, size, price, productId } = item;

    const cartItem = {
        title,
        size,
        price,
        productId,
    };

    set(ref(db, `/cart/${productId}`), cartItem);
    NotificationManager.success('Success', 'Added to Cart',1000);
};

    return (
        <div>
          <div className='gotocart'>
            <button className='btn1'  onClick={()=>navigate('/')}>Back</button>
            <button className='btn1'  onClick={()=>navigate('/cart')}>Goto Cart</button>
          </div>
            <div className='items'>
                {items.map(item => (

                    <div className='card'>
                        <img src={img} alt='productimg' style={{ width: "200px", borderRadius: "10px" }}></img>
                        <h2> {item.title}</h2>
                        <h4>Size : {item.size}</h4>
                        <h4>Price : {item.price}</h4>
                        <button style={{ width: "100%", fontWeight: "600", fontSize: "20px" }} onClick={()=>buyhandler(item)}>Buy</button>
                    </div>

                ))}

            </div>
            <NotificationContainer/>
        </div>
    )
}
