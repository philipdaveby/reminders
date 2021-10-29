import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav className="flex justify-around items-center h-12 w-full max-w-lg bg-white fixed">
            <Link to="/" className="text-lg text-textblue">HOME</Link>
            <Link to="/profile" className="text-lg text-textblue">PROFILE</Link>
        </nav>
    )
}

export default NavBar
