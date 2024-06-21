import React, { useEffect, useState } from 'react'
import NavBar from "./NavBar.jsx"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button, Card, Table } from "react-bootstrap"
import { format } from "date-fns"
import { Checkbox, FormControlLabel } from "@mui/material"
import { DeleteForever, Star, StarBorder, Update } from "@mui/icons-material"
import { yellow } from "@mui/material/colors"
import checked from "@mui/material/Checkbox";
import { enUS } from "date-fns/locale"
import { jwtDecode } from 'jwt-decode'



export default function TransactionSearch(){

    const [sel, setSel] = useState("name")
    const [q, setQ] = useState("")
    const [ans, setAns] = useState([])
    const [transactions, setTransactions] = useState([])
    const[transaction, setTransaction] = useState({})
    const[checkedState, setCheckedState] = useState([]);
    const[username, setUsername] = useState()
    const[ansByUsername, setAnsByUsername] = useState([])
    const { ID } = useParams()

    const navigate = useNavigate();


    const userDefaultCurrency = "USD"

    //Use jwtDecode to get username from token in local storage
  
    useEffect(() => {
        if (localStorage.getItem('token') != undefined) {
        const tokenObj = jwtDecode(localStorage.getItem('token'));
        setUsername(tokenObj.sub)
        console.log(username)
        }
      }, [])
      console.log(username)

    function searchTransaction() {
        if (sel=="name") {
            fetch(`http://localhost:8080/transactions/searchByName?name=${q}`, {
            headers:{"Content-Type":"application/json",
            Authorization: 'Bearer ' + localStorage.getItem('token')},
            }).then(res=>res.json()).then((result)=>{ setAns(result);})

        } else if (sel == "amount") {
            if (isNaN(q)) {
                console.log('error')
            } else {
                fetch(`http://localhost:8080/transactions/searchByAmount?amount=${q}`, {
                headers:{"Content-Type":"application/json",
                Authorization: 'Bearer ' + localStorage.getItem('token')}, 
                }).then(res=>res.json()).then((result)=>{ setAns(result);})

            }
        } else if (sel == "budgetCategory") {

                fetch(`http://localhost:8080/transactions/searchByBudgetCategory?budgetCategory=${q}`, {
                headers:{"Content-Type":"application/json",
                Authorization: 'Bearer ' + localStorage.getItem('token')}, 
                }).then(res=>res.json()).then((result)=>{ setAns(result);})

            
        }
    }


    useEffect(()=>{
        console.log(localStorage.getItem('token'));
        fetch("http://localhost:8080/transactions/getByUsername", {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res=>res.json()).then((result)=>{setTransactions(result);})


},[])
console.log(transactions)

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
    
        fetch("http://localhost:8080/transactions/getByUsername", {
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

      const handleUpdate = (e,id,name,description,amount,currency,tripId) =>{
        e.preventDefault();
    //route dom useNavigate with state variable to be used with useLocation in other page
        navigate('/transactions/update/' + e.id, {state:{transactionId:e.id,name:e.name,description:e.description,amount:e.amount,currency:e.currency,tripId:tripId}})
    }
    const handleDelete = async (e,id,tripId) =>{
        e.preventDefault();
        console.log(e.id);
        navigate('/transactions/delete/' + id, {state:{tripId:tripId}});
    }
    //   const handleDelete = async (e,id, tripId) =>{
    //     e.preventDefault();
    //     console.log(id);
    //      const deleteTransaction = async (id)=>{
    //         await fetch("http://localhost:8080/transactions/" + id,{
    //             method:"DELETE",
    //             headers:{"Content-Type":"application/json",
    //             Authorization: 'Bearer ' + localStorage.getItem('token')}
    //         }).then(()=>console.log("transaction deleted"))}
    //         deleteTransaction(id);
    //         window.location.reload(true);
    //     }

useEffect(()=>{
        for (let i=0; i < ans.length; i++) {
            console.log(ans[i].username)
            if (ans[i].username === username && ansByUsername.includes(ans[i]) === false) {
                ansByUsername.push(ans[i])
                console.log(ansByUsername)
                setAns(ansByUsername);

            } else {
                setAns(ansByUsername)
            }
        }
    }, [ans])
        console.log(ansByUsername)
        console.log(ans)
    return (
    <div>
        <NavBar/>
        <br/>
        <br/>
        <br/>
        <Card className="shadow">
        <h1>Search Transactions</h1>
        <hr/>
        <br/>
        <input className="input-format" type="text" name = {q} onChange = {(e)=>setQ(e.target.value)} />
        <select className="input-format" name = {sel} value={sel} onChange = {(e)=>setSel(e.target.value)}>
            <option value="name">Name of Transaction</option>
            <option value="amount">Amount of Transaction</option>
            <option value="budgetCategory">Budget Category</option>

        </select>

        <br />
        <button className="btn btn-primary trip-button" onClick = {searchTransaction}>Search</button>
        </Card>        <br />

<Card className="shadow">
<h3>Results for Search Term: {q}</h3>
<br/>
        <Table striped  hover >
            <thead>
            <tr>
                <th></th>
                <th>Date</th>
                <th>Description</th>
                <th>Trip</th>
                <th>Category</th>
                <th>Amount (Local)</th>
                <th>Amount (USD)</th>
                <th></th>
            </tr>
            </thead>

            <tbody>
            {ans.map(a=>(
            <tr>
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
                <td>{format(a.date, "P")}</td>
                <td className="text-start"><p className="fw-bold text-nowrap">Payment to {a.name} </p>
                {a.description}</td>
                <td><Link to={`/trips/ID/${a.trip.id}`}>{a.trip.destination} ({a.trip.name})</Link></td>
                <td>{a.budgetCategory}</td>
                <td>{(a.amount).toLocaleString(enUS, {style: "currency", currency: a.currency})} </td>
                <td>{(a.convertedAmount).toLocaleString(enUS, {style: "currency", currency: "USD"})}</td>

                <td><Button className="btn btn-secondary trip-button" size="sm" onClick={(e)=>handleUpdate(e,ans.id,ans.name,ans.description,ans.amount,ans.currency)}><Update/></Button>
                    <Button className="btn btn-outline-secondary trip-button" size="sm" onClick={(e)=>handleDelete(e,ans.id,ans.tripId)}><DeleteForever/></Button></td>

            </tr>
            ))}
            </tbody>
        </Table>
        </Card>
    </div>
    );
}