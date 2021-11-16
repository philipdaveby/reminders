import React, { useState, useEffect } from 'react'
import AddTodo from '../AddTodo/AddTodo'
import TodoList from '../TodoList/TodoList'
import { useHistory } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import firebase from 'firebase/app';
// import LoadingPage from '../LoadingPage/LoadingPage';
import { useCookies } from 'react-cookie';
import logo from '../../images/remindersLogo1.png'
// import { Location } from 'history';

// import logo from '../../icons/reminders-logo.png'

interface HomeProps {
    socket: Socket,
    todos: Array<Todo> | null,
    setTodos: any
}

const Home = ({ socket, todos, setTodos }: HomeProps) => {
    
    const [cookies, setCookie] = useCookies(['user', 'email']);
    const [loading, setLoading] = useState<boolean>(true);
    const [filtered, setFiltered] = useState<boolean>(false);
    const history = useHistory();
    
    useEffect(() => {
        // const state = history.location.state as { from: string }
        // if (state.from === 'login') {
        //     setLoading(true)
        // }
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (!user || !cookies) {
                history.push('/login');
                return;
            }
            user ? setLoading(false) : setLoading(true)
            const localTodos = localStorage.getItem('todos')
            localTodos && setTodos(JSON.parse(localTodos))
            setCookie('user', user.uid)
            setCookie('email', user.email)
            getTodos();
        })
        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    useEffect(() => {
        socket.on('update-todos', () => getTodos());
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [socket])

    
    const getTodos = async () => {
        firebase.auth().onAuthStateChanged(user => {
            user?.getIdToken(true)
                .then(async idToken => {
                    const response = await fetch('http://localhost:8000/api/todos', {
                        method: 'GET',
                        headers: {
                            'Authorization': idToken
                        },
                        credentials: 'include'
                    });
                    const res = await response.json();
                    if (res !== todos) {
                        localStorage.setItem('todos', JSON.stringify(res));
                        setTodos(res)
                    }
                    // setLoading(false);
                })
                .catch((error) => {
                    console.log('We had an error loading data');
                });
          });
    }

    return (
        <>
            {!loading || !cookies ? <main className='h-full'>
                {/* <h1 className="text-3xl mt-14 font-roboto">REMINDERS</h1> */}
                <img className='mt-16 mx-auto w-4/5 max-w-sm' src={logo} alt='Reminders logo'/>
                <TodoList getTodos={getTodos} todos={todos} setTodos={setTodos} socket={socket} filtered={filtered} setFiltered={setFiltered} />
                <AddTodo socket={socket} todos={todos} filtered={filtered} setFiltered={setFiltered} />
            </main>  
            : <div></div>}
            {/* : <LoadingPage loading={loading} setLoading={setLoading}/>} */}
        </>
    )
}

export default Home
