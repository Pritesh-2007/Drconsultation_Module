import React, { useContext, useEffect, useRef, useState } from 'react'
import './Profile.css';
import logincontext from './Logincontext';
import { useNavigate } from 'react-router-dom';
import Transactionreport from './Transactionreport';
export default function Profile() {
    const[currbalance,setcurrbalance]=useState(0);
    const[mywallet,setmywallet]=useState(null);
    const amt=useRef();
    const[Name,setName]=useState("");
    const[email,setemail]=useState("");
    const[walletstatus,setwalletstatus]=useState(false);
   let navigate= useNavigate();
   let userlog=localStorage.getItem("token");
   let userId=localStorage.getItem("userId");
   console.log("In profile page")
   useEffect(()=>{
    if(!userlog)
        {
           console.log("Please Log in")
           navigate("/home");
           return;
        }
   })
   useEffect(()=>
    {
    userinfo();  
    mywalletstatus();
    console.log("MywalletStatus",walletstatus)
    if(walletstatus)
    {
        walletbalance(); 
    }
},[])
useEffect(()=>{ 
    if(walletstatus)
    {
        walletbalance();

    } 
 },[walletstatus])
   
async function walletbalance()
       {
        let res=await fetch(`http://localhost:4300/users/api/walletbalance/${userId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });
        if(res.ok)
        {
            let data=await res.json();
            setcurrbalance(data.data.Amount);
            setmywallet(data.data._id);
        } 
    }
    async function mywalletstatus() {
        let response=await fetch(`http://localhost:4300/users/api/Iswallet/${userId}`);
        let result=await response.json();
        console.log(result.haveWallet);
        if(result.haveWallet)
        {
            setwalletstatus(!walletstatus);
        }

    }
    async function userinfo(){
        let response=await fetch(`http://localhost:4300/users/api/user/${userId}`);
        let result=await response.json();
        console.log(response)
         setName(result.data.Name);
         setemail(result.data.Email);
     }

   
    async function handlemoney(){
       let uploadfields={Amount:amt.current.value}
       let response=await addmoney(uploadfields);
       if(response.ok)
       {
        alert("Money got added");
        walletbalance();
        
       }
       else{
        alert("failed to add money");
       }
    }
    async function createwallet(uploadfields){
        const response=await fetch(`http://localhost:4300/users/api/Addwallet`,{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            
            body:JSON.stringify(uploadfields),
            credentials: 'include'
        });
    let result=await response.json();
    if(result)
    {
        alert("wallet created");
        setwalletstatus(!walletstatus);
        setcurrbalance(result?.data?.Amount);
    }
    }
    function handlewallet()
    {
        // alert("Wallet clicked");
        let uploadfields={Amount:amt.current.value,user:userId}
      
        createwallet(uploadfields);
    }
    async function addmoney(uploadfields) {
        const response=await fetch(`http://localhost:4300/users/api/updatewallet/${userId}`,{
            method:"PUT",
            headers:{
              "Content-Type":"application/json"
            },
            
            body:JSON.stringify(uploadfields),
            credentials: 'include'
          })
        return response;
    } 
  return(
    <>
  <div className='profile-container'>
            <div className='grp'>
            <div className='cols-1'>
                <div><img src="https://calgaryeyespecialist.com/wp-content/uploads/2024/05/man-4.png"/></div>
                <div>{Name}</div>
                <div>{email}</div>
                
            </div>
            <div className='col-2'>
            <div className='heading'>Your Wallet is Here</div>
            <div className="money">{currbalance} &#8377;</div>
            <div className="money money-text">Current Balance</div>

            <div className="addmoney">
                <input type="number" className='number-input'ref={amt} placholder="add money.."/>
                {walletstatus ? <button className='amtbutton' onClick={()=>{handlemoney();}}>Add Money</button> :<button className='walletbtn' onClick={()=>{handlewallet();}}>Create Wallet</button>}
            </div>
            </div>
            </div>
            <div className="col-3">
            <h2>Transaction Report for you</h2>
            {walletstatus && mywallet&&<Transactionreport transaction={mywallet}/>}
            </div>
        </div>
       
    </>
  )
  
}
