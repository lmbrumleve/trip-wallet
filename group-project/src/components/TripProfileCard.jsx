import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { TextField, Box } from '@mui/material';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';


export default function ProfileCard() {

  const userDefaultCurrency = "USD"
  const [trips, setTrips] = useState([]);

  const navigate = useNavigate();

  useEffect(()=>{

    const fetchTrips = async ()=>{
        try{
           const response = await fetch("http://localhost:8080/trips/getAll",{

            headers:{"Content-Type":"application/json",
            Authorization: 'Bearer ' + localStorage.getItem('token')}
        }).then(res=>res.json()).then((result)=>{setTrips(result);})
        }
        catch(error){
            console.log(error);
        }
    }
        fetchTrips();
        console.log(trips);
}, []);

const handleUpdate = (e,id)=>{
  e.preventDefault();
  navigate('/trips/update/' + id);
}

  return (
    <>

    <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      padding: "32px 64px",
      gap: "16px",
    }}
    >
    {trips.map((trip) =>(
    <Card style={{ width: '18rem' }} className='shadow'>
    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
    <Card.Body>
      <div className="position-top-right button-spacing">
    <Button className="btn btn-secondary trip-button" size="sm" onClick={(e)=>handleUpdate(e,trip.id)}><UpdateIcon/></Button>
    </div>
      <br/>
      <br/>
      <h4>{trip.destination} </h4>
      <hr/>

      <Card.Text>
      {trip.name}
      </Card.Text>
      <Card.Text>{format(trip.startDate, 'MMM d, yyy')} ({trip.duration} days)</Card.Text>

      {/* <Card.Text>      Trip duration: {trip.duration} days */}
{/* </Card.Text> */}
      {/* <Card.Text>
        {format(trip.startDate, 'P')} - {format(trip.endDate, 'P')}
      </Card.Text> */}
        <Link className="btn btn-primary" to={`/trips/ID/${trip.id}`}>View Trip Profile</Link>
    </Card.Body>
  </Card>
))}
    </Box>
    </>
  )
}
