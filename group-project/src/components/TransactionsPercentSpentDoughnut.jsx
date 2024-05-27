import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { useParams } from 'react-router-dom';

export default function TransactionsPercentSpentDoughnut() {

  //2 parameters will be amount spent and (budgeted amount- amount spent)

  const [transactions, setTransactions] = useState([{name: "", description: "", amount: 0, convertedAmount: 0, currency: "", budgetCategory:""}]);
  const [totalTransactions, setTotalTransactions] = useState([]);
  const [budgetCategoryArr, setBudgetCategoryArr] = useState([]);
  const [totalSpent, setTotalSpent] = useState()
  const [totalRemaining, setTotalRemaining] = useState()
  const [trip, setTrip] = useState({})

  const userDefaultCurrency = "USD";
  const {ID} = useParams();


  useEffect(()=>{
      // console.log(typeof ID)
      fetch("http://localhost:8080/trips/ID/" + ID, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(res=>res.json()).then((result)=>{setTrip(result);})
      fetch("http://localhost:8080/transactions/searchByTripID?ID=" + ID,{headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(res=>res.json()).then(result=>{setTransactions(result);})

console.log(trip)
console.log(transactions)
},[transactions])

useEffect (() => {
  let numAmount;
  let total = 0;
      for (let i=0; i<transactions.length; i++) {
          numAmount = Number(transactions[i].convertedAmount);
          total+=numAmount;
      }

  setTotalSpent(total);
  console.log(totalSpent)
  setTotalRemaining(trip.budget - totalSpent);
  console.log(totalRemaining)

  })

  return (
    <>
    <h2>Trip Summary</h2>
        <Doughnut
            data={{
              labels: ["Total Spent", "Amount Remaining"],
              datasets:[
                {
                    label: "Amount",
                    data: [totalSpent, totalRemaining],
                    backgroundColor:['#54B4D3', "#EBEBE4"
                      // '#ef476f', '#14A44D',  '#f78c6b', '#ffd166', '#3B71CA'
                        // "rgba(43, 63, 229, 0.8)",
                        // "rgba(250, 192, 19, 0.8)",
                        // "rgba(253, 135, 135, 0.8)",
                    ]

                }
              ]
            }}
        />
        <br/>
            <h5>Total Trip Budget: {trip.budget} {userDefaultCurrency}</h5>

        </>
  )
}
