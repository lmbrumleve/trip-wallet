import React, { useState } from 'react'
import NavBar from "./NavBar"
import { Card, Table } from 'react-bootstrap'


export default function TripSearch(){

    const [sel, setSel] = useState("name")
    const [q, setQ] = useState("")
    const [ans, setAns] = useState([])

    function searchTrip() {
        if (sel=="name") {
            fetch(`http://localhost:8080/trips/searchByName?name=${q}`, {

            headers:{"Content-Type":"application/json",
            Authorization: 'Bearer ' + localStorage.getItem('token')},
                }).then(res=>res.json()).then((result)=>{setAns(result);})
        } else if (sel == "budget") {
            if (isNaN(q)) {
                console.log('error')
            } else {
                fetch(`http://localhost:8080/trips/searchByBudget?budget=${q}`, {

            headers:{"Content-Type":"application/json",
            Authorization: 'Bearer ' + localStorage.getItem('token')},
                }).then(res=>res.json()).then((result)=>{setAns(result);})
            }
        } else if (sel == "destination") {
            fetch(`http://localhost:8080/trips/searchByDestination?destination=${q}`, {

            headers:{"Content-Type":"application/json",
            Authorization: 'Bearer ' + localStorage.getItem('token')},
                }).then(res=>res.json()).then((result)=>{setAns(result);})
        }
    }

    return (
    <div>
        <NavBar/>
        <br/>
        <br/>
        <br/>
        <Card className="shadow">
                <h1>Search Trips</h1>

<hr/>
<br/>
        <input className="input-format" type="text" name = {q} onChange = {(e)=>setQ(e.target.value)} />
        <select className="input-format" name = {sel} value={sel} onChange = {(e)=>setSel(e.target.value)}>
            <option value="name">Trip Purpose</option>
            <option value="destination">Destination of Trip</option>
            <option value="budget">Trip Budget</option>
        </select>

        <br />
        <button className="btn btn-primary trip-button" onClick = {searchTrip}>Search</button>
        </Card>
        <br/>
    <Card className="shadow">

    <h3>Results for Search Term: {q}</h3>
    <br/>
        <Table striped hover>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Destination</th>
                <th>Budget</th>
            </tr>
            </thead>
            <tbody>
            {ans.map(ans1=>(
            <tr>
                <td>{ans1.id}</td>
                <td>{ans1.name}</td>
                <td>{ans1.destination}</td>
                <td>{ans1.budget}</td>
            </tr>
            ))}
            </tbody>
        </Table>
        </Card>
    </div>
    );
}