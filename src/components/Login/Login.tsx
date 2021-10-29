import React, { useRef } from "react";
// import { AuthContext } from "../../contexts/AuthContext";
import { auth } from "../../firebase";
import { useHistory } from 'react-router-dom'

const Login = () => {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const history = useHistory();
    // const user = useContext(AuthContext);

    const signIn = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
          await auth.signInWithEmailAndPassword(
            emailRef.current!.value,
            passwordRef.current!.value
          );
          history.push('/');
        } catch (error) {
          console.error(error);
        }
      };

      // const signOut = async () => {
      //   await auth.signOut();
      // };

  return (
    <div className="mt-16">
        <h2 className="h2">Sign in</h2>
        <form className="flex flex-col max-w-3/4 m-auto justify-items-center justify-center">
            <input className="mb-3" type="email" placeholder="email" ref={emailRef} />
            <input type="password" placeholder="password" ref={passwordRef} className="mb-5"/>
            <button type="submit" onClick={e => signIn(e)} className="button">Sign In</button>
            <button className="button" onClick={() => history.push('/signup')}>Create a new account</button>
        </form>
        
        {/* <button className="button" onClick={signOut}>Sign out</button> */}
    </div>
  );
}

export default Login;
