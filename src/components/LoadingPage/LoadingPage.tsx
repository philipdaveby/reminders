import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import Login from '../Login/Login'


const LoadingPage = () => {
    const user = useContext(AuthContext);
    
    return (
        <>
            {user ? 
            <div>
                <h1 className="text-3xl mt-24 font-roboto" >REMINDERS</h1>
                <h2 className="text-xl mt-16 font-roboto">Welcome!</h2>
                <h2 className="text-xl mt-3 font-roboto">Share your todo's in realtime</h2>
            </div>
            : <Login />}
        </>
    )
}

export default LoadingPage
