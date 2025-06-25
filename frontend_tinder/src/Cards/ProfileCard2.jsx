import React from 'react'
import { useNavigate } from 'react-router-dom';

function ProfileCard2({user}) {
    const navigate=useNavigate();
   
    if (!user) {
        return <p className="text-center mt-10">Loading profile...</p>;
      }
  return (
   
    
    <div className='flex flex-col min-h-screen mx-5'>

<div className="card bg-base-100 w-96 shadow-sm">
    

{user.image && (
  <img src={user.image} alt="Profile"  className='h-70 w-70 object-cover'/>
)}
  
  <div className="card-body">
    <h2 className="card-title text-2xl  font-semibold">{user.firstName+" "+user.lastName}</h2>
    <p className='text-lg'>About: {user.about}</p>
    {user.skills &&  user.skills.length>0 && <p className='text-lg'>Hobbies: {user.skills.join(', ')}</p>}
 
  </div>
</div>
    </div>
  )
}

export default ProfileCard2