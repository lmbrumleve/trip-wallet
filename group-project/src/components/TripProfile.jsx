import React from 'react'
import { Link } from 'react-router-dom'

export default function TripProfile() {
  return (
    <>
    <div>TripProfile</div>
    <Link to="/transactions/search" className="btn btn-primary">Search Transactions</Link>
    <br/>
    </>
  )
}
