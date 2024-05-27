import Header from "./Header.jsx"
import React, { useEffect, useState } from 'react'
import NavBar from "./NavBar.jsx"
import { Link, useNavigate } from "react-router-dom"
import { Card } from "react-bootstrap"
import { format } from "date-fns"
import { Checkbox, FormControlLabel } from "@mui/material"
import { Star, StarBorder } from "@mui/icons-material"
import { yellow } from "@mui/material/colors"
import checked from "@mui/material/Checkbox";



export default function TransactionSearch(){

    const [sel, setSel] = useState("name")
    const [q, setQ] = useState("")
    const [ans, setAns] = useState([])
    const [transactions, setTransactions] = useState([])
    const[transaction, setTransaction] = useState({})
    const[checkedState, setCheckedState] = useState([]);

    const navigate = useNavigate();


    const userDefaultCurrency = "USD"

    function searchTransaction() {
        if (sel=="name") {
            fetch(`http://localhost:8080/transactions/searchByName?name=${q}`, {
            headers:{"Content-Type":"application/json",
            Authorization: 'Bearer ' + localStorage.getItem('token')},
            }).then(res=>res.json()).then((result)=>{setAns(result);})
        } else if (sel == "amount") {
            if (isNaN(q)) {
                console.log('error')
            } else {
                fetch(`http://localhost:8080/transactions/searchByAmount?amount=${q}`, {
                headers:{"Content-Type":"application/json",
                Authorization: 'Bearer ' + localStorage.getItem('token')},
                }).then(res=>res.json()).then((result)=>{setAns(result);})
            }
        }

    
    }

    useEffect(()=>{
        // setIsLoading(true)
//            fetch("http://localhost:8080/transactions/getAll").then(res=>res.json()).then((result)=>{setTransactions(result);})
        console.log("first useeffect");
        console.log(localStorage.getItem('token'));
        fetch("http://localhost:8080/transactions/getAll", {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res=>res.json()).then((result)=>{setTransactions(result);})

    //   navigate('/transactions/search')

        // setIsLoading(false)


},[])

// if (isLoading) {
//     return (<div>Fetching transactions from database</div>);
// }


// console.log(transactions)

useEffect(()=>{
    console.log("second useeffect")
    const newArr = []
    for(let i=0; i<transactions.length; i++) {
        // console.log(transactions[i]["favorite"])
        newArr.push(transactions[i]["favorite"] === false ? false : true)
    // console.log(newArr);
    }
    setCheckedState(newArr);
    // console.log(checkedState)
}, [transactions])

console.log(checkedState)

    //Handle Click for Favorite Buttons
    const handleFavorite = async (e,id,position) => {
        await fetch("http://localhost:8080/transactions/favorite/" + id, {
            method: "PUT",
            headers:{"Content-Type":"application/json",
                    Authorization: 'Bearer ' + localStorage.getItem('token')},
            body:JSON.stringify(transaction)
        }).then((response)=>{
        //     navigate('/transactions', {state:{transactionId:id,favorite:favorite}});
        }).catch((error)=>{
            console.log(error);
        })
    
        fetch("http://localhost:8080/transactions/getAll", {
            headers:{"Content-Type":"application/json",
                    Authorization: 'Bearer ' + localStorage.getItem('token')},
            }).then(res=>res.json()).then((result)=>{setTransactions(result);})
    
    
        const arr = []
        for(let i=0; i<transactions.length; i++) {
            // console.log(transactions[i]["favorite"])
            arr.push(transactions[i]["favorite"] === false ? false : true)
        console.log(arr);
        }
        setCheckedState(arr);
        console.log(checkedState)
        searchTransaction();
        
      }
    
      console.log(transactions)


    return (
    <div>
        <NavBar/>
        <Card className="shadow">
        <h1>Search Transactions</h1>
        <hr/>
        <br/>
        <input className="input-format" type="text" name = {q} onChange = {(e)=>setQ(e.target.value)} />
        <select className="input-format" name = {sel} value={sel} onChange = {(e)=>setSel(e.target.value)}>
            <option value="name">Name of Transaction</option>
            <option value="amount">Amount of Transaction</option>

        </select>

        <br />
        <button className="btn btn-primary trip-button" onClick = {searchTransaction}>Search</button>
        </Card>        <br />

<Card className="shadow">
<h3>Results for Search Term: {q}</h3>
        <hr />
        <table>
            <tr>
                <th>Date</th>
                <th>Transaction</th>
                <th>Note</th>
                <th>Trip</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Converted Amount</th>
                <th></th>
            </tr>

            {ans.map(a=>(
            <tr>
                <td>{format(a.date, "P")}</td>
                <td>{a.name}</td>
                <td>{a.description}</td>
                <td><Link to={`/trips/ID/${a.trip.id}`}>{a.trip.destination} ({a.trip.name})</Link></td>
                <td>{a.budgetCategory}</td>
                <td>{a.amount} {a.currency}</td>
                <td>{a.convertedAmount} {a.userDefaultCurrency}</td>
                <td>                    
                    <FormControlLabel
                            control = {
                                <Checkbox value = {checked[a.id]}
                                    icon = {<StarBorder color="disabled" />}
                                    checkedIcon = {<Star sx={{ color: yellow[800] }} />}
                                    // checked = {ans.favorite === false ? false : true}
                                    checked = {a.favorite}
                                    onClick = {(e)=>handleFavorite(e, a.id, a.favorite)}
                                    // onValueChange={(newValue) => { setChecked({...checked, [ans.id]: newValue}) }}

                        />
                    }
                    />
                </td>
            </tr>
            ))}
        </table>
        </Card>
    </div>
    );
}