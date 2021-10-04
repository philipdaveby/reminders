import React from 'react'
import { Link } from 'react-router-dom'
/* 
Logga
Profile
*/

const NavBar = () => {
    return (
        <nav className="flex justify-around border-b">
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
        </nav>
    )
}

export default NavBar
