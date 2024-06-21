import React, { useEffect, useState } from 'react'

export default function CurrencyCodeDropDown(props) {

    const[currencies, setCurrencies] = useState([]);

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

  return (
    <>

    <option value="">-</option>
    {currencyArr.map((ans) => {
            return (
            <option value={ans}>{ans}</option>
            )
            })}
 
    </>
  )
}
