import React from 'react'
import './card.css';
import { Link } from 'react-router-dom';
export default function DRCard(props) {
  return (
    <>
    <div className='card'>
        <div className="card-img">
            <img src="https://img.freepik.com/premium-photo/male-indian-doctor-smiling-with-his-arms-crossed-style-queer-academia_921860-82398.jpg" alt="dr-image"/>
        </div>
        <div className="card-body">
            <div className="Drname">{props.drinfo.Name} </div>
            <div className="education">Education: {props.drinfo.Education}</div>
            <div className="speciality">Speciality: {props.drinfo.Speciality}</div>
            <div className="exper">Experience:{props.drinfo.Experience}+ Years</div>

        </div>
        <div className="card-footer">
          <Link className='text-link' to={`/BookAppointment/${props.drinfo._id}`}><div className='btns'>Book Apointment</div></Link>
        </div>

    </div>
    </>
  )
}
