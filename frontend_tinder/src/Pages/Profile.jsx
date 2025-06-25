import React from 'react'
import { useSelector } from 'react-redux'
import ProfileCard from '../Cards/ProfileCard';

function Profile() {
  const user=useSelector((store)=>store.user);
  return (
    <div className='flex justify-center'>
      {
        user&& <ProfileCard user={user}/>
      }
    </div>
  )
}

export default Profile