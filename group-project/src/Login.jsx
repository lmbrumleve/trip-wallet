import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';
import { Link, Navigate, useNavigate } from 'react-router-dom';


export default function Login() {
    const navigate = useNavigate();
    const[currencies, setCurrencies] = useState([]);
    const[currencyCodes, setCurrencyCodes] = useState({});
    const[userId, setUserId] = useState();
    const[currencyIdUserId, setCurrencyIdUserId] = useState({});
    const[loaded, setLoaded] = useState(false);
    const[data, setData] = useState([]);

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', formData)
            localStorage.setItem("token", response.data['token'])
            console.log(localStorage.getItem('token'));
            navigate("/")

        } catch (error) {
            console.error('Login failed:', error);
            alert("Invalid Login")
        }
    };

 //Get userID by username
const fetchUserIdByUsername = async () => {
    fetch(`http://localhost:8080/favorites/getUserId`, {
      headers:{"Content-Type":"application/json",
      Authorization: 'Bearer ' + localStorage.getItem('token')},
      }).then(res=>res.json()).then((result)=>{setUserId(result);})
      
      }
    
      useEffect(() => {
        fetchUserIdByUsername();
      }, [])

      console.log(userId)
    //Fetch Currency Codes 

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
  
  
  const currencyArr = Object.keys(currencies);
  console.log(currencyArr)
   
//   //Post codes from Frankfurter API to MySQL
//   const postCurrencyCodes = () => { 
    
//   // if (currencyCodes.length === 0) { 
//   for(let i=0; i<currencyArr.length; i++){
  
//     fetch("http://localhost:8080/currencyCode/add", {
   
//       method:"POST",
//       headers:{
//           "Content-Type":"application/json",
//           Authorization: 'Bearer ' + localStorage.getItem('token')
//         },
//           body:JSON.stringify({name: currencyArr[i]})
//       })
//     }
//   }
//   useEffect(() => {
//     postCurrencyCodes(); 
//   }, [currencies])

//   const getCurrencyCodes = () => {
 
//     fetch("http://localhost:8080/currencyCode/getAll", {
 
//     method:"GET",
//     headers:{
//         "Content-Type":"application/json",
//         Authorization: 'Bearer ' + localStorage.getItem('token')
//       },
//              }).then(res=>res.json()).then((result)=>{setCurrencyCodes(result);})
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//         setData(await getCurrencyCodes());
//         setLoaded(true);
//     }
//     fetchData();
//   }, []); 

//   console.log(currencyCodes)
 
  const postFavorites = () => {
    let favObj = {}; 
    let favObjArr = [];

    for(let i=0; i<currencyArr.length; i++){     
      favObj = {  
        favorite: false,   
        currencyCode:  
        {name: currencyArr[i]},   
        user:     
        {id: userId}  
      }  
      favObjArr.push(favObj); 
      console.log(favObj);   

      fetch("http://localhost:8080/favorites/add", {

      method:"POST",
      headers:{ 
          "Content-Type":"application/json",   
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
          body:JSON.stringify(favObj)
      }) 
     
  }

  } 
   
useEffect(() => {
    postFavorites();
}, [currencyArr, userId])



// console.log(currencyCodes)
//     useEffect(() => {

//         let favorite = {
//             favorite: false,
//             currencyCodeId: 0,
//             userId: userId
//         }
//         for(let i=0; i<currencyArr.length; i++) {
//             // favorite.currencyCodeId = currencyCodes[i].id
//             // currencyIdUserId.push(favorite)
//         }
//         console.log(currencyIdUserId)

//       }, [userId, currencyCodes, currencyArr])


// const postCodeIdUserId = () => {
//     for(let i=0; i<currencyArr.length; i++){
// console.log(currencyArr[i])
// console.log(userId)
//       fetch("http://localhost:8080/favorites/add", {
   
//       method:"POST",
//       headers:{
//           "Content-Type":"application/json",
//           Authorization: 'Bearer ' + localStorage.getItem('token')
//         },
//           body:JSON.stringify(currencyIdUserId)
//       })
//   } 
// }
  
//   useEffect(() => {
//     postCodeIdUserId();
//   }, [currencyCodes, currencyArr, userId])

    return (
        <>
        <NavBar />
        <br/>
        <br/>
        <br/>
        <h1>Sign in to Trip Wallet</h1>
        <br/>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="username" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <br></br>
                <button type="submit" className="btn btn-primary btn-lg">Sign In</button>
            </form>
            <br></br>
            <Link to="/register" className="btn btn-success btn-lg">Create an Account</Link>
        </>
    );
}