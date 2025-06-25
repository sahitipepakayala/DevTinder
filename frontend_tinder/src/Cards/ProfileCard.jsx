import React from 'react'
import { useNavigate } from 'react-router-dom';

function ProfileCard({user}) {
    const navigate=useNavigate();
    function handleEdit(){
        try{
            navigate("/edit");
        }
        catch(error)
        {
            console.log(error);
        }
    }
  return (
    <div className='flex flex-col min-h-screen mb-7 '>

<div className="card bg-base-100 w-96 shadow-sm">

    <img
      src={user.image}
      alt="profile" className="w-80 h-80 object-cover mx-auto"/>
  
  <div className="card-body">
    <h2 className="card-title text-2xl  font-semibold">{user.firstName+" "+user.lastName}</h2>
    <p className='text-lg'>About: {user.about}</p>
    {user.skills &&  user.skills.length>0 && <p className='text-lg'>Hobbies: {user.skills.join(', ')}</p>}
    <div className="card-actions flex justify-around gap-5 mt-3">
      <button className="btn bg-red-400" onClick={handleEdit}>Edit</button>
     
    </div>
  </div>
</div>
    </div>
  )
}

export default ProfileCard