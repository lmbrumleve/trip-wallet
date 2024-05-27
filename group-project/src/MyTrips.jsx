import NavBar from "./components/NavBar.jsx";
import {  Link } from "react-router-dom";
import TripProfileCard from "./components/TripProfileCard.jsx";


export default function MyTrips() { return(
    <>
        <NavBar/>
        <h1>My Trips</h1>
        <TripProfileCard/>
        <br/>
            <Link to="/trips/add" className="btn btn-primary">Add New Trip</Link>
            <br/>

    </>
);}