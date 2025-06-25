import axios from 'axios'
import React from 'react'
import BackendUrl from '../Constants/BackendUrl'
import { useDispatch } from 'react-redux';
import { removeFeed } from '../Store/FeedSlice';

function Usercard({ user }) {

const dispatch=useDispatch();
  async function handlestatus(status,id){

    try{
    const res=await axios.post(BackendUrl+"/request/"+status+"/"+id,{},{withCredentials:true});
      dispatch(removeFeed(id));
    }
    catch(error)
    {
      console.log(error);
    }

  }
  return (
    <div className='flex flex-col min-h-screen mx-5'>
      <div className="flex justify-center card bg-base-400 w-96 shadow-sm">
        <div className='flex flex-col items-center justify-center'>
          <img
            src={user.image}
            alt="profile"
            className='h-70 w-80 object-cover'
          />
        </div>
        <div className="card-body">
          <h2 className="card-title text-2xl font-semibold">
            {user.firstName + " " + user.lastName}
           
          </h2>
          <p className='text-lg'>About: {user.about}</p>
          {user.skills && user.skills.length > 0 && (
            <p className='text-lg'>Hobbies: {user.skills.join(', ')}</p>
          )}
          <div className="card-actions flex justify-around gap-5 mt-3">
            <button className="btn bg-red-400" onClick={()=>handlestatus("ignored",user._id)}>Ignore</button>
            <button className="btn bg-green-400" onClick={()=>handlestatus("intrested",user._id)}>Intrested</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Usercard
