import { useNavigate,Link,Outlet } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import NavBar from "./NavBar.jsx";
import axios, { Axios } from "axios";
import { enUS } from "date-fns/locale";


    export default function convertTransactions(props){
        const [rate, setRate] = useState(0);
        const [number, setNumber] = useState();
        const[currencies, setCurrencies] = useState([])
        const [exchangeRates, setExchangeRates] = useState([])
        const [convertedAmount, setConvertedAmount] = useState(0)
        const [amount, setAmount] = useState(0)
        const [userDefaultCurrency, setUserDefaultCurrency] = useState("");

        const [conversionInputs, setConversionInputs] = useState({
            amount: 0,
            start: "USD",
            end: "USD",
        });

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


        const fetchExchangeRates = async () => {
            await axios.get(`https://api.frankfurter.app/latest?from=${conversionInputs.start}`).then((res) => {
                setExchangeRates(res.data.rates);
            });
        };
        
            useEffect(() => {
                fetchExchangeRates();

            }, [conversionInputs]);




        const convertT = async (e) =>{
            e.preventDefault();

            console.log(conversionInputs.end)
            let ratesKey = conversionInputs.end
            console.log(exchangeRates)
            console.log(exchangeRates[`${ratesKey}`])
            if (conversionInputs.start !== conversionInputs.end) {setRate(exchangeRates[`${ratesKey}`])}
            if (conversionInputs.start === conversionInputs.end) {setRate(1)}
            console.log(conversionInputs)

        }

useEffect (()=>{
        setAmount(conversionInputs.amount.toLocaleString(enUS, {style: "currency", currency: conversionInputs.start}))
        setConvertedAmount(conversionInputs.amount * rate);
    }, [conversionInputs, rate])

        //update convertTransaction object with new updated values that also allow for values on screen to change using value = {convertTransaction.variableName}
        const handleChange = (e)=>{
            const value= e.target.value;
            setConversionInputs({...conversionInputs,[e.target.name]: value});
            console.log(conversionInputs);
        }
//Fetch currencies: 
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
        return(
            <>
            <NavBar/>
                <h1>Currency Conversion Caclculator</h1>
                <hr/>

                <form method="POST">

                <label for="amount" className="input-format">Amount to be Converted: </label>
                <input type="text" id="amount" name="amount" value = {conversionInputs.amount} onChange = {(e)=>handleChange(e)}/> <br/>

                <label for="start" className="input-format">Convert From: </label>
                <select id="start" name="start" onChange = {(e)=>handleChange(e)}>
                  <option value="">-</option>
                  {currencyArr.map((ans) => {
                    return (
                    <option value={ans}>{ans}</option>
                    )
                    })}
                </select><br />

                <label for="end" className="input-format">Convert To: </label>
                <select id="end" name="end" onChange = {(e)=>handleChange(e)}>
                <option value="">-</option>
                {currencyArr.map((ans) => {
                    return (
                    <option value={ans}>{ans}</option>
                    )
                    })}
                  </select><br/>

                <br /><input type="submit" className="btn btn-primary trip-button" value="Convert!" onClick={convertT}/>

                </form>
                <br/>
                <h2> {convertedAmount.toLocaleString(enUS, {style: "currency", currency: conversionInputs.end})}  </h2>
            </>
        )
    }