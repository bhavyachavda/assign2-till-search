import logo from './logo.svg';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React,{useState, useEffect} from 'react';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import MyProfile from './pages/MyProfile';
import './App.css';
import Products from './pages/Products';
import Cart from './pages/Cart';

function App() {
  const [message,setMessage] = useState("");

  useEffect(()=>{
    fetch("http://localhost:9000/message")
    .then((res)=>res.json())
    .then((data) => setMessage(data.mess));
  }, []);
  return (
    <div >
      {/* <MyProfile/> */}

      {/* <h1>{message}</h1> */}
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="Login" element={<Login/>}/>
            <Route path="Registration" element={<Registration/>}/>
            <Route path="MyProfile" element={<MyProfile/>}/>
            <Route path="Products" element={<Products/>}/>
            <Route path="Cart" element={<Cart/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
