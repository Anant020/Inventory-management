import React from 'react'
import {db} from './firebase'
import {uid} from 'uid'
import { ref, set, setPriority } from 'firebase/database';
import { useEffect, useState } from 'react';
import form from './Form.css'
import { useNavigate} from 'react-router-dom';
import Navbar from './navbar';

export default function Form() {
    const navigate = useNavigate();
    const [email,setemail] = useState('');
    const [pass,setepass] = useState('');
    const [display,setdisplay]= useState(false);
    const handleemail= (e)=>{
      setemail(e.target.value);
    }
    const handlepass=(e)=>{
    setepass(e.target.value);
    }
    const writetodb = () =>{
      const uuid = uid();
      set(ref(db,`/logindata/${uuid}`),{
        pass,
        email,
        uuid,
      })
      setemail("");
      setepass("");
    }
  
    const handleLogin = () => {
        if(email.length===0 || pass.length===0){
            alert("Both the feilds are mandatory");
            return;
          }
    if (email === 'vendor@gmail.com' && pass === '1234') {
        navigate('/vendorchoice');
    } else {
        
      
      writetodb();
        navigate('/display');
      }
  }

    return (
        <div className='formdiv'>
            <Navbar />
            <div className='note'>
                to access the vendor panel enter 
            email = <b>vendor@gmail.com</b> <br/>
             pass = <b>1234</b>
               <br/>to access user just add any entries <br/>
               All entries are open for forms for testing
            </div>
            <div className='form1'>
                <div className='form2'>
                    <label className='name'>Email : </label>
                    <input className="inp" type="email" onChange={handleemail} value={email} ></input>
                
                
                    <label className='name'>Password : </label>
                    <input className="inp" type='text' onChange={handlepass} value={pass}></input>
                <button className='btn' type='submit' onClick={handleLogin}>Submit</button>
                </div>
            </div>
        </div>
    )
}
