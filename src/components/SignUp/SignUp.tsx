import React, { useRef, FormEvent } from "react";
import { auth } from "../../firebase";
import { notify } from '../../utils/index'
import { useHistory } from "react-router";

const SignUp = () => {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const history = useHistory();

    const isValidEmail = (email: string) => {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    };

    const createAccount = async (e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>)  => {
      e.preventDefault();

      if (!emailRef.current || !passwordRef.current || !confirmPasswordRef.current) return
  
      if (!isValidEmail(emailRef.current.value)) {
        notify('Your email does not have a correct format, please try again.', 'incorrect-format');
        return;
      }
      
      if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
        notify('Your passwords does not match, please try again.', 'not-matching-passwords');
        passwordRef.current.value = ''
        confirmPasswordRef.current.value = ''
        return;
      }
      try {
        await auth.createUserWithEmailAndPassword(
          emailRef.current.value,
          passwordRef.current.value
          );
          notify('You have completed your signup!', 'completed-signup');
          history.push('/')
      } catch (error: any) {
        if (error.code === "auth/email-already-in-use") {
          notify('The email address is already in use by another account', 'already-in-use');
        }
        if (error.code === "auth/weak-password") {
          notify('Your password needs to be at least 6 characters', '6-characters');
        }
        console.error(error);
      }
    };

  return (
      <form className="mt-2 flex flex-col m-auto" onSubmit={e => createAccount(e)}>
        <h2 className="h2">Create your new account</h2>
        <input className="mt-3" type="email" placeholder="email" ref={emailRef} />
        <input className="mt-3" type="password" placeholder="password" ref={passwordRef}/>
        <input className="mt-3 mb-4" type="password" placeholder="confirm password" ref={confirmPasswordRef}/>
        <button className="button" type="submit" onClick={e => createAccount(e)}>Sign Up</button>
        <p className='mt-6 md:mt-12'>Do you already have an account?</p>
        <button className="button" type="button" onClick={() => history.push('/login')}>Log In</button>
      </form>
  );
}

export default SignUp
