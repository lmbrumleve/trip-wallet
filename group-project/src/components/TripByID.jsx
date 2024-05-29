import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import NavBar from "./NavBar.jsx"
import { format } from "date-fns"
import TotalTransactionsChart from "./TotalTransactionsChart.jsx"
import { Button, Card, Table } from "react-bootstrap"
import { Box } from "@mui/material"
import TransactionsByCategoryDoughnut from "./TransactionsByCategoryDoughnut.jsx"
import TransactionsPercentSpentDoughnut from "./TransactionsPercentSpentDoughnut.jsx"
import { Doughnut } from "react-chartjs-2"
import { CenterFocusStrong, DeleteForever, Update } from "@mui/icons-material"
import AddIcon from '@mui/icons-material/Add';
import { enUS } from "date-fns/locale"

export default function TripByID(props) {

    const { ID } = useParams()
    const [trip, setTrip] = useState([])
    const [transactions, setTransactions] = useState([])
    const [totalSpent, setTotalSpent] = useState([])
    const [totalBudgeted, setTotalBudgeted] = useState([])

    const userDefaultCurrency = "USD"

    const navigate = useNavigate();

    useEffect(()=>{
        // console.log(typeof ID)
        fetch("http://localhost:8080/trips/ID/" + ID, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(res=>res.json()).then((result)=>{setTrip(result);})
        fetch("http://localhost:8080/transactions/searchByTripID?ID=" + ID,{headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(res=>res.json()).then(result=>{setTransactions(result);})
    },[transactions])

    console.log(trip)

    const handleDelete = async (e,id,tripId) =>{
        e.preventDefault();
        console.log(id);
        navigate('/transactions/delete/' + id, {state:{tripId:tripId}});
    }

    const handleUpdate = (e,id,name,description,amount,currency,tripId) =>{
        e.preventDefault();
    //route dom useNavigate with state variable to be used with useLocation in other page
        navigate('/transactions/update/' + id, {state:{transactionId:id,name:name,description:description,amount:amount,currency:currency,tripId:tripId}})
    }

    const convertCurrency = async (currency, amount) =>{
        const response = await fetch("api.frankfurter.app/latest?amount=" + {amount} + "&from=" + {currency} + "&to=" + defaultCurrency);
    }

    console.log(transactions)
    useEffect (() => {
    let numAmount;
    let total = 0;
        for (let i=0; i<transactions.length; i++) {
            numAmount = Number(transactions[i].convertedAmount);
            total+=numAmount;
        }

    setTotalSpent(total);
    console.log(totalSpent)
    })

    // console.log(trip.budget)
    // useEffect(()=> {
    //     setTotalBudgeted(trip.budget);
    //     console.log(totalBudgeted)
    // })

    return (
    <div>

        <NavBar/>
        <br/>
        <br/>
        <br/>
        <Link to="/transactions/add" className="btn btn-outline-primary transaction-button"><AddIcon/></Link>
        <br/>
        <br/>
        <br/>
        <h1>{trip.destination} {trip.name} Trip</h1>
        <hr/>
        <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      padding: "32px 64px",
      gap: "16px",
    }}
    className="d-flex justify-content-center"

    >

        <Card>
          <TransactionsPercentSpentDoughnut/>      
        </Card>
        
        <Card><TransactionsByCategoryDoughnut/></Card>
        
        </Box>
        <Card>
            <h2>Transactions</h2>
        <Table striped  hover>
            <thead>
            <tr>
                <th>Date</th>
                {/* <th>Item</th> */}
                <th>Description</th>
                <th>Category</th>
                <th>Amount (Local)</th>
                <th>Amount ({userDefaultCurrency})</th>
                <th></th>
            </tr>
            </thead>

            <tbody>

            {transactions.map(ans=>(
            <tr>
                <td>{format(ans.date, 'P')}</td>
                {/* <td>{ans.name}</td> */}
                <td className="text-start"><p className="fw-bold text-nowrap">Payment to {ans.name} </p>
                {ans.description}</td>
                <td>{ans.budgetCategory}</td>
                <td>{(ans.amount).toLocaleString(enUS, {style: "currency", currency: ans.currency})}</td>
                <td>{(ans.convertedAmount).toLocaleString(enUS, {style: "currency", currency: "USD"})}</td>
{/*                 <td>{convertCurrency(ans.currency, ans.amount)}</td> */}
                <td><Button className="btn btn-secondary trip-button" size="sm" onClick={(e)=>handleUpdate(e,ans.id,ans.name,ans.description,ans.amount,ans.currency,trip.id)}><Update/></Button>
                <Button className="btn btn-outline-secondary trip-button" size="sm" onClick={(e)=>handleDelete(e,ans.id,ans.trip.id)}><DeleteForever/></Button></td>
            </tr>
            ))}
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="bold-font">Total Spent: </td>


                    <td className="bold-font">{totalSpent.toLocaleString(enUS, {style: "currency", currency: "USD"})}</td>
                    <td></td>
                    <td></td>
                </tr>
                </tbody>
        </Table>
        </Card>
            <br/>
        <Link to="/myTrips" className="btn btn-primary trip-button">Back to all trips</Link>

    </div>
    );
}