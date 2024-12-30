import React, { useEffect, useState } from 'react'
import './BookAppointment.css'
import DRCard from './card'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function BookAppointment() {
  const { id } =useParams();
  const[mydr,setmydr]=useState({});
  const[fromid,setfromid]=useState("");
  const[toid,settoid]=useState("");
  const[showaiting,setshowwaiting]=useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  let navigate=useNavigate();
  let user=localStorage.getItem("userId")
  useEffect(()=>{
    if(!user)
    {
      navigate("/home");
      return;
    }
  })
  useEffect(()=>{
    async function getinfo (){
      let res=await fetch(`http://localhost:4300/users/api/getdoctorinfo/${id}`);
      let result=await res.json();
 
         setmydr(result.data);
          }
    getinfo();
 
 
  },[]);
  useEffect(()=>{
    walletdetails();
  },[mydr])
  async function walletdetails()
  {
    let res1=await fetch(`http://localhost:4300/users/api/walletdetails/${user}`);
    let result1=await res1.json();
    setfromid(result1.data._id)
    let res2=await fetch(`http://localhost:4300/users/api/walletdetails/${mydr?.userId}`);
    let result2=await res2.json();
    settoid(result2.data._id);
  }
  async function payment(uploadfields) {
    try {

          const response=await fetch(`http://localhost:4300/users/api/transfer`,{
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              
          body:JSON.stringify(uploadfields),
          credentials: 'include'
        })
        if(response.ok && response.status==201)
        {
          console.log("Payment done");
          toast("Fee Paid");
          setshowwaiting(true);
          setIsDisabled(!isDisabled);
          return;
        }
        else if(response.status==400)
        {
          toast.info("Insufficient balance");
        
        }
        else 
        {
            toast.error(response.statusText);
        }
    } catch (error) {
      console.log(error)
    }
  } 
  
  function handlepayment(){

    let uploadfields={
      "fromWalletId":fromid,
      "toWalletId":toid,
      "Amount":mydr.consult_fee
    };
    payment(uploadfields);
    
}
  return (
    <>
    <ToastContainer/>
    <div className='appointment-container'>
    <div className="docdiv">
      <div className='drfield'>
      <h1>Meet Your Doctor</h1>
      {mydr ? <DRCard drinfo={mydr}/> : ""}
    
      </div>
      
      </div>  
    <div className="paymentdiv">
      <div className='divbox'>
        <h2>
          Yo would have to pay consulation fee 
        </h2>
        
        <div className="amountdiv">{mydr?.consult_fee} &#8377;</div>
        <button className="paybtn" onClick={()=>{handlepayment(mydr?.consult_fee)}} disabled={isDisabled}>Pay Consultation fee</button>
      </div>
      <div className="watingroom">
        {showaiting && <div
        ><h2>Please wait for dr. call</h2>
        <img src='https://cdn.dribbble.com/users/1056119/screenshots/4724342/media/60a82e6716c45f64a9850c7eee0183dc.gif' alt="waiting images"></img>
        </div>}
      </div>
      </div>      
    </div>
    </>
  )
}
