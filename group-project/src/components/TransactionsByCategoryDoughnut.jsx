import React, { useEffect, useState } from 'react'
import { Chart, Doughnut } from 'react-chartjs-2'
import { Colors } from 'chart.js';
import { colors } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function TransactionsByCategoryDoughnut() {

    const [transactions, setTransactions] = useState([{name: "", description: "", amount: 0, convertedAmount: 0, currency: "", budgetCategory:""}]);
    const [totalTransactions, setTotalTransactions] = useState([]);
    const [budgetCategoryArr, setBudgetCategoryArr] = useState([]);
    const [trip, setTrip] = useState({})

    const userDefaultCurrency = "USD";
    const {ID} = useParams();


    useEffect(()=>{
        // console.log(typeof ID)
        fetch("http://localhost:8080/trips/ID/" + ID, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(res=>res.json()).then((result)=>{setTrip(result);})
        fetch("http://localhost:8080/transactions/searchByTripID?ID=" + ID,{headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(res=>res.json()).then(result=>{setTransactions(result);})

console.log(trip)
console.log(transactions)
            let tempArr = [];
            let finalArr = [];

        for (let i=0; i<transactions.length; i++) {
          if (!(budgetCategoryArr.includes(transactions[i].budgetCategory))) {
             budgetCategoryArr.push(transactions[i].budgetCategory)
          } 
          if(budgetCategoryArr.includes(null)) {
            budgetCategoryArr.pop(null)
          }
          if(budgetCategoryArr.includes('')) {
            budgetCategoryArr.pop('')
          }
        }
        console.log(budgetCategoryArr)

             //Sum of all Food
           const reduceFood = transactions.reduce((acc,next)=>
            {
                if(next.budgetCategory==="Food"){return acc + next.convertedAmount}
                return acc;
            },0)
 
            tempArr.push({budgetCategory: 'Food', convertedAmount: reduceFood});

            //Sum of all Lodging
            const reduceLodging = transactions.reduce((acc,next)=>
                {
                    if(next.budgetCategory==="Lodging"){return acc + next.convertedAmount}
                    return acc;
                },0)
     
                tempArr.push({budgetCategory: 'Lodging', convertedAmount: reduceLodging});
            
            //Sum of all Transportation
            const reduceTransportation = transactions.reduce((acc,next)=>
                {
                    if(next.budgetCategory==="Transportation"){return acc + next.convertedAmount}
                    return acc;
                },0)
     
                tempArr.push({budgetCategory: 'Transportation', convertedAmount: reduceTransportation});

            //Sum of all Recreation
            const reduceRecreation = transactions.reduce((acc,next)=>
                {
                    if(next.budgetCategory==="Recreation"){return acc + next.convertedAmount}
                    return acc;
                },0)
     
                tempArr.push({budgetCategory: 'Recreation', convertedAmount: reduceRecreation});

            //Sum of all Souveneirs
            const reduceSouveneirs = transactions.reduce((acc,next)=>
                {
                    if(next.budgetCategory==="Souveneirs"){return acc + next.convertedAmount}
                    return acc;
                },0)
     
                tempArr.push({budgetCategory: 'Souveneirs', convertedAmount: reduceSouveneirs});

            //Sum of all Other
            const reduceOther = transactions.reduce((acc,next)=>
                {
                    if(next.budgetCategory==="Other"){return acc + next.convertedAmount}
                    return acc;
                },0)
     
                tempArr.push({budgetCategory: 'Other', convertedAmount: reduceOther});
                
            tempArr.map((data)=>{
                if(data.amount === 0){return}
                else{finalArr.push(data)}
            })
            console.log(finalArr)
            setTotalTransactions(finalArr);
 
     },[transactions])
    
     console.log(totalTransactions);

  return (
    <>
    <h2>Spending by Category</h2>
        <Doughnut
            data={{
              labels: totalTransactions.map((data)=> data.budgetCategory),
              datasets:[
                {
                    label: "Amount",
                    data: totalTransactions.map((data)=> data.convertedAmount),
                    backgroundColor:[
                        '#ef476f', '#14A44D', '#3B71CA', '#f78c6b', '#ffd166', '#54B4D3'
                        // "rgba(43, 63, 229, 0.8)",
                        // "rgba(250, 192, 19, 0.8)",
                        // "rgba(253, 135, 135, 0.8)",
                    ]

                }
              ]
            }}
        />
        </>
  )
}
