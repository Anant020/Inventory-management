import React from 'react'
import { db } from './firebase'
import { uid } from 'uid'
import { onValue, ref, remove, set, setPriority } from 'firebase/database';
import { useState, useEffect } from 'react';
import img from './image.PNG'
import './cart.css'
import { useNavigate } from 'react-router-dom'
export default function Cart() {
    const [items, setitems] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [check, setcheck] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {

        onValue(ref(db, 'cart'), snapshot => {
            const data = snapshot.val();
            if (data !== null) {
                const itemlist = Object.values(data).map((item) => item);
                setitems(itemlist);
                setcheck(itemlist.length > 0);
            }
            else{
                setcheck(false);
            }
        }
        )

    }, []);
   
    const handledelete = (item) => {
        remove(ref(db, `/cart/${item.productId}`));

    };

    const placeorderhandler = (items) => {
        const itemid = uid();
      
        // set(ref(db, `/vendorapproval/${items}`));
        set(ref(db, `/vendorapproval`),items);

        items.forEach(item => {
            remove(ref(db, `/cart/${item.productId}`));
        });
        setcheck(false);
    };
    return (
        <div>
            <div className='topline'>
                <button className='btn1' style={{ height: "50px", marginLeft: "2%", padding: "0" }} onClick={() => { navigate("/display") }}>Back</button>
                <div className='cartheading'>
                <h1 className='h1cart'>Your cart</h1>
                </div>
            </div>


           {check ? (<div className='cartdiv'>
                {items.map(item => (
                    <div className='slantcard'>
                        <img src={img} alt='productimg' style={{ width: "6%", borderRadius: "10px" }}></img>
                        <h2> {item.title}</h2>
                        <h4>Size : {item.size}</h4>
                        <h4>Price : {item.price}</h4>
                        <button style={{ width: "10%", fontWeight: "600", fontSize: "20px", height: "3.56h" }} className='btn3' onClick={() => handledelete(item)} >Remove</button>
                    </div>
                ))}
                <button className='btn1' style={{ height: "50px", margin: "auto", padding: "0", display: "block", justifyContent: "center", position: "relative" }} onClick={() => placeorderhandler(items)}>Place Order</button>
            </div>) : (<h1 className='emptyname'>Oops! your Cart is empty
            <div className='bt'>
            <button className='btn1' onClick={()=>{navigate('/Trackorderuser')}}>Track your Order</button>
            </div>
            </h1>)}

        </div>
    )
}
