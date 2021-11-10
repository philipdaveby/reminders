import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import AddTodo from '../AddTodo/AddTodo'
import TodoList from '../TodoList/TodoList'
import { useHistory } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import firebase from 'firebase/app';
import LoadingPage from '../LoadingPage/LoadingPage';
// import logo from '../../icons/reminders-logo.png'

interface HomeProps {
    socket: Socket
}

const Home = ({ socket }: HomeProps) => {

    let [todos, setTodos] = useState(null);
    // const [loading, setLoading] = useState<boolean>(true);
    const user = useContext(AuthContext);
    const history = useHistory();
    
    useEffect(() => {
        // firebase.auth().onAuthStateChanged(user => {
            //     if (!user) {
                //         history.push('/login');
                //     }
                // })
                // setLoading(true)
                getTodos();
                // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [])
            
    useEffect(() => {
        setTodos(JSON.parse(localStorage.getItem('todos')!))
        socket.on('update-todos', () => getTodos());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket])

    
    const getTodos = async () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) { 
                user.getIdToken(true)
                    .then(async idToken => {
                        const response = await fetch('http://localhost:8000/api/todos', {
                            method: 'GET',
                            headers: {
                                'Authorization': idToken
                            }
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
             } else {
                history.push('/login');
             }
          });
    }

    return (
        <>
            {user ? <main className='h-full'>
                <h1 className="text-3xl mt-14 font-roboto">REMINDERS</h1>
                {/* <img src={logo} alt="Reminders logo" className="max-w-xs m-auto p-5"/> */}
                <TodoList todos={todos} socket={socket} />
                <AddTodo todos={todos} setTodos={setTodos} socket={socket}/>
            </main>  
            : <LoadingPage />}
        </>
    )
}

export default Home
