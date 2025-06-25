import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../Store/userSlice';
import axios from 'axios'
import BackendUrl from '../Constants/BackendUrl'
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'

function Login() {
  const[emailId,setEmail]=useState("sahitipepakayala149@gmail.com");
  const[password,setPassword]=useState("Sahiti@1234");
  const [error,setError]=useState("");
  const navigate=useNavigate();
  const dispatch=useDispatch(); 
  async function handleLogin(){
    try{
    const res=await axios.post(BackendUrl+"/login",{emailId,password},{withCredentials:true})
    console.log(res.data);
    dispatch(addUser(res.data));
    navigate("/")
    }
    catch(error)
    {
      setError(error.response.data)
      console.log(error);
    }
   
  }
  return (
    <div className='flex justify-center mt-10'>
    <div className="card card-border bg-base-300 w-96">
    <div className="card-body">
      <h2 className="card-title text-3xl">Login</h2>
      <fieldset className="fieldset">
  <legend className="fieldset-legend text-lg">Email Id</legend>
  <input type="email" className="input h-12 text-lg" value={emailId} onChange={(e)=>setEmail(e.target.value)}/>

</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend text-lg">Password</legend>
  <input type="password" className="input h-12 text-lg" value={password} onChange={(e)=>setPassword(e.target.value)} />
  
</fieldset>
<p className='text-lg mt-2'>Don't Have an Account?<Link className='text-blue-400' to="/signin"> Sign In</Link></p>
<p className='text-red-600 text-xl'>{error}</p>
      <div className="card-actions justify-end mt-4">
        <button className="btn btn-primary text-lg" onClick={handleLogin}>Log In</button>
      </div>
    </div>
  </div>
  </div>)
}

export default Login