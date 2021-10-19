import React, { useContext, useEffect } from 'react'
import firebase from 'firebase/app'
import Login from '../Login/Login'
import { AuthContext } from '../../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import { signOut } from '../../utils';

const Profile = () => {

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
        signOut();
        history.push('/login');
    }

    return (
        <div>
            {user ? <div>
                <h1 className="text-2xl mt-5">This is the profile page</h1>
                <p>Your email: {email}</p>
                <button onClick={logOut}>Sign Out</button>
            </div>  : <Login />}
        </div>
    )
}

export default Profile
