import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {

    return (
        <div className='fixed w-full bg-white z-10'>
            <nav className="flex justify-around items-center h-12 m-auto max-w-2xl">
                <Link to= "/" className="border-b border-t px-2 text-lg text-textblue">HOME</Link>
                <Link to="/profile" className="border-b border-t px-2 text-lg text-textblue">PROFILE</Link>
            </nav>
        </div>
    )
}

export default NavBar
