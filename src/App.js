// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './Form';
import Navbar from './navbar';
import Display from './Display';
import Vendor from './Vendor';
import VendorChoice from './Vendorchoice';
import Vendortrack from './Vendortrack';
import Cart from './Cart';
import Trackorderuser from './Trackorderuser';
const App = () => {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/display" element={<Display />} />
          <Route path="/vendor" element={<Vendor />} />
          <Route path="/vendorchoice" element={<VendorChoice/>} />
          <Route path="/vendortrack" element={<Vendortrack/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/Trackorderuser" element={<Trackorderuser/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
