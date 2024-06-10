import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import NavBar from "./NavBar.jsx";
import Axios from "axios";
import { Card } from 'react-bootstrap';
// import {useForm} from 'react-hook-form'

export default function transactionUpdate(props) {

    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;
    const { id } = useParams();
    console.log(data);
    const [tempId, setTempId] = useState(location.state.tripId);
    console.log(tempId)
    const[convertedAmount, setConvertedAmount] =useState([]);

    const [transaction, setTransaction] = useState({
        id: id,
        name: "",
        description: "",
        amount: 0,
        currency: "",
        trip: location.state.tripId,
        convertedAmount: 0
    });
    const [currency, setCurrency] = useState({});
    const [exchangeRates, setExchangeRates] = useState("");
    const [currencyExchangeRates, setCurrencyExchangeRates] = useState([]);

    const userDefaultCurrency = "USD"

    console.log(transaction)

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

//fetch currencies:
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

//fetch exchange rates:
  const fetchExchangeRates = async () => {
    await Axios.get(`https://api.frankfurter.app/latest?from=${userDefaultCurrency}`).then((res) => {
        setExchangeRates(res.data.rates);
    });
};

    useEffect(() => {
        fetchExchangeRates();
    }, []);

    useEffect(() => {
      setCurrencyExchangeRates(Object.keys(exchangeRates));

    }, [exchangeRates])

    useEffect(() => {
        setConvertedAmount();
    })

    console.log(exchangeRates)
    console.log(transaction)


    const updateTransaction = (e) => {
        e.preventDefault();

        transaction.convertedAmount = Number(transaction.amount/exchangeRates[(transaction.currency)]);
        console.log(transaction)
        // setTempId(transaction.trip);
        fetch("http://localhost:8080/transactions/update/" + id, {
            method: "PUT",
            headers:{"Content-Type":"application/json",
            Authorization: 'Bearer ' + localStorage.getItem('token')},
            body:JSON.stringify(transaction)
        }).catch((error)=>{
            console.log(error);
        })

        
        navigate("/trips/ID/" + transaction.trip.id)
      };
console.log(transaction)
      const handleChange = (e) => {
        const value = e.target.value;
        setTransaction({ ...transaction, [e.target.name]: value });
        transaction.convertedAmount = 2;
      };
      console.log(transaction)

   


    return(
        <div>
            <NavBar/>
            <br/>
            <br/>
            <br/>

            {/* <div>{location.state.transactionId} and {location.state.name}</div> */}
            <Card className='shadow'>
            <h2>Update Transaction: {location.state.name}</h2>

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
            </Card>
        </div>
    )
}