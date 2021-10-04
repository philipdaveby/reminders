import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from "../../contexts/AuthContext";
import { signOut } from '../../utils';
import AddTodo from '../AddTodo/AddTodo'
import TodoList from '../TodoList/TodoList'
import { useHistory } from 'react-router-dom'


const Home = () => {

    const [todos, setTodos] = useState(null);
    const user = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        getTodos()
            .then((todos: any) => setTodos(todos))
    })

    const getTodos = async () => {
        
        const response = await fetch('http://localhost:8000/api/todos', {
            method: 'POST'
        })
        return await response.json();
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
                <AddTodo todos={todos} setTodos={setTodos} />
                <button onClick={logOut}>Sign Out</button>
            </div>
        </div>
    )
}

export default Home
