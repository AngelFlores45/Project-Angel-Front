
import './App.css';
import React, {useState} from "react";
import Appbar from './components/Appbar';
import Project from './components/Project';
import Protected from './components/Protected';
import Signup from './components/Signup';
import { Button } from '@mui/material';
import Login from './components/Login';
import { BrowserRouter, Routes, Route, Navigate}from "react-router-dom";
function App() {
  const [isLoggedIn, setisLoggedIn] =  useState(localStorage.getItem(localStorage.getItem("isLoggedIn")|| false));

 const logIn = () => {
   setisLoggedIn(true);
   localStorage.setItem("isLoggedIn", true);

 };
 const logOut = () => {
   setisLoggedIn(false);
   localStorage.setItem("isLoggedIn", false);
   return <Navigate to="/" replace />;
 };
  return (
    <div className="App">
      <BrowserRouter>


     <Routes>
       <Route path='/' element={<Login/>} />
      
       <Route path='/project'
         element={
           <Protected isLoggedIn={isLoggedIn}>
       
       
     
             <Project/>
             
           </Protected>
         }
       />
       
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
