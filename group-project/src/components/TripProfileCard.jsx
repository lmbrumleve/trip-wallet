import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { TextField, Box, Tooltip } from '@mui/material';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import { enUS } from 'date-fns/locale';
import { jwtDecode } from 'jwt-decode';


export default function ProfileCard(props) {

  const [userDefaultCurrency, setUserDefaultCurrency] = useState("");
  const [trips, setTrips] = useState([]);
  const [isShown, setIsShown] = useState(true);
  const[username, setUsername] = useState();
  const[data, setData] = useState({});

  const navigate = useNavigate();

      //Use jwtDecode to get username from token in local storage

      useEffect(() => {
        if (localStorage.getItem('token') != undefined) {
        const tokenObj = jwtDecode(localStorage.getItem('token'));
        setUsername(tokenObj.sub)
        console.log(username)
        }
        }, [])
        console.log(username)

        //fetch user's preferred currency

        useEffect(()=>{

        const fetchCurrencyByUsername = async ()=>{
            try{
               const response = await fetch("http://localhost:8080/currency/getByUsername",{
    
                headers:{"Content-Type":"application/json",
                Authorization: 'Bearer ' + localStorage.getItem('token')}
            }).then(res=>res.json()).then((result)=>{setUserDefaultCurrency(result.currency);})
            }
            catch(error){
                console.log(error);
            }
     
        }
            fetchCurrencyByUsername();
            // console.log(trips[0].destination);
    }, []);
    console.log(userDefaultCurrency)

  
  useEffect(()=>{

    const fetchTrips = async ()=>{
        try{
           const response = await fetch("http://localhost:8080/trips/getByUsername",{

            headers:{"Content-Type":"application/json",
            Authorization: 'Bearer ' + localStorage.getItem('token')}
        }).then(res=>res.json()).then((result)=>{setTrips(result);})
        }
        catch(error){
            console.log(error);
        }

    }
        fetchTrips();
        // console.log(trips[0].destination);
}, []);
console.log(trips)


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
    <Card.Img variant="top" height= "150px" src={trip.photoUrl}></Card.Img>    
    <Card.Body>
      <div 
      className="position-top-right button-spacing"
      // onMouseEnter={() => setIsShown(false)}
      // onMouseLeave={() => setIsShown(true)}
      >
    <Tooltip title="Update Trip"><Button className="btn btn-secondary trip-button" size="sm"  onClick={(e)=>handleUpdate(e,trip.id)}><UpdateIcon/></Button>
    </Tooltip>
    {/* {!isShown && (
      <div>Update Trip</div>
    )} */}
    </div>
      <h4>{trip.destination} </h4>
      <hr/>

      <Card.Text>
      {trip.name}
      </Card.Text>
      <Card.Text>Leaving {format(trip.startDate, 'MMM d, yyy')} for {trip.duration} days</Card.Text>
      <Card.Text>{(trip.budget).toLocaleString(enUS, {style: "currency", currency: userDefaultCurrency.toString()})}</Card.Text>

        <Link className="btn btn-primary" to={`/trips/ID/${trip.id}`}>View Trip Profile</Link>
    </Card.Body>
  </Card>
))}
    </Box>
    </>
  )
}
