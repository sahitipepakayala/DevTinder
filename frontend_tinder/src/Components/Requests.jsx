import axios from 'axios'
import React, { useEffect } from 'react'
import BackendUrl from '../Constants/BackendUrl'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest } from '../Store/RequestSlice';
import RequestCard from '../Cards/RequestCard';

function Requests() {
const dispatch=useDispatch();
const reqdata=useSelector((store)=>store.request);
    const reqFun=async()=>{
        const reqs=await axios.get(BackendUrl+"/user/requests",{withCredentials:true});
        console.log(reqs.data);
        dispatch(addRequest(reqs.data));
    }
    useEffect(()=>{if(!reqdata)reqFun()},[]);
  return (
    <div className="min-h-screen bg-base-200">
    {reqdata && reqdata.length > 0 ? (
      <div className="flex flex-col items-center py-10 space-y-6">
        {
       
            reqdata.map((cm) => (
          <RequestCard card={cm} key={cm._id} />
        ))
       }
      </div>
    ) : (
      <h1 className="text-center text-2xl font-semibold py-20">No connections</h1>
    )}
  </div>
  )
}

export default Requests