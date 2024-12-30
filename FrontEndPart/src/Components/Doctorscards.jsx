import React, { useEffect, useState } from 'react'
import DRCard from './card'
import './Doctorscards.css'
export default function Doctorscards() {
  const [drlist,setdrlist]=useState([]);
  useEffect(()=>{
    async function getdoctors()
    {
      let res=await fetch("http://localhost:4300/users/api/getdoctorlist");
      let result=await res.json();
      setdrlist(result.data)
    }
    getdoctors();
  },[])
  return (
    <>
    <div className='drcard'>
    {
      drlist?.map((item)=>{
        return (
          <DRCard  key={item._id} drinfo={item}/>
        )
      })
    }

    </div>
    </>
  )
}
