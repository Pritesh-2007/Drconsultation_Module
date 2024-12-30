import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './Components/Home.jsx';
import Doctorscards from './Components/Doctorscards.jsx';
import Profile from './Components/Profile.jsx';
import BookAppointment from './Components/BookAppointment.jsx';
const approuter=createBrowserRouter([
  {
  path:'/',
  element:<App/>,
  children:[
    {
      index: true,
      path:"/",
      element:<Home/>
    },
    {
      path:"/home",
      element:<Home/>
    },
    {
      path:"/cards",
      element:<Doctorscards/>
    }
    , {
      path:"/profile",
      element:<Profile/>
    },
    {
      path:"/BookAppointment/:id",
      element:<BookAppointment/>
    }
  ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={approuter} />
  </StrictMode>,
)
