import React, { useEffect } from 'react';
import BackendUrl from '../Constants/BackendUrl';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../Store/FeedSlice';
import Usercard from '../Cards/Usercard';
import { Link } from 'react-router-dom';

function MainBody() {
  const dataFeed = useSelector((store) => store.feed);
  const user=useSelector((store)=>store.user);
  const dispatch = useDispatch();

  const feedData = async () => {
    try {
      // Only fetch data if it's not already present in Redux store
      if (!dataFeed || dataFeed.length === 0) {
        const usersData = await axios.get(BackendUrl + "/user/feed", {withCredentials:true});
        const allData = usersData.data;
        dispatch(addFeed(allData));
        console.log("Fetched data:", allData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    feedData(); // Call feedData when the component mounts
  }, []); // Empty dependency array ensures this runs only once after initial render

  return (
    <div className="flex justify-center">
      
      {user ? dataFeed && dataFeed.length > 0 ? (
        <Usercard user={dataFeed[0]} />
      ) : (
        <h1>No new Profiles!</h1>
      ):<div><h1 className='text-2xl font-bold'>Please login to view</h1>
      <button  className='bg-red-600 mx-20 rounded-xl p-2 my-7 text-xl font-semibold items-center align-middle'><Link to="/login">Login</Link></button></div>
    }
    </div>
  );
}

export default MainBody;
