import React, { useContext, useRef } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { auth } from "../../firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    // const user = useContext(AuthContext);

    const notify = (text: string) => toast(text);

    const isValidEmail = (email: string) => {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    };

    const createAccount = async () => {

        if (passwordRef.current?.value) {
            isValidEmail(emailRef.current!.value);
            notify('Your email does not have a correct format, please try again.');
            return;
        }

        if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
            notify('Your passwords does not match, please try again.');
            passwordRef.current!.value = ''
            confirmPasswordRef.current!.value = ''
            return;
        }
        try {
          await auth.createUserWithEmailAndPassword(
            emailRef.current!.value,
            passwordRef.current!.value
          );
        } catch (error) {
          console.error(error);
        }
      };

  return (
    <div>
        <form>
            <input type="email" placeholder="email" ref={emailRef} />
            <input type="password" placeholder="password" ref={passwordRef}/>
            <input type="password" placeholder="Confirm password" ref={confirmPasswordRef}/>
            <button type="button" onClick={createAccount}>Sign Up</button>
        </form>
        <ToastContainer />
    </div>
  );
}

export default SignUp
