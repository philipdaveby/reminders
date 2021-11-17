import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import logo from '../../images/remindersLogo1.png'

const NavBar = () => {

    const history = useHistory();

    return (
        <div className='w-full'>
            <nav className="fixed w-full bg-white z-10">
                <div className='flex justify-around items-center h-12 m-auto max-w-2xl'>
                    <Link to= "/" className="border-b border-t px-2 text-lg text-textblue">HOME</Link>
                    <Link to="/profile" className="border-b border-t px-2 text-lg text-textblue">PROFILE</Link>
                </div>
            </nav>
            <button onClick={() => history.push('/')}><img className='mt-16 mx-auto w-4/5 max-w-sm' src={logo} alt='Reminders logo' /></button>
        </div>
    )
}

export default NavBar
