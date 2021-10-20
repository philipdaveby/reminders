import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import AddTodo from '../AddTodo/AddTodo'
import TodoList from '../TodoList/TodoList'
import Login from '../Login/Login'
import { useHistory } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import firebase from 'firebase';

interface HomeProps {
    socket: Socket
}

const Home = ({ socket }: HomeProps) => {

    let [todos, setTodos] = useState(null);
    const user = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                history.push('/login');
            }
        })
        console.log('useEffect')
        socket.on('update-todos', () => {
            console.log('update socket')
            getTodos()
        });
        getTodos();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
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
                        setTodos(res)
                    })
                    .catch((error) => {
                        console.log('We had an error loading data');
                    });
             }
          });
    }

    return (
        <>
            {user ? <div>
                <h1 className="text-2xl mt-5">Reminders Todo App</h1>
                <TodoList todos={todos} socket={socket} />
                <AddTodo todos={todos} setTodos={setTodos} socket={socket}/>
            </div>  : <Login />}
        </>
    )
}

export default Home
