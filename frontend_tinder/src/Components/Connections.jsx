import axios from 'axios'
import React, { useEffect } from 'react'
import BackendUrl from '../Constants/BackendUrl'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../Store/ConnectionSlice';
import ConnectionCard from '../Cards/ConnectionCard';

function Connections() {
    const connUser=useSelector((store)=>store.connection);
const dispatch=useDispatch();
    const connFunction=async ()=>{
        const conn=await axios.get(BackendUrl+"/user/connections",{withCredentials:true});
        dispatch(addConnection(conn.data.connections));
        console.log(conn.data.connections);
    
    }
    useEffect(() => {
        if (!connUser || connUser.length === 0) {
            connFunction();
        }
    }, []);
    
    
  return (
    
        <div className="min-h-screen bg-base-200">
          {connUser && connUser.length > 0 ? (
            <div className="flex flex-col items-center py-10 space-y-6">
              {connUser.map((cm) => (
                <ConnectionCard card={cm} key={cm._id} />
              ))}
            </div>
          ) : (
            <h1 className="text-center text-2xl font-semibold py-20">No connections</h1>
          )}
        </div>
            
  )
}

export default Connections