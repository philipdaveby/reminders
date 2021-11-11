import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import Login from '../Login/Login'

interface LoadingProps {
    loading: boolean,
    setLoading: any
}

const LoadingPage = ({loading, setLoading}: LoadingProps) => {
    const user = useContext(AuthContext);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1200)
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <>
            {loading || user ? 
            <div className='text-center'>
                <h1 className="text-3xl mt-24 font-roboto" >REMINDERS</h1>
                <h1 className="text-9xl mt-24 font-roboto border-2 rounded-full w-32 m-auto" >R</h1>
                {/* <h2 className="text-xl mt-16 font-roboto">Welcome!</h2>
                <h2 className="text-xl mt-3 font-roboto">Share your todo's in realtime</h2> */}
            </div>
            : <Login />}
        </>
    )
}

export default LoadingPage
