import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import BackendUrl from '../Constants/BackendUrl'
import { addUser } from '../Store/userSlice'


function Body() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const userData=useSelector((store)=>store.user);
const fetchUser=async ()=>{
  try{
 const res=await axios.get(BackendUrl+"/profile",{withCredentials:true});

 dispatch(addUser(res.data));

}
catch(error)
{
  // if(error.code===401)
  navigate("/login");
  console.log(error.response.data,"Please Login");
}

}
useEffect(()=>{
  if(!userData)
    fetchUser()},[]);
 
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body
