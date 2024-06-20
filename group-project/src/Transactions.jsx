import { useNavigate,Link,Outlet } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import NavBar from "./components/NavBar.jsx"
import FormControlLabel from "@mui/material/FormControlLabel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Star, StarBorder, Update } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import checked from "@mui/material/Checkbox";
import { set } from "date-fns/fp/set";
import { format } from "date-fns";
import { DeleteForever } from "@mui/icons-material";
import { Button, Card, Table } from "react-bootstrap";
import { pink, yellow } from "@mui/material/colors";
import AddIcon from '@mui/icons-material/Add';
import { enUS } from "date-fns/locale";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Tooltip } from "@mui/material";
import UpdateButton from "./components/UpdateButton.jsx";


export default function Transactions(props) {

    const[transactions, setTransactions] = useState([])
    const[transaction, setTransaction] = useState({})
    const[isLoading, setIsLoading] = useState(false)
    const[toDelete, setToDelete] = useState({})
    // const[favorite, setFavorite] = useState(false);
    const[isChecked, setIsChecked] = useState({});
    const[checkedState, setCheckedState] = useState([]);
    const[totalSpent, setTotalSpent] = useState([]);

    const userDefaultCurrency = "USD";
    const navigate = useNavigate();

    useEffect(()=>{
            setIsLoading(true)
//            fetch("http://localhost:8080/transactions/getAll").then(res=>res.json()).then((result)=>{setTransactions(result);})
            console.log("first useeffect");
            console.log(localStorage.getItem('token'));
            fetch("http://localhost:8080/transactions/getAll", {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res=>res.json()).then((result)=>{setTransactions(result);})



            setIsLoading(false)


    },[])

    if (isLoading) {
        return (<div>Fetching transactions from database</div>);
    }


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

    const handleDelete = async (e,id, tripId) =>{
        e.preventDefault();
        console.log(id);
         const deleteTransaction = async (id)=>{
            await fetch("http://localhost:8080/transactions/" + id,{
                method:"DELETE",
                headers:{"Content-Type":"application/json",
                Authorization: 'Bearer ' + localStorage.getItem('token')}
            }).then(()=>console.log("transaction deleted"))}
            deleteTransaction(id);
            window.location.reload(true);
        }

    const handleUpdate = (e,id,name,description,amount,currency) =>{
        e.preventDefault();
    //route dom useNavigate with state variable to be used with useLocation in other page
        navigate('/transactions/update/' + id, {state:{transactionId:id,name:name,description:description,amount:amount,currency:currency}})
    }
    //buttons used to find by id through @queryParam & to pass data to update page

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
    
  }

  console.log(transactions)
useEffect (() => {
let numAmount;
let total = 0;
    for (let i=0; i<transactions.length; i++) {
        numAmount = Number(transactions[i].convertedAmount);
        total+=numAmount;
    }
setTotalSpent(total);
console.log(totalSpent)
})

    return(
        <>
            <NavBar />
            <br/>
            <br/>
            <br/>

            <Card>
            <Tooltip title="Add Transaction">
                <Button size="sm" className="position-top-right btn btn-outline-primary transaction-button" onClick={(e) => navigate("/transactions/add")}><AddIcon/></Button>
                </Tooltip>
            <h1>Transaction History</h1>
            {/* <hr/> */}
            <br/>

            <Table striped  hover>
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
                {transactions.map((ans)=>(
                <tr>
                                        <td>
                    <Tooltip title="Mark as important"><FormControlLabel
                            control = {
                                <Checkbox value={checked[ans.id]}
                                    icon = {<StarBorder color="disabled" />}
                                    checkedIcon = {<Star sx={{ color: yellow[800] }} />}
                                    // checked = {ans.favorite === false ? false : true}
                                    checked = {ans.favorite}
                                    onClick = {(e)=>handleFavorite(e, ans.id, ans.favorite)}
                                    // onValueChange={(newValue) => { setChecked({...checked, [ans.id]: newValue}) }}

                        />
                              }
                        /></Tooltip>
                    </td>
                    <td>{format(ans.date, "P")}</td>
                    <td className="text-start"><p className="fw-bold text-nowrap">Payment to {ans.name} </p>
                {ans.description}</td>
                    <td><Tooltip title="Navigate to Trip Profile"><Link to={`/trips/ID/${ans.trip.id}`}>{ans.trip.destination} ({ans.trip.name})</Link></Tooltip></td>
                    <td>{ans.budgetCategory}</td>
                    <td>{(ans.amount).toLocaleString(enUS, {style: "currency", currency: ans.currency})}</td>
                    <td>{(ans.convertedAmount).toLocaleString(enUS, {style: "currency", currency: "USD"})}</td>
                    <td>
                        {/* <UpdateButton type="Transaction" /> */}
                <Tooltip title="Update Transaction"><Button className="btn btn-secondary trip-button" size="sm" onClick={(e)=>handleUpdate(e,ans.id,ans.name,ans.description,ans.amount,ans.currency)}><Update/></Button></Tooltip>
                    <Tooltip title="Delete Transaction"><Button className="btn btn-outline-secondary trip-button" size="sm" onClick={(e)=>handleDelete(e,ans.id,ans.tripId)}><DeleteForever/></Button></Tooltip></td>

                </tr>
                ))}
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="bold-font">Total Spent: </td>
                    <td className="bold-font">{totalSpent.toLocaleString(enUS, {style: "currency", currency: "USD"})}</td>
                    <td></td>
                </tr>
                </tbody>
            </Table>
            </Card>
            <br/>
            <Link to="/transactions/search" className="btn btn-primary trip-button">Search Transactions</Link>
            <br/>

            <Outlet />
        </>
);}