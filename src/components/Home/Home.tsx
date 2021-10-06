import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from "../../contexts/AuthContext";
import { signOut } from '../../utils';
import AddTodo from '../AddTodo/AddTodo'
import TodoList from '../TodoList/TodoList'
import { useHistory } from 'react-router-dom'
import firebase from 'firebase/app';

const Home = () => {

    const [todos, setTodos] = useState(null);
    const user = useContext(AuthContext);
    const [newTodos, setNewTodos] = useState(false);
    const history = useHistory();

    useEffect(() => {
        let isMounted = true; 

        getTodos()
            .then((todos: any) => {
                if (isMounted) {
                    setTodos(todos)
                }
            })
            return () => { isMounted = false }; 
    }, [newTodos])

    const getTodos = async () => {

        return await firebase.auth().currentUser?.getIdToken(true)
            .then(async idToken => {
            const response = await fetch('http://localhost:8000/api/todos', {
                method: 'POST',
                headers: {
                    'Authorization': idToken
                  }
            })
            return await response.json();
            }).catch(function(error) {
            console.log('We had an error loading data')
            });
    }

    const logOut = () => {
        history.push('/login');
        signOut();
    }

    return (
        <div>
            {!user ? history.push('/login') : ''} <div>
                <h1 className="text-2xl mt-5">Reminders Todo App</h1>
                <TodoList todos={todos} />
                <AddTodo todos={todos} setTodos={setTodos} setNewTodos={setNewTodos} />
                <button onClick={logOut}>Sign Out</button>
            </div>
        </div>
    )
}

export default Home
