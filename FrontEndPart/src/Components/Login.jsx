import React, { useContext, useState } from 'react'
import logincontext from './Logincontext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Login(props) {
  const [isLoggedIn,setLoggedIn]=useState(false);
  let uid=localStorage.getItem("userId");
  const{loginstatus}=useContext(logincontext);
  const{setloginstatus}=useContext(logincontext);
  if(uid!=="" ||uid!=null)
  {
    // return setLoggedIn(!isLoggedIn);

  }
  const setloginmodal=()=> {props.togglemodal();}
  const [logindata, setlogindata] = useState({
    "Email": "",
    "Password": ""
});
function handlechangeinput(e, field) {
    setlogindata(
        {
            ...logindata, [field]: e.target.value
        }
    )
}
async function handlelogin() {

    try {

        const response1 = await fetch("http://localhost:4300/users/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(logindata),
            credentials: 'include'
        });
        if (!response1.ok) { throw new Error(`HTTP error! status: ${response1.status}`);}

        const response=await response1.json();

        if (response.status === 404) {
         return toast.error("User not Exist")
        }
        else if (response.status === 401) {
         return toast.error("Invalid Credentials!")
        }
        else  {
            console.log("login succesfull");
             toast.success("Login Successfull!")
            localStorage.setItem("token",response.token);
            localStorage.setItem("userId",response.data._id);
            setloginstatus(true);
            setTimeout(()=>{
                window.location.reload();

            },700);
        }
    }
    catch (error) {
        toast.error("Invalid credentials")
        console.log(error.message)
    }
    }
  return (
    <>
    <ToastContainer />
    <div className='modal'>
    <div className="modal-content">
    <span className="close" onClick={()=>setloginmodal()} >&times;</span>
    <div>
    <div className="container">
      <h2>Login </h2>
    <label for="email"><b>Email</b></label>
    <input type="email" placeholder="Enter Email" name="email" value={logindata.Email}
    required onChange={(e) => { handlechangeinput(e, "Email") }}/>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" value={logindata.Password} 
     required onChange={(e) => { handlechangeinput(e, "Password") }}/>

    <button type="submit"  onClick={() => { handlelogin() }}>Login</button>
    </div>
    </div>
    </div>
    </div>
    </>
  )
}
