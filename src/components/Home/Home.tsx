import React, { useState, useEffect } from 'react'
import AddTodo from '../AddTodo/AddTodo'
import TodoList from '../TodoList/TodoList'

const Home = () => {

    const [todos, setTodos] = useState(null);
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

    return (
        <div>
            <h1 className="text-2xl mt-5">Reminders Todo App</h1>
            <TodoList todos={todos} />
            <AddTodo todos={todos} setTodos={setTodos} />
        </div>
    )
}

export default Home
