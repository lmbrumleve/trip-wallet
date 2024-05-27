import { useState, useEffect } from 'react'
import Axios from "axios";
import Table from 'react-bootstrap/Table'
import ExchangeRatesTable, { allRates } from './ExchangeRatesTable';

export default function LiveExchangeRates () {
    
    // fetch("https://api.frankfurter.app/latest")
    // .then((res) => res.json())
    // .then((data) => {
    //   console.log(data);
    // });

    // const userDefaultCurrency = "USD";

//FETCH BASE CURRENCY
//     const [baseCurrency, setBaseCurrency] = useState("");

//     const fetchBaseCurrency = () => {
//     Axios.get(`https://api.frankfurter.app/latest?from=${userDefaultCurrency}`).then((res) => {
//         setBaseCurrency(res.data.base);
//     });
// };


//   useEffect(() => {
//     fetchBaseCurrency();
//   }, []);

// //RATE
// const [exchangeRates, setExchangeRates] = useState("");

// const fetchExchangeRates = () => {
//     Axios.get(`https://api.frankfurter.app/latest?from=${userDefaultCurrency}`).then((res) => {
//         setExchangeRates(res.data.rates);
//     });
// };

//     useEffect(() => {
//         fetchExchangeRates();
//     }, []);


//TARGET CURRENCY
// const targetCurrency = Object.keys(exchangeRates)[0];

// var targetCurrency = Object.keys(exchangeRates)[0];

// for (let i=0; i<exchangeRates.length; i++) {
//     targetCurrency = Object.keys(exchangeRates)[i];
//     console.log(targetCurrency);
// console.log(exchangeRates[`${targetCurrency}`]);
// }


// const targetExchangeRate = exchangeRates[`${targetCurrency}`];

// console.log(exchangeRates);
// console.log(baseCurrency);
// console.log(targetCurrency);
// console.log(targetExchangeRate);
// console.log(Object.keys(baseCurrency)[0]);
// console.log(JSON.stringify(baseCurrency));
// console.log(allRates);
  
    return(
        <>
        <div>
            {/* <ExchangeRatesTable /> */}
        {/* <Table striped bordered hover>
      <thead>
        <tr>
          <th>Currency</th>
          <th>Rate</th>
          <th>Change</th>
          <th>Favorite</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{baseCurrency}/{targetCurrency}</td>
          <td>{targetExchangeRate}</td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </Table> */}
        </div>
        </>
)};
            