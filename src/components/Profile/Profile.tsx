import React from 'react'
import firebase from 'firebase/app'

const Profile = () => {

    console.log('firebase current user: ' + firebase.auth().currentUser)
    const email = firebase.auth().currentUser?.email;

    return (
        <div>
            <h1 className="text-2xl mt-5">This is the profile page</h1>
            <p>Your email: {email}</p>
        </div>
    )
}

export default Profile
