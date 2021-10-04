import React, { useContext, useRef } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { auth } from "../../firebase";
import { useHistory } from 'react-router-dom'

const Login = () => {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const history = useHistory();
    const user = useContext(AuthContext);

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

      const signOut = async () => {
        await auth.signOut();
      };

  return (
    <div>
        <h2>Sign in</h2>
        {user ? history.push('/') :
        <form>
            <input type="email" placeholder="email" ref={emailRef} />
            <input type="password" placeholder="password" ref={passwordRef}/>
            <button type="submit" onClick={e => signIn(e)}>Sign In</button>
        </form>
        }
        <button onClick={signOut}>Sign out</button>
    </div>
  );
}

export default Login;
