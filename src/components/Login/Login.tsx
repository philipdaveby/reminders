import React, { useRef } from "react";
import { auth } from "../../firebase";
import { useHistory } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { notify } from '../../utils/index'

const Login = () => {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const history = useHistory();

    const signIn = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (emailRef.current === null || passwordRef.current === null || emailRef.current.value === '' || passwordRef.current.value === '') return
        try {
          await auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
          );
          history.push('/', { from: 'login' });
        } catch (error: any) {
          if (error.code === "auth/user-not-found") {
            notify('There is no user record corresponding to this identifier. Please try again');
          }
          if (error.code === "auth/wrong-password") {
            notify('The password is invalid. Please try again');
          }
          if (error.code === "auth/invalid-email") {
            notify('Please provide a valid email');
          }
          console.error(error);
        }
      };

  return (
    <div className="mt-16">
        <h2 className="h2">Sign in</h2>
        <form className="flex flex-col max-w-3/4 md:max-w-xxs m-auto justify-items-center justify-center">
            <input className="mb-3" type="email" required placeholder="email" ref={emailRef} />
            <input type="password" placeholder="password" ref={passwordRef} className="mb-4"/>
            <button type="submit" onClick={e => signIn(e)} className="button">Sign In</button>
            <p className='mt-8'>Not registered yet?</p>
            <button className="button" onClick={() => history.push('/signup')}>Create a new account</button>
            <ToastContainer />
        </form>
    </div>
  );
}

export default Login;
