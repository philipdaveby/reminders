import React, { useState, useEffect } from 'react'
import AddTodo from '../AddTodo/AddTodo'
import TodoList from '../TodoList/TodoList'
import originalTodos from '../../todos.json';

const Home = () => {

    const [todos, setTodos] = useState(originalTodos);
    useEffect(() => {
        getTodos()
            .then((todos: any) => setTodos(todos))
    }, [])

    const getTodos = async () => {
        const response = await fetch('http://localhost:8000/');
        return await response.json();
    }

    return (
        <div>
            <h1 className="text-2xl mt-5">Reminders Todo App</h1>
            <TodoList todos={todos} />
            <AddTodo todos={todos} setTodos={setTodos} />
        </div>
    )
}

export default Home
