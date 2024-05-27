import Header from "./Header.jsx"
import NavBar from "./NavBar.jsx";
import React, { useState } from 'react'

export default function Test() {

    const [sel, setSel] = useState("A")

return(
    <>
        <NavBar/>
        <Header />
        <div>This is the Test Component</div>

        <select value = {sel} onChange={e=>setSel(e.target.value)}>
            <option value = "A">A</option>
            <option valye="B">B</option>
        </select>

        <hr />
        <p>{sel}</p>
    </>
);}