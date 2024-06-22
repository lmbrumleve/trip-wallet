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
import FlickrPhoto from './FlickrPhoto';


export default function ProfileCard(props) {

  const userDefaultCurrency = "USD"
  const [trips, setTrips] = useState([]);
  const [isShown, setIsShown] = useState(true);
  const[username, setUsername] = useState();
  const[data, setData] = useState({});

  const navigate = useNavigate();


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
        console.log(trips);
}, []);
console.log(trips)
    //FETCH PHOTO:
    const fetchJsonPhoto = async () => {
      try{
          const response = await fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=b4d7879b676db4c084c8faa15e2abe8d&text=landmark&tags=indonesia&format=json&nojsoncallback=1`)
          .then(res=>res.json())
          .then((result)=>{setData(result.photos.photo[0]);})
       }
       catch(error){
           console.log(error);
       }
        };
  
  useEffect(() => {
          fetchJsonPhoto();
  }, []);
  
  console.log(data)
  
  let photoServer = data.server;
  let photoId = data.id;
  let photoSecret = data.secret;
  
  // console.log(photoServer)
  
  let srcPhoto = `https://live.staticflickr.com/${photoServer}/${photoId}_${photoSecret}_b.jpg`
  console.log(srcPhoto)

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
    <Card.Img variant="top" src={srcPhoto}></Card.Img>    

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
      <br/>
      <br/>
      <h4>{trip.destination} </h4>
      <hr/>

      <Card.Text>
      {trip.name}
      </Card.Text>
      <Card.Text>Leaving {format(trip.startDate, 'MMM d, yyy')} for {trip.duration} days</Card.Text>
      <Card.Text>{(trip.budget).toLocaleString(enUS, {style: "currency", currency: "USD"})} USD</Card.Text>

        <Link className="btn btn-primary" to={`/trips/ID/${trip.id}`}>View Trip Profile</Link>
    </Card.Body>
  </Card>
))}
    </Box>
    </>
  )
}
