import React, { useState } from 'react'

export default function Register(props) {
    const setregistermodal=()=> {props.toggleregmodal();}
      const [regdata, setregdata] = useState({
        "Name":"",
        "Email": "",
        "Password": ""
    });
    function handlechangeinput(e, field) {
        setregdata(
            {
                ...regdata, [field]: e.target.value
            }
        )
    }
    async function hadleregistration() {
    
        try {
    
            const response1 = await fetch("http://localhost:4300/users/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(regdata),
                // credentials: 'include'
            });
            if (!response1.ok) { throw new Error(`HTTP error! status: ${response1.status}`);}
    
            const response=await response1.json();
    
            if (response.status === 404) {
            //    return toast.error("User not Exist")
            }
            else if (response.status === 401) {
                // return toast.error("Invalid Credentials!")
            }
            else  {
                console.log("Registration succesfull");
                // toast.success("Login Successfull!")
                // localStorage.setItem("token",response.token);
                // localStorage.setItem("userId",response.data._id);
                setTimeout(()=>{
                    window.location.reload();
    
                },700);
            }
        }
        catch (error) {
            toast.error("Error Occured")
            console.log(error)
        }
        }

 return (
    <>
    <div className='modal'>
    <div className="modal-content">
    <span className="close" onClick={()=>setregistermodal()} >&times;</span>
    <div>
    <div className="container">
      <h2>Register Yourself </h2>
      <label for="uname"><b>UserName</b></label>
      <input type="text" placeholder="Enter Username" name="uname"  value={regdata.Name}
      required onChange={(e) => { handlechangeinput(e, "Name") }}/>
    <label for="email"><b>Email</b></label>
    <input type="email" placeholder="Enter Email" name="email"  value={regdata.Email}
     required onChange={(e) => { handlechangeinput(e, "Email") }}/>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw"  value={regdata.Password}
    required onChange={(e) => { handlechangeinput(e, "Password") }}/>

    <button type="submit"  onClick={() => { hadleregistration() }}>Register</button>
    </div>
    </div>
    </div>
    </div>
    </>
  )
}
