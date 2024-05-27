import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'

export default function tripDelete (){
    const { id } = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState({
        id: id,
        name: "",
        destination: "",
        budget: "",
    });

      useEffect(()=>{
      console.log(id)
      console.log(trip)
        const deleteTrip = async (id)=>{
            await fetch("http://localhost:8080/trips/" + id,{
                method:"DELETE",
                headers:{"Content-Type":"application/json",
                Authorization: 'Bearer ' + localStorage.getItem('token')}
            }).then(()=>console.log("record deleted")).then(()=>navigate("/trips"))
        }
        deleteTrip(id);
      }, []);

}