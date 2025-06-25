import React, { useEffect } from 'react'
import BackendUrl from '../Constants/BackendUrl'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { removeUser } from '../Store/userSlice'
import { useNavigate } from 'react-router-dom'


function Logout() {
const dispatch=useDispatch();
const navigate=useNavigate();
  const loggingOut=async ()=>{
    try{
    const res=await axios.get(BackendUrl+"/logout",{withCredentials:true});
    dispatch(removeUser());
   return navigate("/login")
    }
    catch(error)
    {
      console.log(error);
    }

  }
  useEffect(()=>{
    loggingOut()
  },[])
  return (
    <h1>Logging Out</h1>
  )
}

export default Logout