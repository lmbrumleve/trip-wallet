import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import NavBar from "./NavBar.jsx"
import { jwtDecode } from "jwt-decode"
import CalendarInput from "./CalendarInput.jsx"
import ReactDatePicker from "react-datepicker"
import { FaCalendarAlt } from "react-icons/fa"
import { Card } from "react-bootstrap"
import { userDefaultCurrency } from './ExchangeRatesTable.jsx'



function CustomInput({value, onClick}){


    return(
        <div className='input-group trip-button'>
            <input type="text" className='form-control' value={value} onClick={onClick} readOnly/>
            <div className='input-group-append'>
                <span className='input-group-text'>
                    <FaCalendarAlt/>
                </span>
            </div>
        </div>
    )
}

export default function TripAdd() {

    const [name, setName] = useState("")
    const [destination, setDestination] = useState("")
    const [budget, setBudget] = useState(0)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [duration, setDuration] = useState(0)
    const [username, setUsername] = useState("")
    const [data, setData] = useState()
    // const [trip, setTrip] = useState({
    //     name: "",
    //     destination: "",
    //     budget: 0,
    //     username: "",
    //     startDate: "",
    //     endDate: ""
    // })

    const [userDefaultCurrency, setUserDefaultCurrency] = useState();

    const navigate = useNavigate();

    const apiKey=import.meta.env.VITE_API_KEY;
    
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

        const handleChange = (range) => {
            const [startDate, endDate] = range;
            setStartDate(startDate);
            setEndDate(endDate);


            var diff = new Date(endDate - startDate);
            console.log(diff)
            // date difference in days
            var days = diff/1000/60/60/24;
            setDuration(days +1)
            console.log(days)
 
          };

          const fetchPhotoUrl = async () => {
            const response = await fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=scenicview&tags=${destination}&format=json&nojsoncallback=1`);
            const result = await response.json();
            return result.photos.photo[0];
        };

        const addTrip = async (e) => {
            e.preventDefault();
            const photoData = await fetchPhotoUrl();
            setData(photoData);
    
            if (photoData) {
                const photoServer = photoData.server;
                const photoId = photoData.id;
                const photoSecret = photoData.secret;
                const photoSize = "b";
    
                const srcPhoto = `https://live.staticflickr.com/${photoServer}/${photoId}_${photoSecret}_${photoSize}.jpg`;
    
                const trip = {
                    name,
                    destination,
                    budget,
                    username,
                    startDate,
                    endDate,
                    duration,
                    photoUrl: srcPhoto
                };
    
                await fetch("http://localhost:8080/trips/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify(trip)
                });
    
                navigate("/myTrips");
            }
        };

    return(
    <div>
        <NavBar/>
        <br/>
        <br/>
        <br/>
        <Card>
        <h1>Create New Trip</h1>

<hr/>
        <form method = "POST">
            <label htmlFor="name" className="trip-button">Trip Purpose:</label>
            <select id="name" name="name" onChange = {(e)=>setName(e.target.value)}>
            <option value="">-</option>
            <option value="Vacation">Vacation</option>
            <option value="Business">Business</option>
            <option value="Medical Tourism">Medical Tourism</option>
            </select>
            <br/><br/>
            <label htmlFor="destination"className="trip-button">Destination: </label>
                <input type = "text" name = "destination" id = "destination" placeholder="Enter the trip destination"onChange={(e)=>setDestination(e.target.value)} />
            <br/><br/>
            <label htmlFor="budget" className="trip-button">Budget Amount:</label>
                <input type = "text" name = "budget" id = "budget" placeholder="Enter the trip budget" onChange={(e)=>setBudget(e.target.value)} />
            <label htmlFor="budget" className="trip-button bold-font"> {userDefaultCurrency}</label>
            <br/><br/>
            <label htmlFor='startDate' className='form-label'>Travel Dates:</label>
            <div>
      <ReactDatePicker
        placeholderText="Enter trip dates"
        selected={startDate}
        customInput={<CustomInput/>} 
        onChange={handleChange}
        startDate={startDate}
        endDate={endDate}
        duration={endDate - startDate}
        selectsRange
      />
      </div>
                <br/>

            <input className="btn btn-primary" type="submit" onClick = {addTrip}/>
        </form>
        </Card>
    </div>
)}