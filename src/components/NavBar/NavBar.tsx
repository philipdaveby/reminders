import React from 'react'
import { Link } from 'react-router-dom'
/* 
Logga
Profile
*/

const NavBar = () => {
    return (
        <nav className="grid grid-cols-3 border-b h-10">
            <Link to="/">R</Link>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
        </nav>
    )
}

export default NavBar
