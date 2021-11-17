import React, { useContext, useEffect, Dispatch, SetStateAction } from 'react'
import firebase from 'firebase/app'
import Login from '../Login/Login'
import { AuthContext } from '../../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import { signOut } from '../../utils';

interface ProfileProps {
    setTodos: Dispatch<SetStateAction<Array<Todo> | null>>,
    todos: Array<Todo> | null
}

const Profile = ({ setTodos, todos }: ProfileProps) => {

    const email = firebase.auth().currentUser?.email;
    const user = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                history.push('/login');
            }
        })
    })

    const logOut = () => {
        localStorage.clear();
        setTodos(null)
        signOut();
        history.push('/login');
    }

    return (
        <div>
            {user ? <div className='max-w-3/4 md:max-w-sm mx-auto mt-6 md:mt-12 p-4 border-4 rounded-xl'>
                <h1 className="text-2xl">Profile</h1>
                <p className="text-lg mt-20 mb-6">Your email: {email}</p>
                <button onClick={logOut} className="button">Sign Out</button>
            </div>  : <Login />}
        </div>
    )
}

export default Profile
