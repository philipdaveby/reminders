import React from 'react'
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

const NavBar = () => {

    const history = useHistory();

    return (
        <div className='w-full'>
            <div className="fixed w-full bg-white z-10">
                <nav className='flex justify-around items-center h-12 m-auto max-w-2xl'>
                    <NavLink exact to= "/" className={(isActive) => isActive ? "border-b-2 border-t-2 font-medium tracking-wide px-2 text-lg text-textblue hover:text-textdarkblue" : "border-b border-t opacity-90 tracking-wide px-2 text-lg text-textblue hover:text-textdarkblue"}>HOME</NavLink>
                    <NavLink to="/profile" className={(isActive) => isActive ? "border-b-2 border-t-2 font-medium tracking-wide px-2 text-lg text-textblue hover:text-textdarkblue" : "border-b border-t opacity-90 tracking-wide px-2 text-lg text-textblue hover:text-textdarkblue"}>PROFILE</NavLink>
                </nav>
            </div>
            <h1 onClick={() => history.push('/')} className='cursor-pointer font-serif tracking-wider text-5xl font mt-16 mx-auto w-4/5 max-w-sm'>REMINDERS</h1>
            <h2 className='tracking-wider text-xl font-extralight font mt-1 mx-auto w-4/5 max-w-sm'>To-do's together</h2>
        </div>
    )
}

export default NavBar
