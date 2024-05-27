import Header from "./Header.jsx"
import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'

export default function transactionDelete (){
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [tempId, setTempId] = useState(location.state.tripId);
    const [transaction, setTransaction] = useState({
        id: id,
        name: "",
        description: "",
        amount: "",
        currency: "",
        trip: location.state.tripId,
    });

      useEffect(()=>{

       setTempId(transaction.trip);

        const deleteTransaction = async (id,tempId)=>{
            await fetch("http://localhost:8080/transactions/" + id,{
                method:"DELETE",
                headers:{"Content-Type":"application/json",
                Authorization: 'Bearer ' + localStorage.getItem('token')}
            }).then(()=>console.log(tripId)).then(navigate("/trips/ID/" + location.state.tripId))
        }
        deleteTransaction(id,tempId);

      }, []);
}