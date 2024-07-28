import React, { useState, useEffect } from 'react'
import NavBar from "./NavBar.jsx";
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserRegistration() {
    const [formData, setFormData] = useState({
        username:'',
        password: '',
        firstName: '',
        lastName: '',
        currency: '',
        role: 'USER'
    });

    const navigate = useNavigate();

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevstate => ({
            ...prevstate,
            [name]:value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            fetch("http://localhost:8080/register", {

                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify(formData)

            }).then(res=>res.json()).then((result)=>{

                localStorage.setItem("token", result['token']);
                console.log(localStorage.getItem('token'));
                console.log(result['token']);

                navigate("/")
            })

//
//             const response = await axios.post('http://localhost:8080/register', formData);
//             console.log(response.data);
        } catch (error) {
            console.error('Registration failed:', error);
            alert("Registration failed. Please try again.")
        }
    };


    return(
    <div>
        <NavBar />
        <br/>
        <br/>
        <br/>
        <h1>Create New Account</h1>
        <hr/>
        <br/>
        <form method="POST">
            <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <br />

            <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
            <br />

            {/* <div className="form-group">
                <label htmlFor="role">Role</label>
                <input type="text" className="form-control" id="role" name="role" value={formData.role} onChange={handleChange} />
            </div>
            <br /> */}

            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="username" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} required />
            </div>
            <br />

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <br />

            {/* <div className="form-group"> */}
                <label htmlFor="currency">Preferred Currency</label>
                <br />
                <select  id="currency" name="currency" onChange = {(e)=>handleChange(e)}>
                    <option value="">-</option>
                    {currencyArr.map((ans) => {
                            return (
                            <option value={ans}>{ans}</option>
                            )
                            })}
                            </select>

            {/* </div> */}
            <br/>

            <input type="submit" className="btn btn-primary trip-button" onClick={handleSubmit}/>
        </form>
    </div>
    );
}