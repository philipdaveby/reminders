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

      const signOut = async () => {
        await auth.signOut();
      };

  return (
    <div>
        <h2>Sign in</h2>
        <form>
            <input type="email" placeholder="email" ref={emailRef} />
            <input type="password" placeholder="password" ref={passwordRef}/>
            <button type="submit" onClick={e => signIn(e)}>Sign In</button>
        </form>
        
        <button className="h-8 px-4 m-2 text-sm text-indigo-100 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800" onClick={() => history.push('/signup')}>Create a new account</button>
        <button className="h-8 px-4 m-2 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800" onClick={signOut}>Sign out</button>
    </div>
  );
}

export default Login;
