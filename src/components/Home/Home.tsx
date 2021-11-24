import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import AddTodo from '../AddTodo/AddTodo'
import TodoList from '../TodoList/TodoList'
import { useHistory } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import firebase from 'firebase/app';
import config from '../../utils/config'

interface HomeProps {
    socket: Socket,
    todos: Array<Todo> | null,
    setTodos: Dispatch<SetStateAction<Array<Todo> | null>>
}

const Home = ({ socket, todos, setTodos }: HomeProps) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [filtered, setFiltered] = useState<boolean>(false);
    const history = useHistory();
    
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                history.push('/login');
                return;
            }
            user ? setLoading(false) : setLoading(true)
            const localTodos = localStorage.getItem('todos')
            localTodos && setTodos(JSON.parse(localTodos))
            getTodos();
        })
        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    useEffect(() => {
        socket.on('update-todos', () => getTodos());
        return () => {
            socket.off('update-todos');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket])
    
    
    const getTodos = async () => {
        firebase.auth().onAuthStateChanged(user => {
            user?.getIdToken(true)
            .then(async idToken => {
                    const response = await fetch(`${config.backend_url}/api/todos`, {
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
                })
                .catch((error) => {
                    console.log('We had an error loading data');
                });
          });
    }

    return (
        <>
            {!loading ? <main className='h-full'>
                <TodoList getTodos={getTodos} todos={todos} socket={socket} filtered={filtered} />
                <AddTodo socket={socket} todos={todos} filtered={filtered} setFiltered={setFiltered} />
            </main>  
            : <div></div>}
        </>
    )
}

export default Home
