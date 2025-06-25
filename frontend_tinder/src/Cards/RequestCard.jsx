import axios from 'axios';
import React from 'react'
import BackendUrl from '../Constants/BackendUrl';
import { useDispatch } from 'react-redux';
import { removeRequest } from '../Store/RequestSlice';
function RequestCard({ card }) {
const dispatch=useDispatch()
    const handleStatus = async (status, _id) => {
        try{
        const res = await axios.post(`${BackendUrl}/review/${status}/${_id}`,{},{withCredentials:true});
        dispatch(removeRequest(_id));
        }
        catch(error)
        {
            console.log(error);
        }
      };
      
    return (
      <div className="card card-side bg-base-300 shadow-sm w-11/12 md:w-2/3 lg:w-1/2 m-2">
        <figure className="w-1/3 h-full">
          <img src={card.fromId.image} alt="profile" className="w-full h-full object-cover rounded-lg" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl">{card.fromId.firstName + ' ' + card.fromId.lastName}</h2>
          <p className="text-xl">{card.fromId.age || 20}, {card.fromId.gender}</p>
          <p className="text-xl">{card.fromId.about}</p>
          <div className="card-actions justify-end">
            <button className="btn bg-red-500" onClick={()=>handleStatus("rejected",card._id)}>Reject</button>
            <button className="btn bg-green-500" onClick={()=>handleStatus("accepted",card._id)}>Accept</button>
          </div>
        </div>
      </div>
    );
  }
export default RequestCard  