import React, { useState } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';
import { Link, Navigate, useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();


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