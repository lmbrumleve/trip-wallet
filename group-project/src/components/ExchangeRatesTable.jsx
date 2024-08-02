import { useState, useEffect } from 'react'
import Axios from "axios";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Checkbox from "@mui/material/Checkbox";
import checked from "@mui/material/Checkbox";
import { jwtDecode } from 'jwt-decode';
import { Token } from '@mui/icons-material';
import { id } from 'date-fns/locale';
import { blue, pink } from '@mui/material/colors';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { Tooltip } from '@mui/material';
import '../App.css';


export default function ExchangeRatesTable () {

  const [ userDefaultCurrency, setUserDefaultCurrency ] = useState("");
  const [date, setDate] = useState("");
  const [exchangeRates, setExchangeRates] = useState("");
  const [currencyExchangeRates, setCurrencyExchangeRates] = useState([]);
  const [username, setUsername] = useState({});
  const [favoriteByUsername, setFavoriteByUsername] = useState({})
  const[checkedState, setCheckedState] = useState([]); 
  const[isLoading, setIsLoading] = useState(false);
  const[currencies, setCurrencies] = useState([]);
  const[favoriteByUsernameId, setFavoriteByUsernameId] = useState({});


//Use jwtDecode to get username from token in local storage
  
    useEffect(() => {
        if (localStorage.getItem('token') != undefined) {
        const tokenObj = jwtDecode(localStorage.getItem('token'));
        setUsername(tokenObj.sub)
        console.log(username)
        }
      }, [])
      console.log(username)

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

//would be best to fetch user by username, then use the user id to fetch favorite rates by user

//Get current data from favorite rates table in database (first time will be empty)
const fetchFavoriteByUsername = async () => {
try{
const response = await fetch("http://localhost:8080/favorite/entries", {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }).then(res=>res.json()).then((result)=>{setFavoriteByUsername(result);})
            
    } catch (error) {
      console.error("Failed to fetch: ", error);
    }
  
  }

  useEffect(() => {
    fetchFavoriteByUsername();
  }, [])

  console.log(favoriteByUsername)

//Create favorite rates object for favorite rates table in the database

let favoriteRate;
let favoriteRateArr = [];

for (let i=0; i<currencyArr.length; i++){
    favoriteRate = {
        username: username,
        currencyCode: currencyArr[i], 
        favorite: false
      };
      favoriteRateArr.push(favoriteRate);
    }
console.log(favoriteRateArr)
 
//Put favorite rates object in the favorite rates table in database initial time (if needed)
console.log(favoriteByUsername.length)

// console.log(favoriteRateArr)
const postFavoriteRateArr = () => {
for(let i=0; i<currencyArr.length; i++){
  console.log(favoriteRateArr[i])

//if there is no data in the table, add the favoriteRateArr data to the favorite rates table in database
//would be best to base this on the user id not on the username
if(favoriteByUsername.length === 0){ 

    fetch("http://localhost:8080/favorite/add", {

    method:"POST",
    headers:{
        "Content-Type":"application/json",
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
        body:JSON.stringify(favoriteRateArr[i])
    })
  
}

} 
}
useEffect (() => { 
postFavoriteRateArr();
fetchFavoriteByUsername();
}, []);
console.log(favoriteByUsername);
//       console.log(favoriteRateArr)


    const today = new Date();
    var yesterday = new Date();
    yesterday.setDate(today.getDate() - 7);

  //FETCH DATE:
  const fetchDate = async () => {
  await Axios.get(`https://api.frankfurter.app/latest?from=${userDefaultCurrency}`).then((res) => {
        setDate(res.data.date);
        });
    };

    useEffect(() => {
    fetchDate();
    }, []);
console.log(userDefaultCurrency)
  //FETCH RATES:

  const fetchExchangeRates = async () => {
      await Axios.get(`https://api.frankfurter.app/latest?from=${userDefaultCurrency}`).then((res) => {
          setExchangeRates(res.data.rates);
      });
  };
  
      useEffect(() => {
          fetchExchangeRates();
      }, []);

      useEffect(() => {
        setCurrencyExchangeRates(Object.keys(exchangeRates));

      }, [exchangeRates])
  
// console.log(Object.keys(exchangeRates));

// console.log(currencyExchangeRates)



//DETERMINE CHANGE OF RATE

  //  FETCH YESTERDAY'S RATE
  const year = yesterday.getFullYear();
  
  var yesterdayDate = yesterday.getDate();
  if (yesterdayDate.toString().length === 1) {
    yesterdayDate = "0" + yesterdayDate;
  }

  var yesterdayMonth = yesterday.getMonth() + 1;
  if (yesterdayMonth.toString().length === 1) {
    yesterdayMonth = "0" + yesterdayMonth.toString();
  }

  const [yesterdayExchangeRates, setYesterdayExchangeRates] = useState("");

  const fetchYesterdayExchangeRates = async () => {
      await Axios.get(`https://api.frankfurter.app/${year.toString()}-${yesterdayMonth.toString()}-${yesterdayDate.toString()}?from=${userDefaultCurrency}`).then((res) => {
          setYesterdayExchangeRates(res.data.rates);
      });
  };
  
      useEffect(() => {
          fetchYesterdayExchangeRates();
      }, []);
      // console.log(year.toString() + "-" + yesterdayMonth.toString() + "-" + yesterdayDate.toString())
      // console.log(yesterdayExchangeRates);

  //TARGET CURRENCY + TARGET RATE:
  let targetCurrency;
  let targetExchangeRate; 
  let targetRateObj;
  var allRates = [];

  let yesterdayTargetCurrency;
  let yesterdayTargetExchangeRate;
  let yesterdayTargetRateObj;
  var yesterdayAllRates = [];

  const yearToday = today.getFullYear();
  // console.log(yearToday);
  var todayDate = today.getDate();
  if (todayDate.toString().length === 1) {
    todayDate = "0" + todayDate;
  }
  // console.log(todayDate);
  var todayMonth = today.getMonth() + 1;
  if (todayMonth.toString().length === 1) {
    todayMonth = "0" + todayMonth.toString();
    // console.log(todayMonth);
  }

  console.log(Object.keys(exchangeRates).length)

  for(let i=0; i<Object.keys(exchangeRates).length; i++) {
  targetCurrency = Object.keys(exchangeRates)[i];
  targetExchangeRate = exchangeRates[`${targetCurrency}`];
  // console.log(targetCurrency);
  // console.log(targetExchangeRate)
// console.log(favoriteByUsername)
  targetRateObj = 
  {
    // amount: `${amount}`,
    base: `${userDefaultCurrency}`,
    date: `${yearToday.toString()}-${todayMonth.toString()}-${todayDate.toString()}`,
    currencyCode: `${targetCurrency}`,
    rate: `${targetExchangeRate}`,
    favorite: false,
    username: `${username}`,
}

// console.log(targetRateObj);

yesterdayTargetCurrency = Object.keys(yesterdayExchangeRates)[i];
yesterdayTargetExchangeRate = yesterdayExchangeRates[`${yesterdayTargetCurrency}`];
// console.log(yesterdayTargetCurrency);
// console.log(yesterdayTargetExchangeRate);

yesterdayTargetRateObj =
{ 
  // amount: `${amount}`,
  base: `${userDefaultCurrency}`,
  date: `${year.toString()}-${yesterdayMonth.toString()}-${yesterdayDate.toString()}`,
  target: `${yesterdayTargetCurrency}`,
  rate: `${yesterdayTargetExchangeRate}`
}

// console.log(yesterdayTargetRateObj);

if ((targetExchangeRate - yesterdayTargetExchangeRate) > 0) {
  targetRateObj.rateIncrease = "▲";
  // console.log(targetRateObj.rateIncrease);
  // console.log(`${userDefaultCurrency}/${targetCurrency} the rate went up`);
} else if ((targetExchangeRate - yesterdayTargetExchangeRate) < 0){
  targetRateObj.rateIncrease = "▼";
  // console.log(targetRateObj.rateIncrease);
  // console.log(`${userDefaultCurrency}/${targetCurrency} the rate went down`);
} else {
  targetRateObj.rateIncrease = "no change"
}

    for(let j=0; j<favoriteByUsername.length; j++){
      if (targetRateObj.username === favoriteByUsername[j].username){
        for(let k=0; k<favoriteByUsername.length; k++) {
          if (targetRateObj.currencyCode === favoriteByUsername[k].currencyCode) {
            targetRateObj.id = favoriteByUsername[k].id;
            targetRateObj.favorite = favoriteByUsername[k].favorite;
          }
        }
      }
    }

// console.log(targetRateObj)
    allRates.push(targetRateObj);
    JSON.stringify(allRates);
    // console.log(allRates);

}
console.log(allRates)

  //Handle Click for Favorite Buttons
  const handleFavorite = async (e, id, favorite) => {

await fetch("http://localhost:8080/favorite/" + id, {
  method: "PUT",
  headers:{"Content-Type":"application/json",
          Authorization: 'Bearer ' + localStorage.getItem('token')},
  body:JSON.stringify(favoriteRate)
}).then((response)=>{

}).catch((error)=>{
  console.log(error);
})


await fetch("http://localhost:8080/favorite/entries", {
  headers:{"Content-Type":"application/json",
          Authorization: 'Bearer ' + localStorage.getItem('token')},
  }).then(res=>res.json()).then((result)=>{setFavoriteByUsername(result);})

console.log(favoriteByUsername)

    console.log(allRates)
    console.log(favoriteByUsername)

    for(let j=0; allRates.length-1; j++){
      console.log(allRates[j]["id"])
      const allRatesId = allRates[j].id
      const favoriteByUsernameId = favoriteByUsername[j].id
      if(allRatesId === favoriteByUsernameId) { 
          allRates[j].favorite = favoriteByUsername[j].favorite;
        }
      }
    
  console.log(allRates)
    
}

    return(
        <>
        <div>
        <Table striped bordered hover>
      <thead>
        <tr>
          {/* <th>Currency</th>
          <th>Rate</th>
          <th>Change</th> */}
          <td>Currency</td>
          <td>1.00 {userDefaultCurrency}</td>
          <td>Change</td>
        </tr>
      </thead>
      {console.log(allRates)}
        {allRates?.map((data) =>{
            return (
                <tbody>
                    <tr>
                    <td>
                                         
                  <Tooltip title="Mark as favorite"><FormControlLabel
                          control = {
                              <Checkbox key={checked[data.id]}
                                  icon = {<FavoriteBorderIcon color="disabled"/>}
                                  checkedIcon = {<FavoriteIcon sx={{ color: blue }} />}
                                  checked = {data.favorite}
                                  onClick = {(e)=>handleFavorite(e, data.id, data.favorite)}

                      />
                      }
                      // label = {data.target}
                      /></Tooltip>
                      <Link to={`/timeSeriesGraph/${userDefaultCurrency}/${data.currencyCode}`}>{data.currencyCode}</Link></td>
                    <td>{data.rate}</td>
                    <td>      
                      <span
                        className={
                          data.rateIncrease === "▲" ? "green-arrow" : 
                          data.rateIncrease === "▼" ? "red-arrow" : ""
                        }
                      >{data.rateIncrease}
                      </span>
                      </td>
                    </tr>
                </tbody>
            )
        })}

    </Table>
        </div>
        </>

)};
      
export var allRates;
export var userDefaultCurrency;
// export var targetCurrency;