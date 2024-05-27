import Header from "./Header.jsx"
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import NavBar from "./NavBar.jsx"
import { jwtDecode } from "jwt-decode"
import { format } from "date-fns"

export default function TransactionAdd() {

    const[name,setName]=useState('');
    const[description,setDescription]=useState('');
    const[amount,setAmount]=useState('');
    const[currency,setCurrency]=useState('');
    const[transactions, setTransactions]=useState([]);
    const[trips, setTrips]=useState([]);
    const[tripID, setTripID]=useState([]);
    const[currencies, setCurrencies] = useState([]);
    const[username, setUsername] = useState("");
    const[transactionExchangeRate, setTransactionExchangeRate] = useState([]);
    const[convertedAmount, setConvertedAmount] =useState([]);
    const[budgetCategory, setBudgetCategory] = useState("");
    
    const userDefaultCurrency = "USD"
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

    useEffect(() => {
        fetchTransactionExchangeRate();
        setConvertedAmount(amount*transactionExchangeRate);
    })
        
    const submitTransaction=(e)=>{
        e.preventDefault()

        // console.log(amount)
        // console.log(transactionExchangeRate)
        // console.log(convertedAmount)
        console.log(currency)
        fetchTransactionExchangeRate();
        // const date = format(new Date(), 'P');
        const date = new Date();


        fetch(`http://localhost:8080/trips/searchByID?ID=${tripID}`, {
            headers:{"Content-Type":"application/json",
            Authorization: 'Bearer ' + localStorage.getItem('token')},
            }).then(res=>res.json()).then(trip=>{
            const transaction = {name, description, currency, amount, trip, favorite: false, username, userDefaultCurrency, convertedAmount, date, budgetCategory}
            console.log(JSON.stringify(transaction))



            fetch("http://localhost:8080/transactions/add", {
                method:"POST",
                headers:{"Content-Type":"application/json",
                Authorization: 'Bearer ' + localStorage.getItem('token')},
                body:JSON.stringify(transaction)
                    }
            ).then(
                ()=>{console.log("New record sent")}
            )
            .then(
                ()=>{navigate("/trips/ID/" + tripID)}
            )
        })

    }

    useEffect(()=>{
        fetch("http://localhost:8080/transactions/getAll", {
         headers:{"Content-Type":"application/json",
         Authorization: 'Bearer ' + localStorage.getItem('token')},
         }).then(res=>res.json()).then((result)=>{setTransactions(result);})
        fetch("http://localhost:8080/trips/getAll", {
          headers:{"Content-Type":"application/json",
          Authorization: 'Bearer ' + localStorage.getItem('token')},
          }).then(res=>res.json()).then((result)=>{setTrips(result);})
    },[])

    
//FETCH CURRENCIES:
const fetchCurrencies = async () => {
    try{
        const response = await fetch("https://api.frankfurter.app/currencies").then(res=>res.json()).then((result)=>{setCurrencies(result);})
     }
     catch(error){
         console.log(error);
     }

      };

useEffect(() => {
        fetchCurrencies();
}, []);

console.log(Object.keys(currencies));
const currencyArr = Object.keys(currencies);

//CONVERT TRANSACTION AMOUNT TO USER'S DEFAULT CURRENCY

    //FETCH SPECIFIC EXCHANGE RATE
    const fetchTransactionExchangeRate = async () => {
        try {
            const result = await fetch(`http://api.frankfurter.app/latest?from=${currency}&to=${userDefaultCurrency}`).then(res=>res.json()).then((result)=>{setTransactionExchangeRate(result.rates[userDefaultCurrency]);})
        }
        catch(error){
            console.log(error);
        }
   
         };


    return(
    <div>
        <NavBar/>
<h1>Create New Transaction</h1>
<hr/>
        <form method="POST">
            <label for="name">Transaction Name</label><br />
            <input type = "text" name = "name" id="name" onChange = {(e)=>setName(e.target.value)} /><br />

            <label for="description">Notes</label><br />
            <input type = "text" name = "description" id="description" onChange = {(e)=>setDescription(e.target.value)} /><br />

            <label for="amount">Transaction Amount</label><br />
            <input type = "text" name = "amount" id="amount" onChange = {(e)=>setAmount(e.target.value)} /><br />
            
            <label htmlFor="budgetCategory" className="trip-button">Budget Category:</label>
            <br/>
            <select id="budgetCategory" name="budgetCategory" onChange = {(e)=>setBudgetCategory(e.target.value)}>
            <option value="">-</option>
            <option value="Transportation">Transportation</option>
            <option value="Food">Food</option>
            <option value="Lodging">Lodging</option>
            <option value="Recreation">Recreation</option>
            <option value="Souveneirs">Souveneirs</option>
            <option value="Other">Other</option>
            </select>
            <br/><br/>
            
            <label for="trip">Applies to Trip</label><br />
            <select id="trip" name="trip" onChange = {(e)=>setTripID(e.target.value)}>
                <option value="">-</option>
                {trips.map(t=>(
                    <option value={t.id}>{t.destination} {t.name}</option>
                ))}
            </select><br />

            <label for="currency">Currency</label><br />
            <select id="currency" name="currency" onChange = {(e)=>setCurrency(e.target.value)}>
            <option value="">-</option>
            {currencyArr.map((ans) => {
                    return (
                    <option value={ans}>{ans}</option>
                    )
                    })}
            </select><br />

            <br /><input type = "submit" className="btn btn-primary" onClick={submitTransaction}/>
        </form>
    </div>
);}