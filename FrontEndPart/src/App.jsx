import { Outlet } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import logincontext from './Components/Logincontext';
import { useContext, useState } from 'react';


function App() {
  let context=useContext(logincontext);
  const[loginstatus,setloginstatus]=useState(false);
  return (
    <>
    <logincontext.Provider value={{Isloggedin:loginstatus,setloginstatus}}>    
      <Navbar/>
      <Outlet/>
    </logincontext.Provider>

    </>
  )
}

export default App
