import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavBar = () => {

    const location = useLocation();

    return (
        <div className='fixed w-full bg-white'>
            <nav className="flex justify-around items-center h-12 m-auto max-w-2xl">
                <Link to={{pathname: "/", state: { prevPath: location.pathname }}} className="border-b border-t px-2 text-lg text-textblue">HOME</Link>
                <Link to={{pathname: "/profile", state: { prevPath: location.pathname }}} className="border-b border-t px-2 text-lg text-textblue">PROFILE</Link>
            </nav>
        </div>
    )
}

export default NavBar
