import { useNavigate, Link, Outlet } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import Header from "./components/Header.jsx"
import NavBar from "./components/NavBar.jsx";
import { OverlayTrigger } from "react-bootstrap";
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';


export default function Trips() {
    const [trips, setTrips] = useState([])

    const userDefaultCurrency = "USD";

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          View Transactions
        </Tooltip>
      );

    const navigate = useNavigate();

    useEffect(()=>{
        fetch("http://localhost:8080/trips/getAll", {
            headers: {Authorization: 'Bearer ' + localStorage.getItem('token')
                                                         	}}).then(res=>res.json()).then((result)=>{setTrips(result);})
    },[trips])

    const handleUpdate = (e,id)=>{
        e.preventDefault();
        navigate('/trips/update/' + id);
    }

    const deleteTripTransactions = async (response)=>{
        await response.map((data)=>{

          fetch("http://localhost:8080/transactions/" + data.id,{
                        method:"DELETE",
                        headers:{"Content-Type":"application/json",
                        Authorization: 'Bearer ' + localStorage.getItem('token')}
                    }).then(()=>console.log("transactions deleted"))

                    })
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
            deleteTripTransactions(response);
            }

        fetchTripTransactions(id);
        //deleteTripTransactions(response);
        deleteTrip(id);
        deleteTrip(id);

        //navigate("/trips/delete/" + id);
    }

    return (
    <div>
        <NavBar/>
        <Link to="/trips/add" className="btn btn-outline-primary transaction-button"><span>➕</span></Link>
            <br/>
            <br/>

        <h1>My Trips</h1>

        <hr/>
        <table>
            <tr>
                {/* <th>ID</th> */}
                <th>Destination</th>
                <th>Purpose</th>
                <th>Budget</th>
            </tr>

            {trips.map(ans=>(
            <tr>
                {/* <td><Link to={`/trips/ID/${ans.id}`}>{ans.id}</Link></td> */}
                <td>{ans.destination}</td>
                <td>{ans.name}</td>
                <td> {ans.budget} {userDefaultCurrency}</td>

                <button className="btn btn-primary trip-button" onClick={(e)=>handleUpdate(e,ans.id)}>Update</button>
                <button className="btn btn-outline-primary trip-button" onClick={(e)=>handleDelete(e,ans.id)}>Delete</button>
                <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
                >
                <Link to={`/trips/ID/${ans.id}`} className="btn btn-secondary trip-button" ><ViewHeadlineIcon/></Link>
                </OverlayTrigger>
                </tr>
            ))}

        </table>
                <br/>
                <br/>     
        <Link to="/trips/search" className="btn btn-primary trip-button">Search a Trip</Link>
        <br/>
    </div>
)}