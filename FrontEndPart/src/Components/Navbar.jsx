import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css';
import Ayurvedalogo from '../assets/ayurveda-symbol.png'
import { FaRegCircleUser } from "react-icons/fa6";
import Login from './Login';
import Register from './Register';
import logincontext from './Logincontext';
import { Link } from 'react-router-dom';
export default function Navbar() {
  const [loginmodal, setloginmodal] = useState(false);
  const [registermodal, setregistermodal] = useState(false);
  const { loginstatus } = useContext(logincontext);
  const [hidebtns, sethidebtns] = useState(false);
  let isuser = localStorage.getItem("token");
  useEffect(() => {
    if (isuser) {
      sethidebtns(true);
    }
  }, [])

  function handleLogin() {
    setloginmodal(!loginmodal);
  }
  async function logoutdata() {
    try {
      await fetch("http://localhost:4300/users/api/logout", {
        method: 'POST'
      })
      sethidebtns(false);

    } catch (error) {
      console.log(error)

    }
  }
  function handlelogout() {
    localStorage.clear();
    logoutdata();

    useEffect(() => {
      navigate("/");
      navigate("/home");
      return;
    }, [])

  }
  const handleregmodal = () => { setregistermodal(!registermodal); }
  return (
    <>
      <div className="nav-container">
       <Link to="/"> <img src={Ayurvedalogo} alt="logo" /></Link>
        <div><h1>AMRUTAM</h1></div>
        <div className='activity-sections'>
          {!hidebtns ? <div className='login' onClick={() => { handleLogin(); }}>Login</div> : <div className='logout' onClick={() => { handlelogout(); }}>Logout</div>}

          <div className='register' onClick={() => { handleregmodal(); }}>Register</div>
          <div><Link to='/Profile'><FaRegCircleUser /></Link></div>
        </div>
      </div>
      {loginmodal && <Login togglemodal={handleLogin} />}
      {registermodal && <Register toggleregmodal={handleregmodal} />}

    </>
  )
}
