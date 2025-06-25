import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProfileCard2 from '../Cards/ProfileCard2';
import axios from 'axios';
import {addUser} from '../Store/userSlice'
import BackendUrl from '../Constants/BackendUrl'
import { useNavigate } from 'react-router-dom';

function Edit() {
    const user=useSelector((store)=>store.user);
    const [firstName,setfirst]=useState("");
    const [lastName,setlast]=useState("");
    const [about,setabout]=useState("");
    const [age,setage]=useState();
    const [gender,setGender]=useState("");
    const [image,setImage]=useState("");
    const [skills,setSkills]=useState([]);
    const [error1,setError]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleEdit=async()=>{
      try{
  
      const res=await axios.put(BackendUrl+"/profile/edit",{firstName,lastName,about,age,gender,image,skills},{withCredentials:true});
     dispatch(addUser(res.data.data));
      console.log("tryconsole",res.data.data);
      navigate("/profile")
      }
      catch (error) {
      
        setError(error.response.data);
        console.log(error.response.data);
      }
    }
    useEffect(()=>{
        if(user){
            setfirst(user.firstName||"");
            setlast(user.lastName||"");
            setabout(user.about||"");
            setage(user.age||20);
            setGender((user.gender || "male").toLowerCase());
            setImage(user.image||"");
            setSkills(user.skills||[]);
        }
        else{
            <h1>Loading user profile</h1>
        }
    },[user])
  return (
    <div className='flex justify-center min-h-screen pb-20 gap-14'>
    <div className="card card-border bg-base-300 w-96">
    <div className="card-body">
      <h2 className=" flex  justify-center card-title items-center text-2xl">Edit Your Profile Here!</h2>
      <fieldset className="fieldset">
  <legend className="fieldset-legend text-lg font-normal">First Name:</legend>
  <input type="text" className="input h-12 text-lg" value={firstName} onChange={(e)=>setfirst(e.target.value)}/>
  
</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend text-lg font-normal">Last Name</legend>
  <input type="text" className="input h-12 text-lg" value={lastName} onChange={(e)=>setlast(e.target.value)}/>
  
</fieldset>
<div className="flex gap-6 mt-4">
  {/* Age Input */}
  <div className="fieldset flex-1">
    <legend className="fieldset-legend text-lg font-normal">Age</legend>
    <input
      type="text"
      className="input h-12 text-lg w-full"
      value={age}
      onChange={(e) => setage(Number(e.target.value))}
    />
  </div>

  {/* Gender Dropdown */}
  <div className="fieldset flex-1">
    <legend className="fieldset-legend text-lg font-normal">Gender</legend>
    <select
      className="input h-12 text-lg w-full"
      value={gender}
      onChange={(e) => setGender(e.target.value)}
    >
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
  </div>
</div>

<fieldset className="fieldset">
  <legend className="fieldset-legend text-lg font-normal">About</legend>
  <textarea rows="3" cols="20" className="input h-12 text-lg" value={about} onChange={(e)=>setabout(e.target.value)}/>
</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend text-lg font-normal">Skills</legend>
  <input type="text" className="input h-12 text-lg" value={skills.join(', ')}
  onChange={(e) => setSkills(e.target.value.split(',').map(skill => skill.trim()))} />
  
</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend text-lg font-normal">Image URL</legend>
  <input type="text" className="input h-12 text-lg" value={image} onChange={(e)=>setImage(e.target.value)} />
  
</fieldset>
<p className='text-red-500 text-xl mt-3'>{error1}</p>

      <div className="card-actions justify-center">
      
        <button className=" btn btn-primary mt-10 block" onClick={handleEdit}>Save Profile</button>
      </div>
    </div>
    </div>
    <ProfileCard2 user={{firstName,lastName,age,gender,about,image}} className="ml-5"/>
  </div>
  )
}

export default Edit