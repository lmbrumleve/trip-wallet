import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import NavBar from "./NavBar.jsx"
import { Button, Card } from "react-bootstrap"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever.js"


    export default function tripUpdate(){

        const location = useLocation();
        const navigate = useNavigate();
        const data = location.state;
        const { id } = useParams();
        console.log(data);
    const [trip, setTrip] = useState({
        id: "",
        name: "",
        destination: "",
        budget: 0,
    })

    useEffect(()=>{

        const fetchTrip = async ()=>{
            try{
               const response = await fetch("http://localhost:8080/trips/ID/" + id,{

                headers:{"Content-Type":"application/json",
                Authorization: 'Bearer ' + localStorage.getItem('token')}
            }).then(res=>res.json()).then((result)=>{setTrip(result);})
            }
            catch(error){
                console.log(error);
            }
        }
            fetchTrip();
            console.log(trip);
    }, []);

    const updateTrip = (e)=>{
        e.preventDefault();
        fetch("http://localhost:8080/trips/update/" + id, {
            method: "PUT",
            headers:{"Content-Type":"application/json",
            Authorization: 'Bearer ' + localStorage.getItem('token')},
            body:JSON.stringify(trip)
        }).then((response)=>{
            navigate('/myTrips');
        }).catch((error)=>{
            console.log(error);
        })
    }

    const handleChange = (e)=>{
        const value = e.target.value;
        setTrip({...trip, [e.target.name]: value});
    }

    const deleteTrip = async (id)=>{
        await fetch("http://localhost:8080/trips/" + id,{
            method:"DELETE",
            headers:{"Content-Type":"application/json",
            Authorization: 'Bearer ' + localStorage.getItem('token')}
        }).then(()=>console.log("trip deleted"))
        }

  const handleDelete = (e,id)=>{
      e.preventDefault();

      const fetchTripTransactions = async (id)=>{
         const response = await fetch("http://localhost:8080/transactions/searchByTripID?ID=" + id,{
              headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then((res)=>res.json())
          console.log(response);
          deleteTripTransactions(response).then(deleteTrip(id));
          
          }

      fetchTripTransactions(id);
      //deleteTripTransactions(response);
      deleteTrip(id);
    //   deleteTrip(id);

      navigate("/myTrips");
  }

    return(
    <>
        <NavBar/>
        <br/>
        <br/>
        <br/>

        <h2>Update Trip {id}</h2>
<Card className="shadow">
        <form method="PUT">

            <label for="name" className='trip-button'>Trip Purpose: </label>
            {/* <input type="text" name="name" value={trip.name} id="name" onChange = {(e)=>handleChange(e)}/><br /> */}
            <select id="name" name="name" onChange = {(e)=>handleChange(e)}>
            <option value="">{trip.name}</option>
            <option value="Vacation">Vacation</option>
            <option value="Business">Business</option>
            <option value="Medical Tourism">Medical Tourism</option>
            </select>
            <br/>


            <label for="destination" className='trip-button'>Destination: </label>
            <input type="text" name="destination" value={trip.destination} id="destination" onChange = {(e)=>handleChange(e)}/><br />

            <label for="budget" className='trip-button'>Budget: </label>
            <input type="text" name="budget" value={trip.budget} id="budget" onChange = {(e)=>handleChange(e)}/><br />

            <label for="startDate" className='trip-button'>Start Date:</label>

            <label for="endDate" className='trip-button'>End Date: </label><br />


            <br />
            <Button className="btn btn-outline-primary trip-button" size="sm" onClick={(e)=>handleDelete(e,trip.id)}><DeleteForeverIcon/></Button>
            <input type="submit" value="Update Trip!" className="btn btn-primary trip-button" onClick={updateTrip}/>

        </form>
        </Card>
    </>)
    }