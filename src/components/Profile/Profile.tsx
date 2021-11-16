import React, { useContext, useEffect, Dispatch, SetStateAction } from 'react'
import firebase from 'firebase/app'
import Login from '../Login/Login'
import { AuthContext } from '../../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import { signOut } from '../../utils';

interface ProfileProps {
    setTodos: Dispatch<SetStateAction<Array<Todo> | null>>
}

const Profile = ({ setTodos }: ProfileProps) => {

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
            {user ? <div>
                <h1 className="text-2xl mt-20">Profile</h1>
                <p className="text-lg mt-20 mb-10">Your email: {email}</p>
                <button onClick={logOut} className="button">Sign Out</button>
            </div>  : <Login />}
        </div>
    )
}

export default Profile
