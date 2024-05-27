import Header from "./Header.jsx"
import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import NavBar from "./NavBar.jsx";
import Axios from "axios";
// import {useForm} from 'react-hook-form'

export default function transactionUpdate() {

    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;
    const { id } = useParams();
    console.log(data);
    const [tempId, setTempId] = useState(location.state.tripId);
    const [transaction, setTransaction] = useState({
        id: id,
        name: "",
        description: "",
        amount: 0,
        currency: "",
        trip: location.state.tripId,
    });
    const [currency, setCurrency] = useState({});

    useEffect(()=>{

        const fetchTransaction = async ()=>{
            try{
               const response = await fetch("http://localhost:8080/transactions/" + id, {
                  headers:{"Content-Type":"application/json",
                  Authorization: 'Bearer ' + localStorage.getItem('token')},
                  }).then(res=>res.json()).then((result)=>{setTransaction(result);})
            }
            catch(error){
                console.log(error);
            }
        }
            fetchTransaction();
            console.log(transaction);
    }, []);

//FETCH CURRENCIES:
const fetchCurrency = async () => {
    try{
        const response = await fetch("https://api.frankfurter.app/currencies").then(res=>res.json()).then((result)=>{setCurrency(result);})
     }
     catch(error){
         console.log(error);
     }

      };

useEffect(() => {
        fetchCurrency();
}, []);

console.log(Object.keys(currency));
const currencyArr = Object.keys(currency);


      const updateTransaction = (e) => {
        e.preventDefault();
        setTempId(transaction.trip);
        fetch("http://localhost:8080/transactions/update/" + id, {
            method: "PUT",
            headers:{"Content-Type":"application/json",
            Authorization: 'Bearer ' + localStorage.getItem('token')},
            body:JSON.stringify(transaction)
        }).then((response)=>{
            navigate('/trips/ID/' + tempId);
        }).catch((error)=>{
            console.log(error);
        })
      };

      const handleChange = (e) => {
        const value = e.target.value;
        setTransaction({ ...transaction, [e.target.name]: value });
      };
        
   


    return(
        <div>
            <NavBar/>

            {/* <div>{location.state.transactionId} and {location.state.name}</div> */}

            <h2>Update Transaction : {location.state.transactionId}</h2>

            <form method="PUT">

                <label for="name">Transaction Name</label><br />
                <input type="text" name="name" value={transaction.name} id="name" onChange = {(e)=>handleChange(e)}/><br />

                <label for="description">Description</label><br />
                <input type="text" name="description" value={transaction.description} id="description" onChange = {(e)=>handleChange(e)}/><br />

                <label for="amount">Amount</label><br />
                <input type="text" name="amount" value={transaction.amount} id="amount" onChange = {(e)=>handleChange(e)}/><br />

                <label for="currency">Currency</label><br />
                <select id="currency" name="currency" value={transaction.currency} onChange = {(e)=>handleChange(e)}>
                <option value="">-</option>
                  {currencyArr.map((ans) => {
                    return (
                    <option value={ans}>{ans}</option>
                    )
                    })}
                </select><br />

                <br /><input className="btn btn-primary trip-button" type="submit" value="Update Transaction" onClick= {updateTransaction}/>

            </form>
        </div>
    )
}