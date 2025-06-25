import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

function Navbar() {
  const user=useSelector((store)=>store.user);
  return (
    <div className="navbar bg-base-100 shadow-sm my-4">
    <div className="flex-1">
      <Link to="/" className="btn btn-ghost text-xl"> 👩‍💻 DevTinder</Link>
    </div>
    <div className="flex gap-2">
    {user &&
    <div className='flex'> <p className='text-lg font-bold mt-2 mr-3'>{"Welcome "+user.firstName}</p>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
         
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component" 
              src={user.image} />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-md  dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li>
            <Link to="/profile" className="justify-between">
              Profile
              <span className="badge">New</span>
            </Link>
          </li>
          <li><Link to="/connections">Connections</Link></li>
          <li><Link to="/requests">Requests</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </div>
      </div>
      
}
    </div>
  </div>
  
  )
}

export default Navbar